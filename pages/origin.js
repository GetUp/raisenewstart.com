import React, { useState, useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout'
import content from '../content/origin.md'
import AutoSizingIframe from '../components/AutoSizingIframe'
import { useRouter } from 'next/router'

const Origin = () => {
  const c = content.attributes
  const query = useRouter().query.t
  const queryParams = query ? '?t=' + query : ''
  const embedLink =
    'https://www.getup.org.au/campaigns/aboriginal-and-torres-strait-islander/origin-agm-2019/rsvp' +
    queryParams
  const notInSydLink = c.notinsydney.link + queryParams

  return (
    <Layout>
      <section className={`origin-page`}>
        <div className={`grid-container pt-5`}>
          <div className='grid-x grid-padding-x'>
            <div className='cell small-12 medium-8 large-7'>
              <h1>
                <b>{c.heading}</b>
              </h1>
              <img src='/static/images/lines-yellow.svg' className='mb-3' />
            </div>
          </div>
          <div className='grid-x grid-padding-x mt-3'>
            <div className='cell small-12 medium-8 large-7'>
              <img src={c.image} className='mb-5 fracking-image' />
              <ReactMarkdown source={c.copy} />
            </div>
            <div className='cell small-12 medium-4 large-5'>
              <AutoSizingIframe src={embedLink} />
              <div>
                <a
                  href={notInSydLink}
                  target='_blank'
                  rel='noopener'
                  className='not-in-sydney'>
                  <ReactMarkdown source={c.notinsydney.text} className='mt-3' />
                </a>
              </div>
            </div>
            <div className='cell small-12 medium-10 large-7' />
          </div>
        </div>
      </section>
    </Layout>
  )
}

export default Origin
