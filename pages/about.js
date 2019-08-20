import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout'
import content from '../content/about.md'
import AutoSizingIframe from '../components/AutoSizingIframe'

const About = () => {
  const c = content.attributes
  return (
    <Layout>
      <div className={`about-page`}>
        <Section color='red' className='pt-4'>
          <div className='cell small-12 medium-8 large-8 pt-5'>
            <img src='/static/images/logomark.svg' className='logomark mb-4' />
            <img src='/static/images/logo.svg' className='logo mb-2' />
            <img src='/static/images/lines-yellow.svg' className='mb-5' />
            <ReactMarkdown source={c.body} />
          </div>
        </Section>
        <Section color='blue'>
          <div className='cell small-12 medium-8 large-8 mt-5'>
            <h2 className='p bold mb-4'>{c.alliance.heading}</h2>
            <ReactMarkdown source={c.alliance.body} />
          </div>
        </Section>
      </div>
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

export default About
