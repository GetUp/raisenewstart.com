import React, { Component } from 'react'
import Popup from 'reactjs-popup'

// const LoadingAnimation = () => (
//   <div className='loading-image-container'>{/* <img src={Spinner} /> */}</div>
// )

export default class Modal extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalLink: this.props.href
    }
  }

  componentDidMount () {
    if (this.props.href) {
      this.setState({ modalLink: this.props.href })
    }

    function getURLParam (sParam) {
      var sPageURL = window.location.search.substring(1)
      var sURLVariables = sPageURL.split('&')
      var keyAndValue, indexOfEquals, key, value
      for (var i = 0; i < sURLVariables.length; i++) {
        keyAndValue = sURLVariables[i]
        indexOfEquals = keyAndValue.indexOf('=')
        if (indexOfEquals > -1) {
          key = keyAndValue.substring(0, indexOfEquals)
          value = keyAndValue.substring(indexOfEquals + 1).replace(/\//g, '')
          if (key === sParam) {
            return value
          }
        }
      }
    }
    let token = getURLParam('t')
    if (token) {
      const modalLink = this.state.modalLink + '?t=' + token
      this.setState({ modalLink })
    }
  }
  render () {
    const { className = '', href, buttonText, notButton = false, ...props } = this.props
    return (
      <Popup
        trigger={
          <button className={`${notButton ? '' : 'btn'} ${className}`} {...props}>
            {' '}
            {buttonText}
          </button>
        }
        modal
        closeOnDocumentClick>
        {close => (
          <div className='modal'>
            <button className='close' onClick={close}>
              &times;
            </button>
            <iframe
              className='iframe-modal'
              src={this.state.modalLink}
              title={this.state.modalLink}
            />

            {/* <LoadingAnimation /> */}
          </div>
        )}
      </Popup>
    )
  }
}
