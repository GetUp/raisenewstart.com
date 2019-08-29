module FraudStop exposing (main)

import Html exposing (..)
import Html.Attributes exposing (..)


type alias Accordion =
    { header : String
    , content : String
    }



-- MAIN


accordions : List Accordion
accordions =
    [ { header = "How does it work?", content = "Lorem ipsum" }
    , { header = "Why did we build Fraudstop?", content = "Lorem ipsum" }
    , { header = "Some very important legal information.", content = "Lorem ipsum" }
    ]



-- accordionView : accordions -> Html


accordionView accordion =
    section [ class "accordion header-accordion" ]
        [ button [ class "accordion-title" ]
            [ img [ src "/static/images/orangeArrow.svg", class "accordion-arrow" ] []
            , text accordion.header
            ]
        , div [ class "accordion-body" ]
            [ text accordion.content
            ]
        ]


main =
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
                        , div [] <| List.map accordionView accordions
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
