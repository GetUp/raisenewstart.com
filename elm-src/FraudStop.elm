module FraudStop exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http exposing (..)
import Json.Encode as Encode


type alias Accordion =
    { open : Bool
    , header : String
    , content : String
    }


type alias Model =
    { accordions : List Accordion
    , firstName : String
    , debtReason : String
    , currentPane : Pane
    , response : SubmitResponse
    }


type Pane
    = PersonalDetails
    | Letter


type SubmitResponse
    = Res (Result Http.Error String)
    | Nothing


initialAccordions : List Accordion
initialAccordions =
    [ { open = False, header = "How does it work?", content = "Lorem ipsum" }
    , { open = False, header = "Why did we build Fraudstop?", content = "Lorem ipsum" }
    , { open = False, header = "Some very important legal information.", content = "Lorem ipsum" }
    ]


initialModel : Model
initialModel =
    { accordions = initialAccordions
    , firstName = ""
    , debtReason = ""
    , currentPane = PersonalDetails
    , response = Nothing
    }


encode : Model -> Encode.Value
encode model =
    Encode.object
        [ ( "firstName", Encode.string model.firstName )
        , ( "debtReason", Encode.string model.debtReason )
        ]


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
    = ClickedAccordion String
    | SetName String
    | SetdebtReason String
    | GoToLetter
    | SubmitForm
    | GotResponse (Result Http.Error String)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        _ =
            Debug.log "Message " msg
    in
    case msg of
        ClickedAccordion accordionHeader ->
            let
                newAccordions =
                    List.map (toggleAccordion accordionHeader) model.accordions
            in
            ( { model | accordions = newAccordions }, Cmd.none )

        SetName firstName ->
            ( { model | firstName = firstName }, Cmd.none )

        SetdebtReason debtReason ->
            ( { model | debtReason = debtReason }, Cmd.none )

        GoToLetter ->
            ( { model | currentPane = Letter }, Cmd.none )

        SubmitForm ->
            ( model, submitForm model )

        GotResponse response ->
            ( { model | response = Res response }, Cmd.none )


submitForm : Model -> Cmd Msg
submitForm model =
    let
        _ =
            Debug.log "Submit " model
    in
    Http.post
        { url = "http://debt-star-staging.herokuapp.com/dothething"
        , body = Http.jsonBody (encode model)
        , expect = Http.expectString GotResponse
        }


toggleAccordion : String -> Accordion -> Accordion
toggleAccordion header accordion =
    if accordion.header == header then
        { accordion | open = not accordion.open }

    else
        accordion


togglePane : Pane -> Pane -> String
togglePane pane currentPane =
    if pane == currentPane then
        ""

    else
        " hide"


showAlert : SubmitResponse -> String
showAlert res =
    case res of
        Nothing ->
            ""

        Res (Ok _) ->
            "Success"

        Res (Err _) ->
            "Error"



-- MAIN


accordionView : Accordion -> Html Msg
accordionView accordion =
    let
        closedClass =
            if accordion.open then
                ""

            else
                " accordion--closed"
    in
    section [ class "accordion header-accordion" ]
        [ button [ onClick <| ClickedAccordion accordion.header, class ("accordion-title" ++ closedClass) ]
            [ img [ src "/static/images/orangeArrow.svg", class "accordion-arrow" ] []
            , text accordion.header
            ]
        , div [ class ("accordion-body" ++ closedClass) ]
            [ p [] [ text accordion.content ]
            ]
        ]


view : Model -> Html Msg
view model =
    div []
        [ div [ class "header-container" ]
            [ div [ class "grid-container" ]
                [ div [ class "grid-x grid-padding-x align-center" ]
                    [ div [ class "cell small-12 medium-10 large-8 pad-x" ]
                        [ h1 [ class "headline mb-3" ]
                            [ strong [] [ text "Fight back against Centrelink debt claims" ]
                            ]
                        , h2 [ class "h5 mb-4" ]
                            [ text "FraudStop makes it quick and easy to appeal an automated debt claim against you. All you need to do is enter a few details, explain why you want to appeal the debt claim against you, and hit send - FraudStop does the rest." ]
                        , div [] <| List.map accordionView model.accordions
                        ]
                    ]
                ]
            ]
        , h3 [] [ text (showAlert model.response) ]
        , div [ class "grid-container" ]
            [ div [ class "grid-x grid-padding-x" ]
                [ div [ class "cell small-12 medium-offset-1 medium-7 large-offset-2 large-6 pad-x mt-5 mb-5" ]
                    [ div [ class ("form-container" ++ togglePane PersonalDetails model.currentPane) ]
                        [ div [ class "form-item" ]
                            [ label [ class "mb-1", for "firstName" ] [ text "First Name" ]
                            , input [ type_ "text", id "firstName", name "firstName", placeholder "First Name", value model.firstName, onInput SetName ] []
                            ]
                        , button [ class "btn btn-primary btn-large mt-4", onClick GoToLetter ] [ text "Next" ]
                        ]
                    , div [ class ("form-container" ++ togglePane Letter model.currentPane) ]
                        [ div [ class "form-item" ]
                            [ label [ class "mb-1", for "debtReason" ] [ text "debtReason" ]
                            , input [ type_ "text", id "debtReason", name "debtReason", placeholder "debtReason", value model.debtReason, onInput SetdebtReason ] []
                            ]
                        , button [ class "btn btn-primary btn-large mt-4", onClick SubmitForm ] [ text "Submit" ]
                        ]
                    ]
                ]
            ]
        ]
