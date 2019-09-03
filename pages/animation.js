import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout'
import content from '../content/about.md'
import AutoSizingIframe from '../components/AutoSizingIframe'
import { TweenMax, TimelineMax } from 'gsap'
import { SSL_OP_NO_TLSv1_1 } from 'constants'

const Animation = () => {
  const c = content.attributes
  useEffect(() => {
    TweenMax.set('#new', {
      scale: 0,
      opacity: 0,
      transformOrigin: '50% 50%'
    })
    TweenMax.set('#centrelink', {
      opacity: 0,
      scale: 0.8,
      transformOrigin: '50% 50%'
    })

    const animateCentrelink = () => {
      const tl = new TimelineMax()
      tl.add('begin')
      tl.to('#centrelink', 0.4, { opacity: 1, scale: 1, ease: Circ.easeOut })
      tl.to('#centrelink', 6, { rotation: 90, ease: Circ.easeIn }, 'begin')
        .to('#centrelink', 3, { rotation: 360, ease: Circ.easeInOut }, 'begin+=2')
        .to(
          '#centrelink',
          0.5,
          { scale: 1.5, opacity: 0, ease: Circ.easeInOut },
          'begin+=3'
        )
      return tl
    }

    const animateHeart = () => {
      const tl = new TimelineMax()
      tl.add('begin')
      tl.to('#new', 0.8, { scale: 1, opacity: 1, ease: Circ.easeInOut })
      tl.staggerFrom(
        ['#circle-1', '#circle-2', '#circle-3', '#circle-4'],
        1,
        {
          x: -200,
          y: 100,
          opacity: 1,
          ease: Circ.easeOut
        },
        0.2,
        'begin+=0.1'
      )
      tl.staggerFrom(
        ['#right', '#left'],
        1,
        {
          x: 50,
          y: 50,
          opacity: 1,
          ease: Circ.easeOut
        },
        0.2,
        'begin-=0.1'
      )
      tl.to('#new', 0.4, { scale: 1.5, opacity: 0, ease: Circ.easeInOut }, '+=7')
      return tl
    }

    const master = new TimelineMax({ repeat: -1 })
    master.timeScale(1.3)
    master.add(animateCentrelink())
    master.add(animateHeart(), '-=3')
  }, [])
  return (
    <Layout>
      <div
        style={{
          height: '100vh',
          display: 'flex',
          marginTop: '100px',
          justifyContent: 'center'
        }}>
        <Logo />
      </div>
    </Layout>
  )
}

const Logo = () => {
  return (
    <>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='411.8'
        height='405.63'
        viewBox='0 -70 400 600'
        className='animated-logo'>
        <title>raise-newstart-v2</title>
        <g id='centrelink'>
          <path
            d='M202.26,172.29a14.58,14.58,0,0,1-14-18.72l28.9-97.16a14.56,14.56,0,1,1,27.91,8.3l-28.9,97.16A14.56,14.56,0,0,1,202.26,172.29Z'
            transform='translate(-43.74 -46)'
            fill='#85c326'
          />
          <path
            d='M283.8,142.13a14.55,14.55,0,0,1-14.09-10.92L253.25,67.55a14.56,14.56,0,1,1,28.2-7.28l16.45,63.65a14.56,14.56,0,0,1-10.45,17.75A14.84,14.84,0,0,1,283.8,142.13Z'
            transform='translate(-43.74 -46)'
            fill='#c3d900'
          />
          <path
            d='M293.14,175.64a14.56,14.56,0,0,1-5.73-27.95l90-38.53a14.56,14.56,0,1,1,11.46,26.77l-90,38.53A14.52,14.52,0,0,1,293.14,175.64Z'
            transform='translate(-43.74 -46)'
            fill='#f0e400'
          />
          <path
            d='M373.53,217.94a14.57,14.57,0,0,1-12.22-22.46l33.51-51.93a14.56,14.56,0,1,1,24.47,15.79l-33.51,51.93A14.55,14.55,0,0,1,373.53,217.94Z'
            transform='translate(-43.74 -46)'
            fill='#f0e400'
          />
          <path
            d='M441,296.67A14.5,14.5,0,0,1,434,294.9l-88.54-48.16a14.56,14.56,0,1,1,13.91-25.58l88.54,48.16a14.56,14.56,0,0,1-7,27.35Z'
            transform='translate(-43.74 -46)'
            fill='#c3d900'
          />
          <path
            d='M368.1,336a14.56,14.56,0,0,1-.93-29.09l64.06-4.19a14.56,14.56,0,0,1,1.9,29.06L369.06,336Z'
            transform='translate(-43.74 -46)'
            fill='#85c326'
          />
          <path
            d='M348.13,433.62a14.56,14.56,0,0,1-14.32-12.05l-16.48-94a14.56,14.56,0,0,1,28.68-5l16.48,94a14.57,14.57,0,0,1-14.36,17.08Z'
            transform='translate(-43.74 -46)'
            fill='#3fb23c'
          />
          <path
            d='M313,451.63a14.55,14.55,0,0,1-11.08-5.11l-40.4-47.31a14.56,14.56,0,1,1,22.15-18.91l40.4,47.31a14.57,14.57,0,0,1-11.07,24Z'
            transform='translate(-43.74 -46)'
            fill='#1f7732'
          />
          <path
            d='M184.62,448.7a14.57,14.57,0,0,1-10.94-24.17l62.44-71.19A14.56,14.56,0,1,1,258,372.54l-62.44,71.2A14.53,14.53,0,0,1,184.62,448.7Z'
            transform='translate(-43.74 -46)'
            fill='#21c6f9'
          />
          <path
            d='M148.25,429.85a14.54,14.54,0,0,1-14.38-17l10-59.4a14.56,14.56,0,0,1,28.72,4.86l-10,59.4A14.56,14.56,0,0,1,148.25,429.85Z'
            transform='translate(-43.74 -46)'
            fill='#0093b5'
          />
          <path
            d='M159.12,336h-.37l-90.47-2.28a14.56,14.56,0,0,1,.37-29.11H69l90.47,2.28a14.56,14.56,0,0,1-.37,29.12Z'
            transform='translate(-43.74 -46)'
            fill='#21c6f9'
          />
          <path
            d='M59,293.32A14.56,14.56,0,0,1,52,266l52.77-28.9a14.56,14.56,0,0,1,14,25.54L66,291.53A14.56,14.56,0,0,1,59,293.32Z'
            transform='translate(-43.74 -46)'
            fill='#0093b5'
          />
          <path
            d='M143.63,246a14.54,14.54,0,0,1-12-6.27l-54-77.9a14.56,14.56,0,0,1,23.93-16.59l54,77.9a14.57,14.57,0,0,1-12,22.86Z'
            transform='translate(-43.74 -46)'
            fill='#21c6f9'
          />
          <path
            d='M168.74,159.31a14.6,14.6,0,0,1-5.67-1.16l-57.38-24.32A14.56,14.56,0,0,1,117.06,107l57.37,24.31a14.57,14.57,0,0,1-5.69,28Z'
            transform='translate(-43.74 -46)'
            fill='#3fb23c'
          />
        </g>
        <g id='new'>
          <path
            d='M419.86,109.58a121.2,121.2,0,0,1,16.06,19.86,118.67,118.67,0,0,1,13.54,28.68A120.56,120.56,0,0,1,419.86,280L249.45,109.58A120.49,120.49,0,0,1,419.86,109.58Z'
            transform='translate(-43.74 -46)'
            fill='#f0e400'
            id='circle-1'
          />
          <path
            d='M435.92,129.44a118.67,118.67,0,0,1,13.54,28.68A120.56,120.56,0,0,1,419.86,280L285.37,145.5A120.53,120.53,0,0,1,435.92,129.44Z'
            transform='translate(-43.74 -46)'
            fill='#c3d900'
            id='circle-2'
          />
          <path
            d='M449.46,158.12A120.56,120.56,0,0,1,419.86,280l-92.28-92.27A120.47,120.47,0,0,1,449.46,158.12Z'
            transform='translate(-43.74 -46)'
            fill='#21c6f9'
            id='circle-3'
          />
          <path
            d='M455.16,194.84A120.11,120.11,0,0,1,419.86,280L370,230.14A120.18,120.18,0,0,1,455.16,194.84Z'
            transform='translate(-43.74 -46)'
            fill='#0093b5'
            id='circle-4'
          />
          <path
            d='M250.16,110.29l-.95-.46a127.65,127.65,0,0,0-144.82,25.1L79,109.58a120.49,120.49,0,0,1,170.42,0C249.68,109.8,249.94,110.06,250.16,110.29Z'
            transform='translate(-43.74 -46)'
            fill='#c3d900'
          />

          <path
            d='M250.16,110.29,419.86,280l-85.2,85.21L104.39,134.93a127.63,127.63,0,0,1,144.81-25.1l.93.44S250.15,110.28,250.16,110.29Z'
            transform='translate(-43.74 -46)'
            fill='#c3d900'
          />
          <path
            d='M250.16,110.29,419.86,280l-85.2,85.21L104.39,134.93a127.63,127.63,0,0,1,144.81-25.1l.93.44S250.15,110.28,250.16,110.29Z'
            transform='translate(-43.74 -46)'
            fill='#85c326'
            id='right'
          />

          <path
            d='M79,280l.25-.25.47,1Z'
            transform='translate(-43.74 -46)'
            fill='#1f7732'
          />
          <path
            d='M79,109.57l25.36,25.36a127.63,127.63,0,0,0-25.1,144.81c.15.32.3.63.46.95A120.5,120.5,0,0,1,79,109.57Z'
            transform='translate(-43.74 -46)'
            fill='#3fb23c'
          />
          <path
            d='M104.39,134.93,334.66,365.2l-85.21,85.21L79.76,280.72a0,0,0,0,0,0,0c-.16-.32-.31-.63-.46-.95a127.63,127.63,0,0,1,25.1-144.81Z'
            transform='translate(-43.74 -46)'
            fill='#3fb23c'
          />
          <path
            d='M104.39,134.93,334.66,365.2l-85.21,85.21L79.76,280.72a0,0,0,0,0,0,0c-.16-.32-.31-.63-.46-.95a127.63,127.63,0,0,1,25.1-144.81Z'
            transform='translate(-43.74 -46)'
            fill='#1f7732'
            id='left'
          />
        </g>
      </svg>
    </>
  )
}

const Section = ({ color, children, className }) => (
  <section className={`home-section--${color} ${className}`}>
    <div className={`grid-container ${color}`}>
      <div className='grid-x'>{children}</div>
    </div>
  </section>
)

export default Animation
