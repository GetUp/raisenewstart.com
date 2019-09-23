import React from 'react'

const RecruitForm = props => (
  <div className='modal-v2-container'>
    <div className='modal-v2'>
      <div className='modal-v2-text-wrapper'>
        <h1 className='h2 modal-v2-heading'>{props.heading}</h1>
        <p className='modal-v2-blurb'>
          Will you stand with people locked out of work and sign the petition for an
          immediate raise to Newstart?
          {/* <br /> */}
          {/* <span style={{ display: 'block', fontWeight: 'bold', marginTop: '8px' }}>
            Sign up to receive updates on how you can have a huge impact as a GetUp
            volunteer.
          </span> */}
        </p>
        <form onSubmit={e => props.handleSubmit(e)}>
          <div className='names'>
            <label className='first-name'>
              First Name*
              <input
                type='text'
                required
                name='firstName'
                onChange={props.handleInputChange}
              />
            </label>
            <label className='last-name'>
              Last Name*
              <input
                type='text'
                required
                name='lastName'
                onChange={props.handleInputChange}
              />
            </label>
          </div>
          <label className='email'>
            Email Address*
            <input
              type='email'
              required
              name='email'
              onChange={props.handleInputChange}
              onBlur={props.handleBlur}
              className={props.emailValid ? '' : 'validation-error'}
            />
            {!props.emailValid && (
              <span
                className='validation-error-cross'
                role='img'
                aria-label='cross symbol'>
                ❌
              </span>
            )}
          </label>
          <div className='phone-post-code'>
            <label className='phone'>
              Phone*
              <input
                type='text'
                required
                name='phone'
                onChange={props.handleInputChange}
              />
            </label>
            <label className='post-code'>
              Post code
              <input type='text' name='postCode' onChange={props.handleInputChange} />
            </label>
          </div>
          <div className='legal-text'>
            In taking action, I agree to GetUp's Privacy Policy.
          </div>
          {!props.emailValid ? (
            <button
              type='submit'
              disabled
              className='btn btn-large btn-secondary ml-0 mt-3'>
              {props.button}
            </button>
          ) : (
            <button type='submit' className='btn btn-large btn-secondary ml-0 mt-3'>
              {props.button}
            </button>
          )}
        </form>
      </div>
      {/* <div className='modal-v2-image-wrapper'>
        <img src={Rally} alt='' className='modal-v2-image' />
      </div> */}
    </div>
  </div>
)

export default RecruitForm
