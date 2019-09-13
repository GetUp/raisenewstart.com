import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import Form from './form.js'
import Nav from '../components/Nav'

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
    <PageGrid className='small-12 large-8'>
      <p className='hero-blurb mt-5 mb-0'>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores, iusto. Illo,
        voluptatum natus. Nemo animi exercitationem ad distinctio. Omnis et officia
        possimus quam minus expedita reiciendis dignissimos laborum officiis adipisci?
      </p>
    </PageGrid>
  </>
)

const IncomeCalculator = () => {
  const [userIncome, setUserIncome] = useState(52000)
  const [income, setIncome] = useState(52000)
  const [maxIncome, setMaxIncome] = useState(52000)

  const calculateWidth = wagePerWeek => {
    return ((wagePerWeek * 52) / maxIncome) * 100 + '%'
  }

  const handleBlur = () => {
    const _maxIncome = userIncome < 720 * 52 ? 720 * 52 : userIncome
    setIncome(userIncome)
    setMaxIncome(_maxIncome)
  }

  return (
    <PageGrid className='small-12 my-5'>
      <label for='annual-income' className='annual-income-label'>
        Enter your annual income to compare
      </label>{' '}
      <div className='annual-income-input--container'>
        <input
          id='annual-income'
          type='number'
          className='annual-income-input'
          placeholder='Your salary'
          value={userIncome}
          onChange={e => setUserIncome(e.target.value)}
          onBlur={() => handleBlur()}
        />
      </div>
      <div className='barchart-container'>
        <div className='bar green' style={{ width: calculateWidth(income / 52) }}>
          <div>
            Your income
            <span>${parseInt(income / 52)}/week</span>
          </div>
        </div>
        <div className='bar' style={{ width: calculateWidth(720) }}>
          <div>
            Minimum wage<sup>1</sup>
            <span>$720/week</span>
          </div>
        </div>
        <div className='bar' style={{ width: calculateWidth(450) }}>
          <div>
            Rate of pension<sup>2</sup>
            <span>$450/week</span>
          </div>
        </div>
        <div className='bar' style={{ width: calculateWidth(430) }}>
          <div>
            Cost of basic essentials<sup>3</sup>
            <span>$430/week</span>
          </div>
        </div>
        <div
          className='bar orange'
          style={{ width: ((278 * 52) / maxIncome) * 100 + '%' }}>
          <div>
            Newstart
            <span>$278/week</span>
          </div>
        </div>
      </div>
    </PageGrid>
  )
}

const Testimonials = ({ data }) => (
  <>
    <WavePattern colour='orange' />
    {data.map((item, index) => (
      <div
        className={`background testimonials py-0 ${
          index % 2 === 0 ? 'background-orange' : 'background-green'
        }`}>
        <div className='grid-container'>
          <div
            className={`grid-x align-middle ${index % 2 === 1 &&
              'flex-dir-row-reverse'}`}>
            <div className='small-8 large-8 columns'>
              <p>{item.quote}</p>
              <small>{item.name}</small>
            </div>
            <div className='small-4 large-4 columns'>
              <img src={item.image} className='pt-5' />
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
)

const Stats = () => (
  <>
    <div className='background background-gray-900 pb-0'>
      <div className='grid-container'>
        <div className='grid-x align-bottom text-647k-container'>
          <div className='small-8 columns'>
            <svg
              className='text-647k'
              viewBox='0 0 200 65'
              xmlns='http://www.w3.org/2000/svg'>
              <text
                transform='translate(0, 61)'
                fontSize='78'
                fontFamily='Inter'
                fill='white'>
                647k
              </text>
            </svg>
          </div>
          <div className='small-4 columns'>
            <svg
              className='text-647k'
              viewBox='0 0 200 65'
              xmlns='http://www.w3.org/2000/svg'>
              <text
                transform='translate(0, 56)'
                fontSize='55'
                fontFamily='Inter'
                fill='white'>
                people.
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
    <div className='background stats background-gray-800'>
      <div className='grid-container'>
        <div className={`grid-x align-bottom text-647k-container`}>
          <div className='small-12 medium-8 columns'>
            <h2 className='newstart-header'>Who is on Newstart?</h2>
          </div>
          <div className='small-12 medium-4 columns'>
            <p className='newstart-paragraph'>
              647,000 people receive the single rate of Newstart and Youth Allowance.
            </p>
          </div>
        </div>
      </div>
      <PageGrid className='small-12 large-12'>
        <WavePattern colour='orange' />

        <div className='stats-container'>
          <div className='stats-item'>
            <p className='stats-number'>
              3<sup>m</sup>
            </p>
            <hr />
            <p className='stats-blurb'>
              3 million people live in poverty in Australia, of whom 731,000 are children.
            </p>
          </div>
          <div className='stats-item'>
            <p className='stats-number'>
              3<sup>m</sup>
            </p>
            <hr />
            <p className='stats-blurb'>
              3 million people live in poverty in Australia, of whom 731,000 are children.
            </p>
          </div>
          <div className='stats-item'>
            <p className='stats-number'>55%</p>
            <hr />
            <p className='stats-blurb'>
              3 million people live in poverty in Australia, of whom 731,000 are children.
            </p>
          </div>

          <WavePattern colour='black' />

          <div className='stats-item'>
            <p className='stats-number'>
              3<sup>m</sup>
            </p>
            <hr />
            <p className='stats-blurb'>
              3 million people live in poverty in Australia, of whom 731,000 are children.
            </p>
          </div>
          <div className='stats-item'>
            <p className='stats-number'>
              3<sup>m</sup>
            </p>
            <hr />
            <p className='stats-blurb'>
              3 million people live in poverty in Australia, of whom 731,000 are children.
            </p>
          </div>
          <div className='stats-item'>
            <p className='stats-number'>
              3<sup>m</sup>
            </p>
            <hr />
            <p className='stats-blurb'>
              3 million people live in poverty in Australia, of whom 731,000 are children.
            </p>
          </div>
        </div>
      </PageGrid>
    </div>
  </>
)

const FooterCTA = () => (
  <>
    <div
      className='heart-background'
      style={{ backgroundImage: `url(/static/images/heart-pattern.svg)` }}>
      <div className='grid-container footer'>
        <div className='grid-x'>
          <div className='small-12 columns'>
            <h2 className='footer-blurb h5'>
              In a country as wealthy as Australia – being locked out of paid work,
              shouldn’t mean being locked into poverty.
            </h2>
            <h3 className='footer-heading h1'>Raise Newstart.</h3>
            <a href='#' className='btn'>
              Join the campaign
            </a>
          </div>
        </div>
      </div>
    </div>
  </>
)

const Index = () => {
  const testimonials = [
    {
      name: 'Patrick Stewart',
      quote:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam atque fugiat fuga, corporis cupiditate, aliquid animi consequatur nemo iure, deleniti reiciendis vel voluptatem officia vitae sed explicabo totam autem recusandae.',
      image: '/static/images/patrick.png'
    },
    {
      name: 'Patrick Stewart',
      quote:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam atque fugiat fuga, corporis cupiditate, aliquid animi consequatur nemo iure, deleniti reiciendis vel voluptatem officia vitae sed explicabo totam autem recusandae.',
      image: '/static/images/patrick.png'
    }
  ]
  return (
    <>
      <Nav/>
      <Hero />
      <IncomeCalculator />
      <Testimonials data={testimonials} />
      <Stats />
      <FooterCTA />
    </>
  )
}

export default Index
