import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import Form from './form.js'
import Nav from '../components/Nav'
import content from '../content/mptracker.md'
import { CheckMark, CrossMark, AlertMark } from '../components/Icons'

const PageGrid = ({ children, className }) => (
  <div className='grid-container'>
    <div className='grid-x'>
      <div className={`columns ${className}`}>{children}</div>
    </div>
  </div>
)

const WavePattern = ({ colour }) => {
  const getImage = () => {
    switch (colour) {
      case 'orange':
        return "url('/static/images/wave.svg')"
      case 'black':
        return "url('/static/images/wave-black.svg')"
      default:
        return "url('/static/images/wave.svg')"
    }
  }
  return <div className='wave-pattern mt-5' style={{ backgroundImage: getImage() }} />
}

const Hero = () => (
  <>
    <div
      className='heart-background'
      style={{ backgroundImage: `url(/static/images/heart-pattern.svg)` }}>
      <PageGrid className='small-12 hero-container'>
        <img src='/static/images/newstart-logo.svg' className='logo' />
        <div className='hero-text-container'>
          <h1 className='mb-4'>
            In a country as wealthy as Australia - being locked out of paid work,
            shouldn't mean being locked into poverty. <span>Raise Newstart.</span>
          </h1>
          <a href='#' className='btn'>
            Join the campaign
          </a>
        </div>
      </PageGrid>
    </div>
  </>
)

const FooterCTA = ({ data }) => (
  <>
    <div
      className='heart-background'
      style={{ backgroundImage: `url(/static/images/heart-pattern.svg)` }}>
      <div className='grid-container footer'>
        <div className='grid-x'>
          <div className='small-12 columns'>
            <h2 className='footer-blurb h5'>{data.subheading}</h2>
            <h3 className='footer-heading h1'>{data.heading}</h3>
            <a href='#' className='btn'>
              {data.button}
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
)

const Tracker = ({ data }) => {
  const getIcon = data => {
    switch (data) {
      case 'yes':
        return <CheckMark />
      case 'unavailable':
        return <AlertMark />
      case 'no':
        return <CrossMark />
      default:
        return ''
    }
  }
  const getIconClass = data => {
    switch (data) {
      case 'yes':
        return 'check'
      case 'unavailable':
        return 'alert'
      case 'no':
        return 'cross'
      default:
        return ''
    }
  }
  return (
    <>
      <div className='grid-container'>
        <div className='grid-x'>
          <div className='small-12 columns'>
            <table id='mp-tracker-table'>
              <thead>
                <tr>
                  <th className='nosort' />
                  <th className='nosort' />
                  <th className='nosort' />
                  <th className='nosort' />
                  <th className='nosort' />
                  <th colSpan='3' className='bordered nosort'>
                    Meeting Invites
                  </th>
                </tr>
                <tr className='sep'>
                  <th colSpan='7' />
                </tr>
                <tr className='lower'>
                  <th />
                  <th>Party</th>
                  <th>Name</th>
                  <th>Electorate</th>
                  <th>State</th>
                  <th className='unbold centered'>First</th>
                  <th className='unbold centered'>Second</th>
                  <th className='unbold centered'>Third</th>
                </tr>
              </thead>
              <tbody>
                {data.map(item => (
                  <tr key={item.name}>
                    <td width='24' className='partylogo'>
                      <span className={`${item.party.toLowerCase()}`} />
                    </td>
                    <td>{item.party}</td>
                    <td>{item.name}</td>
                    <td>{item.electorate}</td>
                    <td>{item.state}</td>
                    {console.log(item.meetingInvites)}
                    <td
                      width='80'
                      className={`
                        icon centered bordered-left
                        ${getIconClass(item.meetingInvites.first)}`}>
                      {getIcon(item.meetingInvites.first)}
                    </td>
                    <td
                      width='80'
                      className={`
                        icon centered
                        ${getIconClass(item.meetingInvites.second)}`}>
                      {getIcon(item.meetingInvites.second)}
                    </td>
                    <td
                      width='80'
                      className={`
                        icon centered
                        ${getIconClass(item.meetingInvites.third)}`}>
                      {getIcon(item.meetingInvites.third)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

const Index = () => {
  const c = content.attributes
  // const mpTracker = [
  //   {
  //     party: 'Labor',
  //     name: 'Bill Shorten',
  //     electorate: 'Sydney',
  //     state: 'NSW',
  //     meetingInvites: { first: 1, second: 3, third: 4 }
  //   },
  //   {
  //     party: 'Liberal',
  //     name: 'Bill Shorten',
  //     electorate: 'Sydney',
  //     state: 'NSW',
  //     meetingInvites: { first: 1, second: 2, third: 3 }
  //   }
  // ]
  return (
    <>
      <Nav />

      {/* <Hero /> */}
      <FooterCTA data={c.hero} />
      <Tracker data={c.mpTracker} />
    </>
  )
}

export default Index
