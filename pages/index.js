import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import Form from './form.js'
import Accordion from '../components/Accordion'

const About = () => {
  useEffect(() => {
    // console.log(values)
    // console.log(errors)
  })
  return (
    <Layout>
      <div className='header-container'>
        <div className='grid-container'>
          <div className='grid-x grid-padding-x align-center'>
            <div className='cell small-12 medium-10 large-8 pad-x'>
              <h1 className='headline mb-3'>
                <strong>Fight back against Centrelink debt claims</strong>
              </h1>
              <h2 className='h5 mb-4'>
                FraudStop makes it quick and easy to appeal an automated debt claim
                against you. All you need to do is enter a few details, explain why you
                want to appeal the debt claim against you, and hit send - FraudStop does
                the rest.
              </h2>
              <Accordion header='How does it work?' className='header-accordion'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis non
                  aspernatur adipisci deleniti, explicabo laboriosam magnam laudantium
                  quaerat vitae voluptatum ad dolores laborum praesentium, cum
                  exercitationem sapiente ducimus! Esse, odio.
                </p>
              </Accordion>
              <Accordion
                header='Why did we build Fraudstop?'
                className='header-accordion'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis non
                  aspernatur adipisci deleniti, explicabo laboriosam magnam laudantium
                  quaerat vitae voluptatum ad dolores laborum praesentium, cum
                  exercitationem sapiente ducimus! Esse, odio.
                </p>
              </Accordion>
              <Accordion
                header='Some very important legal information.'
                className='header-accordion'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis non
                  aspernatur adipisci deleniti, explicabo laboriosam magnam laudantium
                  quaerat vitae voluptatum ad dolores laborum praesentium, cum
                  exercitationem sapiente ducimus! Esse, odio.
                </p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
      <div className='grid-container'>
        <div className='grid-x grid-padding-x'>
          <div className='cell small-12 medium-offset-1 medium-7 large-offset-2 large-6 pad-x mt-5 mb-5'>
            <Form />
          </div>
        </div>
      </div>
      <br />
      <br />
    </Layout>
  )
}

export default About
