module FraudStop exposing (main)

import Browser exposing (element)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)


type alias Accordion =
    { open : Bool
    , header : String
    , content : String
    }


type alias Model =
    { accordions : List Accordion
    }


initialAccordions : List Accordion
initialAccordions =
    [ { open = False, header = "How does it work?", content = "Lorem ipsum" }
    , { open = False, header = "Why did we build Fraudstop?", content = "Lorem ipsum" }
    , { open = False, header = "Some very important legal information.", content = "Lorem ipsum" }
    ]


initialModel : Model
initialModel =
    { accordions = initialAccordions
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
    = ClickedAccordion Accordion


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ClickedAccordion accordion ->
            ( { model | accordions = { accordion | open = not accordion.open } :: model.accordions }, Cmd.none )



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
        [ button [ onClick <| ClickedAccordion accordion, class ("accordion-title" ++ closedClass) ]
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
        , div [ class "grid-container" ]
            [ div [ class "grid-x grid-padding-x" ]
                [ div [ class "cell small-12 medium-offset-1 medium-7 large-offset-2 large-6 pad-x mt-5 mb-5" ]
                    [--   <Form />
                    ]
                ]
            ]
        ]
