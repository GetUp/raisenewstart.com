module FraudStop exposing (main)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Http exposing (..)
import Json.Decode as Decode
import Json.Encode as Encode


type alias Model =
    { accordions : List Accordion
    , currentPane : Pane
    , response : SubmitResponse
    , details : Details
    , moduleSize : ModuleSize
    , host : Host
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
    , emailMP : Bool
    , emailMinister : Bool
    , submitFoi : Bool
    , receiveUpdates : Bool
    , classAction : Bool
    , hasPersonalCircumstances : Bool
    , personalCircumstances : Circumstances
    }


type alias Circumstances =
    { illness : Bool
    , financialHardship : Bool
    , addiction : Bool
    , homelessness : Bool
    , other : String
    }


type alias Accordion =
    { open : Bool
    , header : String
    , content : String
    }


type alias Host =
    String


type Pane
    = PersonalDetails
    | Letter
    | PersonalCircumstances
    | FinalStep


type ModuleSize
    = Expanded
    | Shrunk


type SubmitResponse
    = Res (Result Http.Error String)
    | Loading
    | NotSubmitted


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
    , emailMP = True
    , emailMinister = True
    , submitFoi = True
    , receiveUpdates = False
    , classAction = False
    , hasPersonalCircumstances = False
    , personalCircumstances = initialCircumstances
    }


initialCircumstances : Circumstances
initialCircumstances =
    { illness = False
    , financialHardship = False
    , addiction = False
    , homelessness = False
    , other = ""
    }


initialModel : Host -> Model
initialModel host =
    { accordions = initialAccordions
    , currentPane = PersonalDetails
    , response = NotSubmitted
    , details = initialDetails
    , moduleSize = Shrunk
    , host = host
    }


encode : Details -> Encode.Value
encode details =
    Encode.object
        [ ( "firstName", Encode.string details.firstName )
        , ( "lastName", Encode.string details.lastName )
        , ( "email", Encode.string details.email )
        , ( "address", Encode.string details.address )
        , ( "suburb", Encode.string details.suburb )
        , ( "postcode", Encode.string details.postcode )
        , ( "dob", Encode.string details.dob )
        , ( "phone", Encode.string details.phone )
        , ( "crn", Encode.string details.crn )
        , ( "debtReason", Encode.string details.debtReason )
        , ( "emailMP", Encode.bool details.emailMP )
        , ( "emailMinister", Encode.bool details.emailMinister )
        , ( "submitFoi", Encode.bool details.submitFoi )
        , ( "personalCircumstances", encodePersonalCircumstances details.personalCircumstances )
        ]


encodePersonalCircumstances : Circumstances -> Encode.Value
encodePersonalCircumstances circumstances =
    let
        all =
            [ ( "Illness (including mental illness)", circumstances.illness )
            , ( "Financial hardship", circumstances.financialHardship )
            , ( "Addiction", circumstances.addiction )
            , ( "Homelessness", circumstances.homelessness )
            , ( circumstances.other, not (String.isEmpty circumstances.other) )
            ]

        filterCircumstances ( s, b ) =
            if b then
                Just s

            else
                Nothing

        list =
            List.filterMap filterCircumstances all
    in
    Encode.list Encode.string list


hostDecoder : Decode.Decoder String
hostDecoder =
    Decode.field "host" Decode.string


type alias Flags =
    Decode.Value


init : Flags -> ( Model, Cmd Msg )
init flags =
    let
        hostResult =
            Decode.decodeValue hostDecoder flags
    in
    case hostResult of
        Ok host ->
            ( initialModel host, Cmd.none )

        Err error ->
            ( initialModel "", Cmd.none )


main : Program Flags Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }


type Msg
    = ClickedAccordion String
    | SetFirstName String
    | SetLastName String
    | SetEmail String
    | SetAddress String
    | SetSuburb String
    | SetPostcode String
    | SetDob String
    | SetPhone String
    | SetCRN String
    | SetdebtReason String
    | SetEmailMP
    | SetEmailMinister
    | SetSubmitFoi
    | SetReceiveUpdates
    | SetClassAction
    | SetHasPersonalCircumstances Bool
    | SetIllness
    | SetFinancialHardship
    | SetAddiction
    | SetHomelessness
    | SetOtherReason String
    | GoToLetter
    | GoToPersonalDetails
    | GoToPersonalCircumstances
    | GoToFinalStep
    | RestartForm
    | SubmitForm
    | GotResponse (Result Http.Error String)
    | ToggleModuleSize ModuleSize


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        ClickedAccordion accordionHeader ->
            let
                newAccordions =
                    List.map (toggleAccordion accordionHeader) model.accordions
            in
            ( { model | accordions = newAccordions }, Cmd.none )

        SetFirstName firstName ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | firstName = firstName } }
            in
            ( newDetails, Cmd.none )

        SetLastName lastName ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | lastName = lastName } }
            in
            ( newDetails, Cmd.none )

        SetEmail email ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | email = email } }
            in
            ( newDetails, Cmd.none )

        SetAddress address ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | address = address } }
            in
            ( newDetails, Cmd.none )

        SetSuburb suburb ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | suburb = suburb } }
            in
            ( newDetails, Cmd.none )

        SetPostcode postcode ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | postcode = postcode } }
            in
            ( newDetails, Cmd.none )

        SetDob dob ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | dob = dob } }
            in
            ( newDetails, Cmd.none )

        SetPhone phone ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | phone = phone } }
            in
            ( newDetails, Cmd.none )

        SetCRN crn ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | crn = crn } }
            in
            ( newDetails, Cmd.none )

        SetdebtReason debtReason ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | debtReason = debtReason } }
            in
            ( newDetails, Cmd.none )

        SetEmailMP ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | emailMP = not details.emailMP } }
            in
            ( newDetails, Cmd.none )

        SetEmailMinister ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | emailMinister = not details.emailMinister } }
            in
            ( newDetails, Cmd.none )

        SetSubmitFoi ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | submitFoi = not details.submitFoi } }
            in
            ( newDetails, Cmd.none )

        SetReceiveUpdates ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | receiveUpdates = not details.receiveUpdates } }
            in
            ( newDetails, Cmd.none )

        SetClassAction ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | classAction = not details.classAction } }
            in
            ( newDetails, Cmd.none )

        SetHasPersonalCircumstances val ->
            let
                details =
                    model.details

                newDetails =
                    { model | details = { details | hasPersonalCircumstances = val } }
            in
            ( newDetails, Cmd.none )

        SetIllness ->
            let
                details =
                    model.details

                circumstances =
                    details.personalCircumstances

                newDetails =
                    { model
                        | details =
                            { details
                                | personalCircumstances = { circumstances | illness = not circumstances.illness }
                            }
                    }
            in
            ( newDetails, Cmd.none )

        SetFinancialHardship ->
            let
                details =
                    model.details

                circumstances =
                    details.personalCircumstances

                newDetails =
                    { model
                        | details =
                            { details
                                | personalCircumstances = { circumstances | financialHardship = not circumstances.financialHardship }
                            }
                    }
            in
            ( newDetails, Cmd.none )

        SetAddiction ->
            let
                details =
                    model.details

                circumstances =
                    details.personalCircumstances

                newDetails =
                    { model
                        | details =
                            { details
                                | personalCircumstances = { circumstances | addiction = not circumstances.addiction }
                            }
                    }
            in
            ( newDetails, Cmd.none )

        SetHomelessness ->
            let
                details =
                    model.details

                circumstances =
                    details.personalCircumstances

                newDetails =
                    { model
                        | details =
                            { details
                                | personalCircumstances = { circumstances | homelessness = not circumstances.homelessness }
                            }
                    }
            in
            ( newDetails, Cmd.none )

        SetOtherReason other ->
            let
                details =
                    model.details

                circumstances =
                    details.personalCircumstances

                newDetails =
                    { model
                        | details =
                            { details
                                | personalCircumstances = { circumstances | other = other }
                            }
                    }
            in
            ( newDetails, Cmd.none )

        GoToLetter ->
            ( { model | currentPane = Letter }, Cmd.none )

        GoToPersonalDetails ->
            ( { model | currentPane = PersonalDetails }, Cmd.none )

        GoToPersonalCircumstances ->
            ( { model | currentPane = PersonalCircumstances }, Cmd.none )

        GoToFinalStep ->
            ( { model | currentPane = FinalStep }, Cmd.none )

        SubmitForm ->
            ( { model | response = Loading }, submitForm model )

        RestartForm ->
            ( { model | response = NotSubmitted }, Cmd.none )

        GotResponse response ->
            ( { model | response = Res response }, Cmd.none )

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
    Http.post
        { url = model.host ++ "/begin"
        , body = Http.jsonBody (encode model.details)
        , expect = Http.expectString GotResponse
        }


toggleAccordion : String -> Accordion -> Accordion
toggleAccordion header accordion =
    if accordion.header == header then
        { accordion | open = not accordion.open }

    else
        accordion



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


multistepsView : Pane -> Html Msg
multistepsView currentPane =
    div [ class "steps-container" ]
        [ div
            [ class "step"
            , classList
                [ ( "active", currentPane == PersonalDetails )
                ]
            , onClick GoToPersonalDetails
            ]
            [ text "About you" ]
        , div
            [ class "step"
            , classList
                [ ( "active", currentPane == Letter )
                , ( "disable", currentPane == PersonalDetails )
                ]
            , onClick GoToLetter
            , disabled True
            ]
            [ text "Your story" ]
        , div
            [ class "step"
            , classList
                [ ( "active", currentPane == PersonalCircumstances )
                , ( "disable", currentPane == PersonalDetails || currentPane == Letter )
                ]
            , onClick GoToPersonalCircumstances
            ]
            [ text "Other details" ]
        , div
            [ class "step"
            , classList
                [ ( "active", currentPane == FinalStep )
                , ( "disable", currentPane /= FinalStep )
                ]
            , onClick GoToFinalStep
            ]
            [ text "Final Step" ]
        ]


personalDetailsView : Details -> Model -> Pane -> Html Msg
personalDetailsView details model currentPane =
    Html.form
        [ class "form-container personal-details"
        , classList [ ( "hide", not (currentPane == PersonalDetails) ) ]
        , onSubmit GoToLetter
        ]
        [ div [ class "form-item" ]
            [ label [ class "", for "firstName" ] [ text "First Name" ]
            , input [ type_ "text", required True, id "firstName", name "firstName", placeholder "First Name", value details.firstName, onInput SetFirstName ] []
            ]
        , div [ class "form-item" ]
            [ label [ class "", for "lastName" ] [ text "Last Name" ]
            , input [ type_ "text", required True, id "lastName", name "lastName", placeholder "Last Name", value details.lastName, onInput SetLastName ] []
            ]
        , div [ class "form-item" ]
            [ label [ class "", for "email" ] [ text "Email" ]
            , input [ type_ "email", required True, id "email", name "email", placeholder "Email", value details.email, onInput SetEmail ] []
            ]
        , div [ class "form-item" ]
            [ label [ class "", for "address" ] [ text "Address" ]
            , input [ type_ "text", required True, id "address", name "address", placeholder "Address", value details.address, onInput SetAddress ] []
            ]
        , div [ class "form-item" ]
            [ label [ class "", for "suburb" ] [ text "Suburb" ]
            , input [ type_ "text", required True, id "suburb", name "suburb", placeholder "Suburb", value details.suburb, onInput SetSuburb ] []
            ]
        , div [ class "form-item" ]
            [ label [ class "", for "postcode" ] [ text "Post Code" ]
            , input [ type_ "text", required True, id "postcode", name "postcode", placeholder "Post Code", pattern "^[0-9]{4}$", title "Your postcode should be 4 digits", value details.postcode, onInput SetPostcode ] []
            ]
        , div [ class "form-item" ]
            [ label [ class "", for "dob" ] [ text "Date of Birth" ]
            , input [ type_ "date", required True, id "dob", name "dob", placeholder "dd/mm/yyyy", value details.dob, onInput SetDob ] []
            ]
        , div [ class "form-item" ]
            [ label [ class "", for "Phone" ] [ text "Phone" ]
            , input [ type_ "text", required True, id "Phone", name "Phone", placeholder "Phone", pattern "^[+ 0-9]{10,16}$", title "Please enter your phone number with area code. e.g. 02 9876 5432", value details.phone, onInput SetPhone ] []
            ]
        , div [ class "form-item" ]
            [ label [ class "", for "crn" ] [ text "Centrelink Reference Number (CRN)" ]
            , input [ type_ "text", required True, id "crn", name "crn", placeholder "123456789A", pattern "^[0-9]{9}[a-zA-Z]{1}$", title "Your Centrelink CRN should be 9 digits followed by 1 letter", value details.crn, onInput SetCRN ] []
            ]
        , button [ type_ "submit", class "btn btn-primary mt-4" ] [ text "Next" ]
        ]


letterView : Details -> Pane -> Html Msg
letterView details currentPane =
    let
        formatDob =
            String.join "/" << List.reverse << String.split "-"
    in
    Html.form
        [ class "form-container"
        , classList [ ( "hide", not (currentPane == Letter) ) ]
        , onSubmit GoToPersonalCircumstances
        ]
        [ div [ class "alert-container" ]
            [ p [ class "" ]
                [ text "A sample of the letter. Your reasons will be added to the letter that is sent directly to Centrelink. If you've made a mistake while entering your details, press back to edit it."
                ]
            ]
        , div [ class "letter-container" ]
            [ p [] [ text "I am writing to request a review by an Authorised Review Officer. My personal details, the decision I am appealing against, and my reasons for appealing are set out below." ]
            , p [ class "mb-0" ] [ text ("Name: " ++ details.firstName ++ " " ++ details.lastName) ]
            , p [ class "mb-0" ] [ text ("Date of birth: " ++ formatDob details.dob) ]
            , p [ class "mb-0" ] [ text ("Address: " ++ details.address) ]
            , p [ class "mb-0" ] [ text ("CRN: " ++ details.crn) ]
            , p [ class "mb-0" ] [ text ("Telephone: " ++ details.phone) ]
            , p [] [ text ("Email: " ++ details.email) ]
            , p [] [ text "I am appealing the decision to subject me to an automatically generated compliance intervention process." ]
            , p [] [ b [] [ text "My reasons for appealing are:" ] ]
            , textarea
                [ id "debtReason"
                , class "debt-reason"
                , name "debtReason"
                , placeholder "Explain to Centrelink in a few sentences why you feel the letter you received is incorrect. Please keep it short and aim to stick to the facts as much as possible."
                , value details.debtReason
                , onInput SetdebtReason
                , required True
                ]
                []
            ]
        , button [ class "btn btn-primary btn-outline mt-4 mr-2", onClick GoToPersonalDetails ] [ text "Back" ]
        , button [ type_ "submit", class "btn btn-primary mt-4" ] [ text "Next" ]
        ]


personalCircumstancesView : Details -> Pane -> Html Msg
personalCircumstancesView details currentPane =
    div
        [ class "form-container personal-circumstances-container"
        , classList [ ( "hide", not (currentPane == PersonalCircumstances) ) ]
        , onSubmit GoToLetter
        ]
        [ label [ class "mb-3" ] [ text "Do you have any specific personal circumstances which may have impacted your ability to report income or caused you significant hardship?" ]
        , div [ class "radio-buttons" ]
            [ input [ class "mr-2", type_ "radio", id "impacted_ability_to_report_income_yes", onClick (SetHasPersonalCircumstances True), checked details.hasPersonalCircumstances ] []
            , label [ for "impacted_ability_to_report_income_yes", class "mr-3" ] [ text "Yes" ]
            , input [ class "mr-2", type_ "radio", id "impacted_ability_to_report_income_no", onClick (SetHasPersonalCircumstances False), checked (not details.hasPersonalCircumstances) ] []
            , label [ for "impacted_ability_to_report_income_no" ] [ text "No" ]
            ]
        , br [] []
        , br [] []
        , div
            [ classList [ ( "hide", not details.hasPersonalCircumstances ) ] ]
            [ label [ class "mb-3" ] [ text "Which specific personal circumstances apply to your case? (choose all those that apply)" ]
            , div
                [ class "radio-buttons" ]
                [ input [ id "illness", class "mr-2 mb-3", type_ "checkbox", onClick SetIllness, checked details.personalCircumstances.illness ] []
                , label [ for "illness", class "mr-3" ] [ text "Illness (including mental illness)" ]
                , br [] []
                , input [ id "financial-hardship", class "mr-2 mb-3", type_ "checkbox", onClick SetFinancialHardship, checked details.personalCircumstances.financialHardship ] []
                , label [ for "financial-hardship", class "mr-3" ] [ text "Financial hardship" ]
                , br [] []
                , input [ id "addiction", class "mr-2 mb-3", type_ "checkbox", onClick SetAddiction, checked details.personalCircumstances.addiction ] []
                , label [ for "addiction", class "mr-3" ] [ text "Addiction" ]
                , br [] []
                , input [ id "homelessness", class "mr-2 mb-3", type_ "checkbox", onClick SetHomelessness, checked details.personalCircumstances.homelessness ] []
                , label [ for "homelessness", class "mr-3" ] [ text "Homelessness" ]
                , br [] []
                , input [ class "mr-2 mb-3 mt-2 other-inputbox", type_ "text", placeholder "Other circumstances (if any)", onInput SetOtherReason ] []
                ]
            ]
        , a [ class "btn btn-outline btn-primary mt-5 mr-2", onClick GoToLetter ] [ text "Back" ]
        , a [ class "btn btn-primary mt-5", onClick GoToFinalStep ] [ text "Next" ]
        ]


finalStepView : Details -> Pane -> Html Msg
finalStepView details currentPane =
    div
        [ class "form-container personal-circumstances-container"
        , classList [ ( "hide", not (currentPane == FinalStep) ) ]
        , onSubmit GoToLetter
        ]
        [ p [ class "h3" ] [ b [] [ text "Do you want to take this further?" ] ]
        , p [] [ text "Before we submit your review to Centrelink, you can choose to also do as many of the following actions as you like to make even more noise and increase your chances of a favourable outcome." ]
        , div [ class "alert-container" ]
            [ p [] [ text "Please note that to do this we have to pass on some of your personal details, including your name, address, email and phone number." ]
            ]
        , div []
            [ input [ id "email_local_member", class "mr-2", type_ "checkbox", onClick SetEmailMP, checked details.emailMP ] []
            , label [ for "email_local_member", class "mr-3" ] [ text "Email my local Member of Parliament asking for assistance with my case." ]
            , br [] []
            , br [] []
            , input [ id "email_minister", class "mr-2", type_ "checkbox", onClick SetEmailMinister, checked details.emailMinister ] []
            , label [ for "email_minister", class "mr-3 mb-3" ] [ text "Email the Minister in charge of Centrelink, calling on them to stop the automatic debt-threat letters immediately." ]
            , br [] []
            , br [] []
            , input [ id "submit_foi", class "mr-2", type_ "checkbox", onClick SetSubmitFoi, checked details.submitFoi ] []
            , label [ for "submit_foi", class "mr-3" ]
                [ text "Submit a Freedom of Information request asking for my current Centrelink file and the information used to calculate the debt Centrelink claims I owe."
                ]
            , br [] []
            , hr [] []
            , input [ id "receive_updates", class "mr-2", type_ "checkbox", onClick SetReceiveUpdates, checked details.receiveUpdates ] []
            , label [ for "receive_updates", class "mr-3" ] [ text "Receive updates" ]
            , br [] []
            , br [] []
            , input [ id "participate_class_action", class "mr-2", type_ "checkbox", onClick SetClassAction, checked details.classAction ] []
            , label [ for "participate_class_action", class "mr-3" ]
                [ text "Would you be interested in participating in a potential class action lawsuit against the automated debt letters?"
                ]
            ]
        , a [ class "btn btn-outline btn-primary mt-5 mr-2", onClick GoToPersonalCircumstances ] [ text "Back" ]
        , a [ class "btn btn-primary mt-5", onClick SubmitForm ] [ text "Submit" ]
        ]


moduleView : Model -> Html Msg
moduleView model =
    div []
        [ multistepsView model.currentPane
        , personalDetailsView model.details model model.currentPane
        , letterView model.details model.currentPane
        , personalCircumstancesView model.details model.currentPane
        , finalStepView model.details model.currentPane
        ]


errorSubmitView : Html Msg
errorSubmitView =
    div [ class "form-container error-container mt-4" ]
        [ h2 [ class "error-title h4" ] [ text "Sorry! Something went wrong. " ]
        , a [ class "link", onClick RestartForm ] [ b [] [ text "Click here to try again" ] ]
        ]


loadingSubmitView : Html Msg
loadingSubmitView =
    div [ class "form-container loading-container mt-5" ]
        [ img [ src "/static/images/spinner.svg", alt "Loading..." ] []
        ]


successSubmitView : Html Msg
successSubmitView =
    div [ class "form-container success-container mt-4" ]
        [ h2 [ class "success-title h4" ] [ text "We've received your details! Please check your email inbox to proceed." ]
        , div [ class "alert-container" ]
            [ p [] [ text "You should receive an email from us (GetUp!) very soon. If you do not receive this email, you may have typed your email incorrectly and you will need to resubmit your request." ]
            ]
        ]


showModule : SubmitResponse -> Model -> Html Msg
showModule req model =
    case req of
        NotSubmitted ->
            moduleView model

        Res (Ok _) ->
            successSubmitView

        Loading ->
            loadingSubmitView

        Res (Err _) ->
            errorSubmitView


view : Model -> Html Msg
view model =
    div []
        [ div [ class "grid-container fluid fraudstop" ]
            [ div [ class "grid-x grid-padding-x " ]
                [ div
                    [ class "cell small-12 fraudstop-text"
                    , classList
                        [ ( "medium-4 large-4", model.moduleSize == Expanded )
                        , ( "medium-6 large-8", model.moduleSize == Shrunk )
                        ]
                    ]
                    [ div [ class "fraudstop-text-wrapper" ]
                        [ img [ src "/static/images/newstart-logo.svg", class "logo mb-3" ] []
                        , h1 [ class "headline mb-3" ]
                            [ strong [] [ text "Fight back against Centrelink debt claims" ]
                            ]
                        , p [ class "h5 mb-4" ]
                            [ text "Receiving a robodebt notice can be incredibly stressful. Many people pay debts they don’t actually owe, out of sheer despair. "
                            , b [] [ text "But help exists." ]
                            ]
                        , p [ class "h5 mb-4" ]
                            [ b [] [ text "Fraudstop makes the process of starting your appeal a little bit easier. " ]
                            , text "Just enter the details of your appeal, and Fraudstop will automatically generate and send a number of letters that will help you initiate and progress your appeal."
                            ]
                        , p [ class "h5 mb-4" ]
                            [ b [] [ text "Fraudstop is not a complete solution." ]
                            , text " Appeals often take months, and require a fair amount of correspondence with Centrelink. But it is here to help get you started during a stressful time. "
                            ]
                        , div [ class "questions--container mt-3" ]
                            [ div [ class "question" ]
                                [ img [ src "/static/images/orangeArrow.svg", class "arrow" ] []
                                , a [ class "h5", href "#why-should-i-appeal" ] [ text "Why should I appeal my debt?" ]
                                ]
                            , div [ class "question" ]
                                [ img [ src "/static/images/orangeArrow.svg", class "arrow" ] []
                                , a [ class "h5", href "#how-does-fraudstop-work" ] [ text "How does Fraudstop work?" ]
                                ]
                            ]
                        ]
                    ]
                , div
                    [ class "cell small-12 fraudstop-form mb-5"
                    , classList
                        [ ( "medium-8 large-8", model.moduleSize == Expanded )
                        , ( "medium-6 large-4", model.moduleSize == Shrunk )
                        ]
                    ]
                    [ div [ class "fraudstop-form-text--wrapper" ]
                        [ div
                            [ class "expand-container"
                            , classList
                                [ ( "shrunk", model.moduleSize == Expanded )
                                , ( "expanded", model.moduleSize == Shrunk )
                                ]
                            , onClick (ToggleModuleSize model.moduleSize)
                            ]
                            [ span [ class "shrunk-text" ] [ text "Shrink" ]
                            , span [ class "expanded-text" ] [ text "Expand" ]
                            , img [ src "/static/images/expand-icon.svg" ] []
                            ]

                        -- , h2 [ class "h6 title" ] [ text "This is a title" ]
                        , p [] [ text "FraudStop makes it quick and easy to appeal an automated debt claim against you. All you need to do is enter a few details, explain why you want to appeal the debt claim against you, and hit send - FraudStop does the rest." ]
                        ]
                    , showModule model.response model
                    ]
                ]
            ]
        , div [ class "answers--container" ]
            [ div [ class "grid-container py-5" ]
                [ div [ class "grid-x" ]
                    [ div
                        [ class "cell small-12 medium-10 large-8" ]
                        [ div [ id "why-should-i-appeal" ]
                            [ h2 [ class "h4" ] [ b [] [ text "Why should I appeal my debt?" ] ]
                            , p []
                                [ text "If you’ve received a debt notice and it doesn’t seem right, chances are it isn’t. At least 20% of the automated debt letters sent out by the government have been incorrect. In total, more than 113,000 debts have been partially or fully reduced. In fact, on average debts that are appealed are reduced by 75%. As a result, experts are recommending that people submit their debt for review – regardless of whether they think the amount is correct."
                                ]
                            , p []
                                [ text "The appeals process can be long winded, but you can have any processing fees waived, and repayments suspended while the review process is underway. " ]
                            ]
                        , div [ class "mt-5", id "how-does-fraudstop-work" ]
                            [ h2 [ class "h4" ] [ b [] [ text "How does Fraudstop work?" ] ]
                            , ol []
                                [ li []
                                    [ b [] [ text "Using the information you provide, we compile a formal review request in accordance with Centrelink guidelines." ]
                                    , text "We then print it off and post your appeal to Centrelink on your behalf – free of charge, and send you an electronic copy for your records."
                                    ]
                                , li []
                                    [ b [] [ text "We submit an FOI request for your Centrelink file" ]
                                    , text " – asking for any payslips or medical records that they have on file, to ensure you’ve got any available information that might assist in your appeal."
                                    ]
                                , li []
                                    [ b [] [ text "Notify your local MP and request their assistance" ]
                                    , text " – not all MPs are sympathetic and helpful, but we’ve had numerous reports of local members being helpful throughout the process."
                                    ]
                                , li []
                                    [ b [] [ text "Send a complaint to Social Services Minister Anne Ruston, and Government Services Minister Stuart Robert" ]
                                    , text " – who are responsible for maintaining this broken system, along with other attacks on income support recipients. "
                                    ]
                                , li []
                                    [ b [] [ text "We’ll send you a follow up pack with further information on sources of information and legal support, and an overview of the appeals timeline. " ]
                                    , text "We’ll also send a few short surveys to help improve the process for others – immediately after you submit your request, after two months, and after four months. There is no obligation to complete these surveys, and we will delete your contact information from our system after five months have passed. "
                                    ]
                                ]
                            , p []
                                [ b [] [ text " Important Note: " ]
                                , text "Your data belongs to you. We understand that these appeals can contain sensitive, personal information. We retain no personal information for longer than is necessary to take the above steps, and we will not store your email address beyond the four month follow up window, unless you directly consent to us doing so. "
                                ]
                            ]
                        ]
                    ]
                ]
            ]
        ]
