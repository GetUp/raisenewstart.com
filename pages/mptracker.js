import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Layout from '../components/Layout'
import Nav from '../components/Nav'
import content from '../content/mptracker.md'
import { CheckMark, CrossMark, AlertMark } from '../components/Icons'
import Head from '../components/Head'
import Footer from '../components/Footer'

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
      className='heart-background mp-tracker'
      style={{ backgroundImage: `url(/static/images/heart-pattern.svg)` }}>
      <div className='grid-container footer'>
        <div className='grid-x'>
          <div className='small-12 medium-10 large-8 columns'>
            <h2 className='footer-blurb h3'>
              Access to politics shouldn’t be determined your bank balance.{' '}
            </h2>
            <p className='mb-0'>
              If the Government want to legislate about the lives of unemployed people,
              and the programs they depend on – they need to hear their voices. We’re
              working with a number of unemployed advocacy groups, that are independent –
              both politically, and from GetUp – to track their efforts to meet with
              Government MPs and Senators.
            </p>
            <hr />
            <p className='mb-2'>
              <strong className='small'>Legend</strong>
            </p>
            <div className='icon--wrapper'>
              <div className='icon-container'>
                <div className='icon cross'>
                  <CrossMark />
                </div>
                <span className='text'>Declined</span>
              </div>
              <div className='icon-container'>
                <div className='icon check'>
                  <CheckMark />
                </div>
                <span className='text'>Accepted</span>
              </div>
              <div className='icon-container'>
                <div className='icon alert'>
                  <AlertMark />
                </div>
                <span className='text'>More Info</span>
              </div>
            </div>
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
                  <th
                    className={`nosort ${sortedData[0].electorate ? 'hide-in-small' : ''}`}
                  />
                  {sortedData[0].electorate && <th className={`nosort`} />}
                  <th className={`nosort`} />
                  <th colSpan='3' className='bordered nosort'>
                    Meeting Invites
                  </th>
                </tr>
                <tr className='sep'>
                  <th colSpan='7' />
                </tr>
                <tr className='lower'>
                  <th
                    className={field == 'name' ? 'active' : ''}
                    onClick={() => {
                      setField('name')
                      setOrder(!order)
                    }}>
                    Name
                  </th>
                  <th
                    className={field == 'party' ? 'active' : ''}
                    onClick={() => {
                      setField('party')
                      setOrder(!order)
                    }}>
                    Party
                  </th>
                  {sortedData[0].electorate && (
                    <th
                      className={field == 'electorate' ? 'active' : ''}
                      onClick={() => {
                        setField('electorate')
                        setOrder(!order)
                      }}>
                      Electorate
                    </th>
                  )}
                  <th
                    className={`${sortedData[0].electorate ? 'hide-in-small' : ''} ${field ==
                      'state' ? 'active' : ''}`}
                    onClick={() => {
                      setField('state')
                      setOrder(!order)
                    }}>
                    State
                  </th>
                  <th
                    className={`centered meeting ${field == 'firstMeeting' ? 'active' : ''}`}
                    onClick={() => {
                      setField('firstMeeting')
                      setOrder(!order)
                    }}>
                    <span className='hide-in-small'>First</span>
                    <span className='show-only-in-small'>
                      1<sup>st</sup>
                    </span>
                  </th>
                  <th
                    className={`centered meeting ${field == 'secondMeeting' ? 'active' : ''}`}
                    onClick={() => {
                      setField('secondMeeting')
                      setOrder(!order)
                    }}>
                    <span className='hide-in-small'>Second</span>
                    <span className='show-only-in-small'>
                      2<sup>nd</sup>
                    </span>
                  </th>
                  <th
                    className={`centered meeting ${field == 'thirdMeeting' ? 'active' : ''}`}
                    onClick={() => {
                      setField('thirdMeeting')
                      setOrder(!order)
                    }}>
                    <span className='hide-in-small'>Third</span>
                    <span className='show-only-in-small'>
                      3<sup>rd</sup>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedData.map(item => (
                  <tr key={item.name}>
                    <td className='bold'>{item.name}</td>
                    <td className='centered-in-small'>{item.party}</td>
                    {item.electorate && (
                      <td className='centered-in-small'>{item.electorate}</td>
                    )}
                    <td className={`${item.electorate ? 'hide-in-small' : ''}`}>
                      {item.state}
                    </td>
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
      <Head title='MP Tracker | Raise Newstart' />
      <FooterCTA _data={c.hero} />
      <div className='grid-container mt-0'>
        <div className='grid-x'>
          <div className='small-12 cells'>
            <div className='tabs'>
              <a
                className={`tab ${activeTab ? 'active' : ''}`}
                onClick={() => setActiveTab(true)}>
                MPs
              </a>
              <a
                className={`tab ${!activeTab ? 'active' : ''}`}
                onClick={() => setActiveTab(false)}>
                Senators
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className='tracker-container'>{renderTracker}</div>
      <Footer />
    </>
  )
}

export default Index
