module FraudStopVerify exposing (main)

import Browser
import Char
import Html exposing (..)
import Html.Attributes exposing (alt, class, src, type_)
import Html.Events exposing (onSubmit)
import Http
import Json.Decode as Decode
import Json.Encode as Encode
import Maybe.Extra
import Url
import Url.Parser exposing (Parser)
import Url.Parser.Query as Query



-- MODEL


type Model
    = Verified Host Verification
    | VerificationError
    | Loading
    | Res (Result Http.Error String)


type alias Host =
    String


type alias Verification =
    { requestId : Int
    , secureToken : String
    }


encode : Verification -> Encode.Value
encode verification =
    Encode.object
        [ ( "requestId", Encode.int verification.requestId )
        , ( "token", Encode.string verification.secureToken )
        ]


type alias Flags =
    Decode.Value


queryDecoder : Decode.Decoder String
queryDecoder =
    Decode.field "query" Decode.string


hostDecoder : Decode.Decoder String
hostDecoder =
    Decode.field "host" Decode.string


verificationParser : Parser (Maybe Verification -> Maybe Verification) (Maybe Verification)
verificationParser =
    Url.Parser.query <|
        Query.map2 (Maybe.map2 Verification)
            (Query.int "request_id")
            (Query.string "secure_token")


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        maybeHost =
            Result.toMaybe (Decode.decodeValue hostDecoder flags)

        maybeVerification =
            Result.toMaybe (Decode.decodeValue queryDecoder flags)
                |> Maybe.andThen (\q -> Url.fromString ("https://_" ++ q))
                |> Maybe.andThen (Url.Parser.parse verificationParser)
                |> Maybe.Extra.join
    in
    case ( maybeHost, maybeVerification ) of
        ( Just host, Just verification ) ->
            ( Verified host verification, Cmd.none )

        _ ->
            ( VerificationError, Cmd.none )



-- UPDATE


type Msg
    = SubmitVerification
    | GotResponse (Result Http.Error String)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SubmitVerification ->
            case model of
                Verified host verification ->
                    ( Loading, submitVerification host verification )

                _ ->
                    ( VerificationError, Cmd.none )

        GotResponse state ->
            ( Res state, Cmd.none )


submitVerification : Host -> Verification -> Cmd Msg
submitVerification host verification =
    Http.post
        { url = host ++ "/verify"
        , body = Http.jsonBody (encode verification)
        , expect = Http.expectString GotResponse
        }



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ div [ class "grid-container py-5" ]
            [ div [ class "grid-x form-container" ]
                [ div [ class "cell small-12" ] [ showModule model ] ]
            ]
        ]


showModule : Model -> Html Msg
showModule model =
    case model of
        VerificationError ->
            verificationErrorView

        Verified _ verification ->
            verifiedView

        Loading ->
            loadingSubmitView

        Res (Ok _) ->
            successSubmitView

        Res (Err _) ->
            errorSubmitView


verificationErrorView : Html Msg
verificationErrorView =
    h1 [ class "h3 orange-text bold" ]
        [ text "Your details could not be verified. :("
        ]


verifiedView : Html Msg
verifiedView =
    Html.form
        [ class "form-container"
        , onSubmit SubmitVerification
        ]
        [ button [ type_ "submit", class "btn btn-primary mt-4" ]
            [ text "Verify email" ]
        ]


loadingSubmitView : Html Msg
loadingSubmitView =
    div [ class "form-container loading-container my-5" ]
        [ img [ src "/static/images/spinner.svg", alt "Loading..." ] []
        ]


successSubmitView : Html Msg
successSubmitView =
    h1 [ class "h3 orange-text" ]
        [ span [ class "green-text bold" ] [ text "Success!" ]
        , br [] []
        , text "We've put your appeal letter together and posted it to Centrelink."
        ]


errorSubmitView : Html Msg
errorSubmitView =
    h1 [ class "h3 orange-text" ]
        [ text "There was an error. :("
        ]



-- MAIN


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }
