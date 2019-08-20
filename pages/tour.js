import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Layout from '../components/Layout'
import content from '../content/home.md'
import AOS from 'aos'
import ReactMarkdown from 'react-markdown'
import 'aos/dist/aos.css'
import { StickyLocationSelector, LocationRadioButtons } from '../components/Location'
import Modal from '../components/Modal'
import { useRouter } from 'next/router'

const Tour = () => {
  const c = content.attributes
  const [locations] = useState(c.locations)
  const [currentLocation, setCurrentLocation] = useState(locations[0])
  const [locationPicker, setLocationPicker] = useState(false)
  const [showStickyLocationSelector, setShowStickyLocationSelector] = useState(false)
  const locationRadioBtnsElHero = useRef(null)
  const locationRadioBtnsElFooter = useRef(null)
  const router = useRouter()
  const locationQueryParam = router.query.loc ? router.query.loc : ''

  useEffect(() => {
    AOS.init({
      once: true
    })
    updateCurLocationViaParams(locationQueryParam)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', listener)
    return () => {
      window.removeEventListener('scroll', listener)
    }
  })

  const updateCurLocationViaParams = location => {
    switch (location.toLowerCase()) {
      case 'syd':
        setCurrentLocation(locations[0])
        break
      case 'melb':
        setCurrentLocation(locations[1])
        break
      case 'bris':
        setCurrentLocation(locations[2])
        break
      default:
        setCurrentLocation(locations[0])
    }
  }

  const listener = e => {
    setShowStickyLocationSelector(
      !isInViewport(locationRadioBtnsElHero, 150) &&
        !isInViewport(locationRadioBtnsElFooter)
    )
  }

  const isInViewport = (el, offset = 0) => {
    let rect = el.current.getBoundingClientRect()
    let windowHeight = window.innerHeight || document.documentElement.clientHeight

    return (
      rect.top >= 0 + offset &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    )
  }

  const renderAllLocations = ({ locations, id }) => (
    <>
      {locations.map(location => (
        <LocationRadioButtons
          key={location.city}
          id={id}
          location={location}
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
        />
      ))}
    </>
  )

  const renderHeroSection = ({ data }) => (
    <Section color='red' className='hero--container'>
      <div className='cell small-12 medium-8 always-on-top'>
        <img src='/static/images/logomark.svg' className='logomark mb-4' />
        <img src='/static/images/logo.svg' className='logo mb-4' />
      </div>
      <div className='cell small-12 medium-8 large-6 always-on-top'>
        <p style={{ color: 'white' }}>{data.subheading}</p>
        <hr />
        <div ref={locationRadioBtnsElHero}>
          {renderAllLocations({ locations, id: 'hero', ref: 'locationRadioBtnsElHero' })}
        </div>
        <br />
        <div>
          <a
            href={currentLocation.link}
            target='_blank'
            rel='noopener'
            className='btn btn-primary mr-2'>
            {data.buttonName}
          </a>
          {/* <Modal
            module={{
              pageId: 20667,
              moduleId: 49826
            }}
            buttonText='Share'
            heading='Share'
            button='Share'
            className='btn btn-primary btn-outline'
          /> */}
        </div>
      </div>
      <img src='/static/images/hero.jpg' className='hero--image mb-4' />
    </Section>
  )

  const renderMiddleSection = ({ data }) => (
    <Section color='yellow' className='middle--container'>
      <div className='cell small-12 medium-8' data-aos='fade-up' data-aos-duration='150'>
        <p className='large-p'>
          <b>{data.boldPara}</b>
        </p>
      </div>
      <div
        className='cell small-12 medium-8 large-6'
        data-aos='fade-up'
        data-aos-duration='150'
        data-aos-delay='100'>
        <ReactMarkdown source={data.para} className='para' />
      </div>
      <div className='cell' />
      <div className='small-12'>
        <img
          src='/static/images/fracking.jpg'
          className='mb-4 image'
          data-aos='fade-up'
          data-aos-duration='150'
        />
      </div>
      {/* <div className='small-12 medium-6 large-5'>
        <img
          src='/static/images/fracking.jpg'
          className='mb-4 image image--right'
          data-aos='fade-up'
          data-aos-duration='150'
          data-aos-delay='100'
        />
      </div> */}
      <img src='/static/images/lines-blue.svg' className='lines show-for-large' />
      <img src='/static/images/fracking.jpg' className='background--image mb-4' />
    </Section>
  )

  const renderBottomSection = ({ data }) => (
    <Section color='blue' className='bottom--container'>
      <div className='cell small-12 medium-8' data-aos='fade-up' data-aos-duration='150'>
        <p className='large-p'>
          <b>{data.boldPara}</b>
        </p>
      </div>
      <div
        className='cell small-12 medium-8 large-6'
        data-aos='fade-up'
        data-aos-duration='150'
        data-aos-delay='50'>
        <ReactMarkdown source={data.para} />
      </div>
    </Section>
  )

  return (
    <Layout>
      {renderHeroSection({ data: c.hero })}

      {renderMiddleSection({ data: c.middle })}

      {renderBottomSection({ data: c.bottom })}

      <Section color='blue' className='pt-5 cta--container'>
        <img
          src='/static/images/lines-yellow-small.svg'
          className='lines--small-only show-for-small-only mb-4'
        />
        <div className='cell small-12 medium-8 large-6'>
          <div className='cta--wrapper' data-aos='fade-up' data-aos-duration='150'>
            <p className='large-p mb-4'>
              <b>{c.cta.text}</b>
            </p>
            <div ref={locationRadioBtnsElFooter}>
              {renderAllLocations({
                locations,
                id: 'cta'
              })}
            </div>
            <a
              href={currentLocation.link}
              target='_blank'
              className='btn btn-primary mt-3'>
              {c.hero.buttonName}
            </a>
          </div>
        </div>
        <img src='/static/images/lines-yellow.svg' className='lines show-for-large' />
      </Section>

      {/* visible only on mobile */}
      <StickyLocationSelector
        className={showStickyLocationSelector ? 'show' : 'hide'}
        locations={locations}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        locationPicker={locationPicker}
        setLocationPicker={setLocationPicker}
      />
    </Layout>
  )
}

const Section = ({ color, children, className }) => (
  <section className={`home-section--${color} ${className}`}>
    <div className={`grid-container ${color}`}>
      <div className='grid-x'>{children}</div>
    </div>
  </section>
)

export default Tour
