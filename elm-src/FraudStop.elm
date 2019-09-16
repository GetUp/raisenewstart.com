module FraudStop exposing (main)

import Browser
import Dict exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http exposing (..)
import Json.Encode as Encode


type alias Model =
    { accordions : List Accordion
    , firstName : String
    , debtReason : String
    , currentPane : Pane
    , response : SubmitResponse
    , details : Details
    , formFields : Dict String String
    , moduleSize : ModuleSize
    }


type alias Details =
    { firstName : String
    , lastName : String
    , email : String
    , address : String
    , suburb : String
    , postcode : String
    , dob : String
    , phone : String
    , crn : String
    , debtReason : String

    -- , personalCircumstancess : List String
    }


type alias Accordion =
    { open : Bool
    , header : String
    , content : String
    }


type Pane
    = PersonalDetails
    | Letter
    | PersonalCircumstances


type ModuleSize
    = Expanded
    | Shrunk


type SubmitResponse
    = Res (Result Http.Error String)
    | Nothing


initialAccordions : List Accordion
initialAccordions =
    [ { open = False, header = "How does it work?", content = "Lorem ipsum" }
    , { open = False, header = "Why did we build Fraudstop?", content = "FraudStop makes it quick and easy to appeal an automated debt claim against you. All you need to do is enter a few details, explain why you want to appeal the debt claim against you, and hit send - FraudStop does the rest. FraudStop makes it quick and easy to appeal an automated debt claim against you. All you need to do is enter a few details, explain why you want to appeal the debt claim against you, and hit send - FraudStop does the rest. FraudStop makes it quick and easy to appeal an automated debt claim against you. All you need to do is enter a few details, explain why you want to appeal the debt claim against you, and hit send - FraudStop does the rest. FraudStop makes it quick and easy to appeal an automated debt claim against you. All you need to do is enter a few details, explain why you want to appeal the debt claim against you, and hit send - FraudStop does the rest. FraudStop makes it quick and easy to appeal an automated debt claim against you. All you need to do is enter a few details, explain why you want to appeal the debt claim against you, and hit send - FraudStop does the rest. FraudStop makes it quick and easy to appeal an automated debt claim against you. All you need to do is enter a few details, explain why you want to appeal the debt claim against you, and hit send - FraudStop does the rest." }
    , { open = False, header = "Some very important legal information.", content = "FraudStop makes it quick and easy to appeal an automated debt claim against you. All you need to do is enter a few details, explain why you want to appeal the debt claim against you, and hit send - FraudStop does the rest. FraudStop makes it quick and easy to appeal an automated debt claim against you. All you need to do is enter a few details, explain why you want to appeal the debt claim against you, and hit send - FraudStop does the rest. FraudStop makes it quick and easy to appeal an automated debt claim against you. All you need to do is enter a few details, explain why you want to appeal the debt claim against you, and hit send - FraudStop does the rest." }
    ]


initialDetails : Details
initialDetails =
    { firstName = ""
    , lastName = ""
    , email = ""
    , address = ""
    , suburb = ""
    , postcode = ""
    , dob = ""
    , phone = ""
    , crn = ""
    , debtReason = ""
    }


initialModel : Model
initialModel =
    { accordions = initialAccordions
    , firstName = ""
    , debtReason = ""
    , currentPane = PersonalDetails
    , response = Nothing
    , details = initialDetails
    , formFields = Dict.fromList [ ( "firstName", "" ) ]
    , moduleSize = Shrunk
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
    | SetName String String
    | SetdebtReason String
    | GoToLetter
    | GoToPersonalDetails
    | GoToPersonalCircumstances
    | SubmitForm
    | GotResponse (Result Http.Error String)
    | UpdateForm String String
    | ToggleModuleSize ModuleSize


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

        SetName field value ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | firstName = value } }

                _ =
                    Debug.log "Details " newDetails
            in
            ( newDetails, Cmd.none )

        SetdebtReason debtReason ->
            ( { model | debtReason = debtReason }, Cmd.none )

        GoToLetter ->
            ( { model | currentPane = Letter }, Cmd.none )

        GoToPersonalDetails ->
            ( { model | currentPane = PersonalDetails }, Cmd.none )

        GoToPersonalCircumstances ->
            ( { model | currentPane = PersonalCircumstances }, Cmd.none )

        SubmitForm ->
            ( model, submitForm model )

        GotResponse response ->
            ( { model | response = Res response }, Cmd.none )

        UpdateForm key value ->
            let
                updatedFields =
                    Dict.insert key value model.formFields

                _ =
                    -- Debug.log "Updated Fields " updatedFields
                    Debug.log "Model " model.formFields
            in
            ( { model | formFields = updatedFields }, Cmd.none )

        ToggleModuleSize size ->
            let
                newSize =
                    if size == Expanded then
                        Shrunk

                    else
                        Expanded
            in
            ( { model | moduleSize = newSize }, Cmd.none )


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


isActivePane : Pane -> Pane -> String
isActivePane pane currentPane =
    if pane == currentPane then
        " active"

    else
        ""


showAlert : SubmitResponse -> String
showAlert res =
    case res of
        Nothing ->
            ""

        Res (Ok _) ->
            "Success"

        Res (Err _) ->
            "Error"


moduleSize : ModuleSize -> String -> String
moduleSize size m =
    if m == "module" then
        if size == Expanded then
            " medium-8 large-8"

        else
            " medium-6 large-4"

    else if m == "module-opposite" then
        if size == Expanded then
            " medium-4 large-4"

        else
            " medium-6 large-8"

    else if m == "text" then
        if size == Expanded then
            "shink"

        else
            "expand"

    else
        ""



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


personalDetailsView : Details -> Model -> Pane -> Html Msg
personalDetailsView details model currentPane =
    Html.form
        [ class ("form-container personal-details" ++ togglePane PersonalDetails currentPane), onSubmit GoToLetter ]
        [ div [ class "form-item" ]
            [ label [ class "", for "firstName" ] [ text "First Name" ]
            , input [ type_ "text", id "firstName", name "firstName", placeholder "First Name", onInput (UpdateForm "firstName") ] []
            ]
        , div [ class "form-item" ]
            [ label [ class "", for "lastName" ] [ text "Last Name" ]
            , input [ type_ "text", id "lastName", name "lastName", placeholder "Last Name", onInput (UpdateForm "lastName") ] []
            ]
        , div [ class "form-item" ]
            [ label [ class "", for "email" ] [ text "Email" ]
            , input [ type_ "email", id "email", name "email", placeholder "Email", value details.email ] []
            ]
        , div [ class "form-item" ]
            [ label [ class "", for "address" ] [ text "Address" ]
            , input [ type_ "text", id "address", name "address", placeholder "Address", value details.address ] []
            ]
        , div [ class "form-item" ]
            [ label [ class "", for "suburb" ] [ text "Suburb" ]
            , input [ type_ "text", id "suburb", name "suburb", placeholder "Suburb", value details.suburb ] []
            ]
        , div [ class "form-item" ]
            [ label [ class "", for "postcode" ] [ text "Post Code" ]
            , input [ type_ "text", id "postcode", name "postcode", placeholder "Post Code", value details.postcode, pattern "^[0-9]{4}$", title "Your postcode should be 4 digits" ] []
            ]
        , div [ class "form-item" ]
            [ label [ class "", for "dob" ] [ text "Date of Birth" ]
            , input [ type_ "date", id "dob", name "dob", placeholder "dd/mm/yyyy", value details.dob ] []
            ]
        , div [ class "form-item" ]
            [ label [ class "", for "Phone" ] [ text "Phone" ]
            , input [ type_ "text", id "Phone", name "Phone", placeholder "Phone", value details.phone, pattern "^[0-9]{10,16}$" ] []
            ]
        , div [ class "form-item" ]
            [ label [ class "", for "crn" ] [ text "Centrelink Reference Number (CRN)" ]
            , input [ type_ "text", id "crn", name "crn", placeholder "123456789A", value details.crn, pattern "^[0-9]{9}[a-zA-Z]{1}$", title "Your Centrelink CRN should be 9 digits followed by 1 letter" ] []
            ]
        , button [ type_ "submit", class "btn btn-primary mt-4" ] [ text "Next" ]
        ]


letterView : Details -> Pane -> Html Msg
letterView details currentPane =
    div [ class ("form-container" ++ togglePane Letter currentPane) ]
        [ div [ class "alert-container" ]
            [ p [ class "" ]
                [ text "A sample of the letter. Your reasons will be added to the letter that is sent directly to Centrelink. If you've made a mistake while entering your details, press back to edit it."
                ]
            ]
        , div [ class "letter-container" ]
            [ p [] [ text "I am writing to request a review by an Authorised Review Officer. My personal details, the decision I am appealing against, and my reasons for appealing are set out below." ]
            , p [ class "mb-0" ] [ text ("Name: " ++ details.firstName) ]
            , p [ class "mb-0" ] [ text "Date of birth: " ]
            , p [ class "mb-0" ] [ text "Address: " ]
            , p [ class "mb-0" ] [ text "CRN: " ]
            , p [ class "mb-0" ] [ text "Telephone: " ]
            , p [] [ text "Email: " ]
            , p [] [ text "I am appealing the decision to subject me to an automatically generated compliance intervention process." ]
            , p [] [ b [] [ text "My reasons for appealing are:" ] ]
            , textarea
                [ id "debtReason"
                , class "debt-reason"
                , name "debtReason"
                , placeholder "Explain to Centrelink in a few sentences why you feel the letter you received is incorrect. Please keep it short and aim to stick to the facts as much as possible."

                -- , value details.debtReason
                , onInput SetdebtReason
                ]
                []
            ]
        , button [ class "btn btn-primary btn-outline mt-4 mr-2", onClick GoToPersonalDetails ] [ text "Back" ]
        , button [ class "btn btn-primary mt-4", onClick GoToPersonalCircumstances ] [ text "Next" ]
        ]


personalCircumstancesView : Details -> Pane -> Html Msg
personalCircumstancesView details currentPane =
    div [ class ("form-container personal-circumstances-container" ++ togglePane PersonalCircumstances currentPane) ]
        [ label [ class "mb-3" ] [ text "Do you have any specific personal circumstances which may have impacted your ability to report income or caused you significant hardship?" ]
        , div [ class "radio-buttons" ]
            [ input [ class "mr-2", type_ "radio", name "impacted_ability_to_report_income", value "Yes" ] []
            , span [ class "mr-3" ] [ text "Yes" ]
            , input [ class "mr-2", type_ "radio", name "impacted_ability_to_report_income", value "No" ] []
            , span [] [ text "No" ]
            ]
        , br [] []
        , br [] []
        , label [ class "mb-3" ] [ text "Which specific personal circumstances apply to your case? (choose all those that apply)" ]
        , div [ class "radio-buttons" ]
            [ input [ id "illness", class "mr-2 mb-3", type_ "checkbox", value "Illness (including mental illness)" ] []
            , label [ for "illness", class "mr-3" ] [ text "Illness (including mental illness)" ]
            , br [] []
            , input [ id "financial-hardship", class "mr-2 mb-3", type_ "checkbox", value "Financial hardship" ] []
            , label [ for "financial-hardship", class "mr-3" ] [ text "Financial hardship" ]
            , br [] []
            , input [ id "addiction", class "mr-2 mb-3", type_ "checkbox", value "Addiction" ] []
            , label [ for "addicition", class "mr-3" ] [ text "Addiction" ]
            , br [] []
            , input [ id "homelessness", class "mr-2 mb-3", type_ "checkbox", value "Homelessness" ] []
            , label [ for "homelessness", class "mr-3" ] [ text "Homelessness" ]
            , br [] []
            , input [ id "other", class "mr-2 mb-3", type_ "checkbox", value "Other" ] []
            , label [ for "other", class "mr-3" ] [ text "Other" ]
            , br [] []
            , input [ class "mr-2 mb-3 mt-2 other-inputbox", type_ "text", placeholder "Other circumstance" ] []
            ]
        , a [ class "btn btn-primary mt-5" ] [ text "Submit" ]
        ]


view : Model -> Html Msg
view model =
    div []
        [ div [ class "grid-container fluid fraudstop" ]
            [ div [ class "grid-x grid-padding-x " ]
                [ div [ class ("cell small-12 fraudstop-text" ++ moduleSize model.moduleSize "module-opposite") ]
                    [ div [ class "fraudstop-text-wrapper" ]
                        [ img [ src "/static/images/newstart-logo.svg", class "logo mb-3" ] []
                        , h1 [ class "headline mb-3" ]
                            [ strong [] [ text "Fight back against Centrelink debt claims" ]
                            ]
                        , h2 [ class "h5 mb-4" ]
                            [ text "FraudStop makes it quick and easy to appeal an automated debt claim against you. All you need to do is enter a few details, explain why you want to appeal the debt claim against you, and hit send - FraudStop does the rest." ]
                        , div [] <| List.map accordionView model.accordions
                        ]
                    ]
                , div [ class ("cell small-12 fraudstop-form mb-5" ++ moduleSize model.moduleSize "module") ]
                    [ div [ class "fraudstop-form-text--wrapper" ]
                        [ div [ class ("expand-container " ++ moduleSize model.moduleSize "text"), onClick (ToggleModuleSize model.moduleSize) ]
                            [ span [] [ text (moduleSize model.moduleSize "text") ]
                            , img [ src "/static/images/expand-icon.svg" ] []
                            ]
                        , h2 [ class "h6 title" ] [ text "This is a title" ]
                        , p [] [ text "FraudStop makes it quick and easy to appeal an automated debt claim against you. All you need to do is enter a few details, explain why you want to appeal the debt claim against you, and hit send - FraudStop does the rest." ]
                        ]
                    , div [ class "steps-container" ]
                        [ div [ class ("step" ++ isActivePane PersonalDetails model.currentPane), onClick GoToPersonalDetails ] [ text "About you" ]
                        , div [ class ("step" ++ isActivePane Letter model.currentPane), onClick GoToLetter ] [ text "Your story" ]
                        , div [ class ("step" ++ isActivePane PersonalCircumstances model.currentPane), onClick GoToPersonalCircumstances ] [ text "Other details" ]
                        ]
                    , personalDetailsView model.details model model.currentPane
                    , letterView model.details model.currentPane
                    , personalCircumstancesView model.details model.currentPane
                    ]
                ]
            ]
        ]
