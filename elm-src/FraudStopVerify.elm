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
    = Verified Verification
    | VerificationError
    | Loading
    | Res (Result Http.Error String)


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


flagsDecoder : Decode.Decoder String
flagsDecoder =
    Decode.field "query" Decode.string


verificationParser : Parser (Maybe Verification -> Maybe Verification) (Maybe Verification)
verificationParser =
    Url.Parser.query <|
        Query.map2 (Maybe.map2 Verification)
            (Query.int "request_id")
            (Query.string "secure_token")


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        maybeVerification =
            Result.toMaybe (Decode.decodeValue flagsDecoder flags)
                |> Maybe.andThen (\q -> Url.fromString ("https://_" ++ q))
                |> Maybe.andThen (Url.Parser.parse verificationParser)
                |> Maybe.Extra.join
    in
    case maybeVerification of
        Just verification ->
            ( Verified verification, Cmd.none )

        Nothing ->
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
                Verified verification ->
                    ( Loading, submitVerification verification )

                _ ->
                    ( model, Cmd.none )

        GotResponse state ->
            ( Res state, Cmd.none )


submitVerification : Verification -> Cmd Msg
submitVerification verification =
    Http.post
        { url = "https://t1o3wcwixf.execute-api.us-east-1.amazonaws.com/dev/verify"
        , body = Http.jsonBody (encode verification)
        , expect = Http.expectString GotResponse
        }



-- VIEW


view : Model -> Html Msg
view model =
    div []
        [ div [ class "grid-container fluid fraudstop" ]
            [ div [ class "grid-x grid-padding-x " ]
                [ showModule model ]
            ]
        ]


showModule : Model -> Html Msg
showModule model =
    case model of
        VerificationError ->
            verificationErrorView

        Verified verification ->
            verifiedView

        Loading ->
            loadingSubmitView

        Res (Ok _) ->
            successSubmitView

        Res (Err _) ->
            errorSubmitView


verificationErrorView : Html Msg
verificationErrorView =
    div []
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
    div [ class "form-container loading-container mt-5" ]
        [ img [ src "/static/images/spinner.svg", alt "Loading..." ] []
        ]


successSubmitView : Html Msg
successSubmitView =
    div []
        [ text "Success! We've put your appeal letter together and posted it to Centrelink."
        ]


errorSubmitView : Html Msg
errorSubmitView =
    div []
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
