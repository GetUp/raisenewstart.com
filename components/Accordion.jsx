import React, { Component } from 'react'

export default class Accordion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      closed: true
    }
  }

  toggle = event => {
    event.preventDefault()
    this.setState(prevState => ({
      closed: !prevState.closed
    }))
  }

  render () {
    return (
      <section className={`accordion ${this.props.className}`}>
        <button
          className={`accordion-title ${this.state.closed ? 'accordion--closed' : ''}`}
          aria-expanded={!this.state.closed}
          onClick={event => this.toggle(event)}>
          <img
            src='/static/images/orangeArrow.svg'
            className={`accordion-arrow`}
            alt='Icon of an arrow'
            // className={`readmore-arrow ${!this.state.isActive ? 'arrow-active' : 'arrow-not-active'}`}
          />

          {this.props.header}
        </button>
        <div className={`accordion-body ${this.state.closed ? 'accordion--closed' : ''}`}>
          {this.props.children}
        </div>
      </section>
    )
  }
}
