import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Layout from '../components/Layout'
import Form from './form.js'
import Nav from '../components/Nav'
import content from '../content/mptracker.md'
import { CheckMark, CrossMark, AlertMark } from '../components/Icons'
import Head from 'next/head'

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

const FooterCTA = ({ _data: data }) => (
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

const Tracker = ({ _data }) => {
  const [data, setData] = useState(_data)
  const [field, setField] = useState('')
  const [order, setOrder] = useState(true)

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

  useEffect(() => {
    if (data[0].electorate) {
      setField('electorate')
    } else {
      setField('state')
    }
  }, [])

  const sortedData = useMemo(
    () => {
      if (!field) return data
      return data.sort((a, b) =>
        order ? (a[field] > b[field] ? 1 : -1) : a[field] < b[field] ? 1 : -1
      )
    },
    [data, order, field]
  )

  return (
    <>
      <div className='grid-container mb-5'>
        <div className='grid-x'>
          <div className='small-12 columns'>
            <table id='mp-tracker-table'>
              <thead>
                <tr>
                  <th className='nosort' />
                  <th className='nosort' />
                  {sortedData[0].electorate && <th className='nosort' />}
                  <th className='nosort' />
                  <th colSpan='3' className='bordered nosort'>
                    Meeting Invites
                  </th>
                </tr>
                <tr className='sep'>
                  <th colSpan='7' />
                </tr>
                <tr className='lower'>
                  <th
                    className={field == 'name' && 'active'}
                    onClick={() => {
                      setField('name')
                      setOrder(!order)
                    }}>
                    Name
                  </th>
                  <th
                    className={field == 'party' && 'active'}
                    onClick={() => {
                      setField('party')
                      setOrder(!order)
                    }}>
                    Party
                  </th>
                  {sortedData[0].electorate && (
                    <th
                      className={field == 'electorate' && 'active'}
                      onClick={() => {
                        setField('electorate')
                        setOrder(!order)
                      }}>
                      Electorate
                    </th>
                  )}
                  <th
                    className={field == 'state' && 'active'}
                    onClick={() => {
                      setField('state')
                      setOrder(!order)
                    }}>
                    State
                  </th>
                  <th
                    className={`centered ${field == 'firstMeeting' && 'active'}`}
                    onClick={() => {
                      setField('firstMeeting')
                      setOrder(!order)
                    }}>
                    First
                  </th>
                  <th
                    className={`centered ${field == 'secondMeeting' && 'active'}`}
                    onClick={() => {
                      setField('secondMeeting')
                      setOrder(!order)
                    }}>
                    Second
                  </th>
                  <th
                    className={`centered ${field == 'thirdMeeting' && 'active'}`}
                    onClick={() => {
                      setField('thirdMeeting')
                      setOrder(!order)
                    }}>
                    Third
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map(item => (
                  <tr key={item.name}>
                    <td className='bold'>{item.name}</td>
                    <td>{item.party}</td>
                    {item.electorate && <td>{item.electorate}</td>}
                    <td>{item.state}</td>
                    <td
                      width='80'
                      className={`
                        icon centered bordered-left
                        ${getIconClass(item.firstMeeting)}`}>
                      {getIcon(item.firstMeeting)}
                    </td>
                    <td
                      width='80'
                      className={`
                        icon centered
                        ${getIconClass(item.secondMeeting)}`}>
                      {getIcon(item.secondMeeting)}
                    </td>
                    <td
                      width='80'
                      className={`
                        icon centered
                        ${getIconClass(item.thirdMeeting)}`}>
                      {getIcon(item.thirdMeeting)}
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
  const [activeTab, setActiveTab] = useState(true)

  const renderTracker = useMemo(
    () => {
      return activeTab ? (
        <Tracker _data={c.mps} />
      ) : (
        <div>
          <Tracker _data={c.senators} />{' '}
        </div>
      )
    },
    [activeTab]
  )

  return (
    <>
      <Nav />
      <Head />
      <FooterCTA _data={c.hero} />
      <div className='grid-container mt-5'>
        <div className='grid-x'>
          <div className='small-12 cells'>
            <div className='tabs'>
              <a
                className={`tab ${activeTab && 'active'}`}
                onClick={() => setActiveTab(true)}>
                MPs
              </a>
              <a
                className={`tab ${!activeTab && 'active'}`}
                onClick={() => setActiveTab(false)}>
                Senators
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='tracker-container'>
        {renderTracker}
        {/* <Tracker _data={data} /> */}
      </div>
    </>
  )
}

export default Index
