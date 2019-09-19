module FraudStopVerify exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (alt, class, src, type_)
import Html.Events exposing (onSubmit)
import Http
import Json.Encode as Encode


type alias Model =
    { response : SubmitResponse
    , verification : Verification
    }


type SubmitResponse
    = Res (Result Http.Error String)
    | Loading
    | NotSubmitted


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


initialVerification : Verification
initialVerification =
    { requestId = 0
    , secureToken = ""
    }


initialModel : Model
initialModel =
    { response = NotSubmitted
    , verification = initialVerification
    }


init : () -> ( Model, Cmd Msg )
init _ =
    ( initialModel, Cmd.none )


main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }


type Msg
    = PrepareVerification
    | SubmitVerification
    | GotResponse (Result Http.Error String)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        _ =
            Debug.log "Message " msg
    in
    case msg of
        PrepareVerification ->
            ( model, Cmd.none )

        SubmitVerification ->
            ( { model | response = Loading }, submitVerification model )

        GotResponse response ->
            ( { model | response = Res response }, Cmd.none )


submitVerification : Model -> Cmd Msg
submitVerification model =
    let
        _ =
            Debug.log "Submit " model
    in
    Http.post
        { url = "https://t1o3wcwixf.execute-api.us-east-1.amazonaws.com/dev/verify"
        , body = Http.jsonBody (encode model.verification)
        , expect = Http.expectString GotResponse
        }


loadingSubmitView : Html Msg
loadingSubmitView =
    div [ class "form-container loading-container mt-5" ]
        [ img [ src "/static/images/spinner.svg", alt "Loading..." ] []
        ]


successSubmitView : Html Msg
successSubmitView =
    div [] [ text "Success! We've put your appeal letter together and posted it to Centrelink. " ]


errorSubmitView : Html Msg
errorSubmitView =
    div [] [ text "Click here to try again" ]


showModule : SubmitResponse -> Model -> Html Msg
showModule req model =
    case req of
        NotSubmitted ->
            Html.form
                [ class "form-container"
                , onSubmit SubmitVerification
                ]
                [ button [ type_ "submit", class "btn btn-primary mt-4" ] [ text "Verify email" ] ]

        Loading ->
            loadingSubmitView

        Res (Ok _) ->
            successSubmitView

        Res (Err _) ->
            errorSubmitView


view : Model -> Html Msg
view model =
    div []
        [ div [ class "grid-container fluid fraudstop" ]
            [ div [ class "grid-x grid-padding-x " ]
                [ showModule model.response model ]
            ]
        ]
