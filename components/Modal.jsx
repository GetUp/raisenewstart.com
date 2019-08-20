import React, { Component } from 'react'
import Popup from 'reactjs-popup'
import Form from '../components/Form'
// import Spinner from '../images/spinner.svg'

import { FacebookShareButton, TwitterShareButton, EmailShareButton } from 'react-share'
/* eslint-disable */
class Modal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        postCode: '',
      },
      // postUrl: 'https://jsonplaceholder.typicode.com/posts',
      postUrl: 'https://www.getup.org.au/api/take_action_with_external',
      isWaitingForResponse: false,
      isFormSubmitted: true,
      shareInfo: {
        url: 'https://www.getup.org.au/',
        text:
          "I'm driving change for the better this election time with GetUp. Will you join me? getup.org.au via @GetUp!",
      },
      module: this.props.module,
      emailValid: true,
    }
  }

  handleInputChange = e => {
    const value = e.target.value
    const name = e.target.name
    this.setState({
      form: {
        ...this.state.form,
        [name]: value,
      },
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    const { firstName, lastName, email, phone, postCode } = this.state.form
    const url = this.state.postUrl

    this.setState({ isWaitingForResponse: true })

    const payload = {
      module_id: this.state.module.moduleId,
      page_id: this.state.module.pageId,
      external_source: 'election19',
      first_name: firstName,
      last_name: lastName,
      email,
      mobile_number: phone,
      postcode_number: postCode,
    }

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (response.status === 200) {
          this.setState({ isWaitingForResponse: false, isFormSubmitted: true })
        } else {
          console.error('Error:' + response)
        }
      })
      .catch(console.log.bind(console))
  }

  validateField = (fieldName, value) => {
    let emailValid

    switch (fieldName) {
      case 'email':
        emailValid = value.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        )
        break
      default:
        break
    }
    return !!emailValid
  }

  handleBlur = e => {
    const name = e.target.name
    const value = e.target.value

    this.setState({ emailValid: this.validateField(name, value) })
  }

  showForm = close => (
    <>
      <button className="close" onClick={close}>
        &times;
      </button>
      <Form
        handleInputChange={this.handleInputChange}
        handleSubmit={this.handleSubmit}
        handleBlur={this.handleBlur}
        emailValid={this.state.emailValid}
        heading={this.props.heading}
        button={this.props.button}
      />
    </>
  )

  showSpinner = () => (
    <div className="modal-v2-container spinner">
      <div className="modal-v2">
        <div className="modal-v2-image-wrapper">
          <img src={Spinner} />
        </div>
      </div>
    </div>
  )

  showShareScreen = close => (
    <>
      <button className="close" onClick={close}>
        &times;
      </button>
      <div className="modal-v2-container ">
        <div className="modal-v2">
          <div className="modal-v2-text-wrapper">
            <h2 className="h3 modal-v2-heading">Tell your friends!</h2>
            <p className="modal-v2-blurb">
              The more people who get involved in the campaign, the greater impact we can
              have. <br /> <br />
              <b>Share with friends and family now.</b>
            </p>
            <div style={{ maxWidth: '300px' }}>
              <FacebookShareButton
                url={this.state.shareInfo.url}
                quote={this.state.shareInfo.text}>
                <a href="#" className="btn btn-secondary btn-social fb btn-block mb-2">
                  Share on Facebook
                </a>
              </FacebookShareButton>
              <TwitterShareButton
                url={this.state.shareInfo.url}
                quote={this.state.shareInfo.text}>
                <a
                  href="#"
                  className="btn btn-secondary btn-social twitter btn-block mb-2">
                  Share on Twitter
                </a>
              </TwitterShareButton>
              <EmailShareButton
                url={this.state.shareInfo.url}
                subject={this.state.shareInfo.text}>
                <a href="#" className="btn btn-secondary btn-social email btn-block">
                  Email
                </a>
              </EmailShareButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )

  render() {
    const { className = '', module, notButton } = this.props
    return (
      <span className="custom-modal">
        <Popup
          trigger={
            <a className={`${notButton ? '' : 'btn'} ${className}`}>
              {' '}
              {this.props.buttonText}
            </a>
          }
          modal
          closeOnDocumentClick>
          {close => (
            <div
              className="modal custom"
              style={{ marginLeft: 'auto', marginRight: 'auto' }}>
              {this.state.isFormSubmitted
                ? this.showShareScreen(close)
                : this.state.isWaitingForResponse
                ? this.showSpinner()
                : this.showForm(close, module)}
              />
            </div>
          )}
        </Popup>
      </span>
    )
  }
}

export default Modal
