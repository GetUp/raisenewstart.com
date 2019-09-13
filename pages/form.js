import React, { useState, useEffect, useRef } from 'react'
import Layout from '../components/Layout'
import Accordion from '../components/Accordion'

// const state = [
//   {
//     id: 'first-name-input',
//     label: 'First Name',
//     type: 'text',
//     value: '',
//     isValidInput: true,
//     errorLabel: ''
//   },
//   {
//     id: 'last-name-input',
//     label: 'Last Name',
//     type: 'text',
//     value: '',
//     isValidInput: false,
//     errorLabel: "Your name doesn't look right :("
//   }
// ]
const state = {
  firstname: '',
  lastname: ''
}

const useForm = (initialState, validate) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setSubmitting] = useState(false)

  useEffect(
    () => {
      if (isSubmitting) {
        const noErrors = Object.keys(errors).length === 0
        if (noErrors) {
          console.log('Authenticated! ', values)
          setSubmitting(false)
        } else {
          setSubmitting(false)
        }
      }
    },
    [errors]
  )

  const handleChange = e => {
    setErrors({
      ...errors,
      [e.target.name]: ''
    })
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleBlur = e => {
    const validationErrors = { ...validate(values, e.target.name, errors) }
    setErrors(validationErrors)
  }

  const handleSubmit = e => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setSubmitting(true)
  }

  return { handleSubmit, handleBlur, handleChange, values, errors }
}

const validate = (values, field, err) => {
  let errors = err
  const {
    firstname,
    lastname,
    email,
    address,
    suburb,
    postcode,
    dob,
    phone,
    centrelinkRefNum
  } = values

  switch (field) {
    case 'firstname':
      if (!firstname) errors.firstname = 'Required'
      break
    case 'lastname':
      if (!lastname) errors.lastname = 'Required'
      break
    case 'email':
      if (!email) errors.email = 'Required'
      break
    case 'address':
      if (!address) errors.address = 'Required'
      break
    case 'suburb':
      if (!suburb) errors.suburb = 'Required'
      break
    case 'postcode':
      if (!postcode) {
        errors.postcode = 'Required'
        break
      } else if (isNaN(postcode)) {
        errors.postcode = "It doesn't look like a number"
        break
      }
      break
    case 'dob':
      if (!dob) errors.dob = 'Required'
      break
    case 'phone':
      if (!phone) {
        errors.phone = 'Required'
        break
      } else if (isNaN(phone)) {
        errors.phone = "It doesn't look like a number"
        break
      } else if (phone.length < 10 || phone.length > 16) {
        errors.phone = "It doesn't look right"
        break
      }
      break
    case 'centrelinkRefNum':
      if (!centrelinkRefNum) errors.centrelinkRefNum = 'Required'
      break
    default:
      break
    // errors = {}
  }

  return errors
}

const RenderForm = ({ values, errors, handleSubmit, handleBlur, handleChange }) => {
  return (
    <form onSubmit={handleSubmit} className='form-container'>
      <div className='mb-3 form-item'>
        <InputField
          type='text'
          name='firstname'
          placeholder='First Name'
          label='First Name'
          value={values.firstname}
          errors={errors.firstname}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />

        <InputField
          type='text'
          name='lastname'
          placeholder='Last Name'
          label='Last Name'
          value={values.lastname}
          errors={errors.lastname}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />

        <InputField
          type='email'
          name='email'
          placeholder='Email'
          label='Email'
          value={values.email}
          errors={errors.email}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />

        <InputField
          type='text'
          name='address'
          placeholder='Address'
          label='Address'
          value={values.address}
          errors={errors.address}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <div className='two-column'>
          <InputField
            type='text'
            name='suburb'
            placeholder='Suburb'
            label='Suburb'
            value={values.suburb}
            errors={errors.suburb}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />

          <InputField
            type='text'
            name='postcode'
            placeholder='Post Code'
            label='Post Code'
            value={values.postcode}
            errors={errors.postcode}
            handleBlur={handleBlur}
            handleChange={handleChange}
          />
        </div>

        <InputField
          type='text'
          name='dob'
          placeholder='Date of Birth'
          label='Date of Birth'
          value={values.dob}
          errors={errors.dob}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />

        <InputField
          type='text'
          name='phone'
          placeholder='Phone'
          label='Phone'
          value={values.phone}
          errors={errors.phone}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />

        <InputField
          type='text'
          name='centrelinkRefNum'
          placeholder='Centrelink Reference Number (CRN)'
          label='Centrelink Reference Number (CRN)'
          value={values.centrelinkRefNum}
          errors={errors.centrelinkRefNum}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />

        <button type='submit' className='btn btn-primary btn-large mt-2'>
          Next
        </button>
      </div>
    </form>
  )
}

const Form = () => {
  const {
    handleSubmit,
    handleBlur,
    handleChange,
    values,
    errors,
    isSubmitting
  } = useForm(state, validate)

  useEffect(() => {
    // console.log(values)
    // console.log(errors)
  })
  return (
    <>
      {/* <div className='grid-container mt-4'>
        <div className='grid-x grid-padding-x align-center'>
          <div className='cell small-12 medium-8 pad-x'> */}
      <h2>
        <strong>Your details</strong>
      </h2>

      <RenderForm
        values={values}
        errors={errors}
        handleBlur={handleBlur}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      {/* </div>
        </div>
      </div> */}
    </>
  )
}

const FormWrapper = () => (
  <>
    <div className='header-container'>
      <div className='grid-container'>
        <div className='grid-x grid-padding-x align-center'>
          <div className='cell small-12 medium-10 large-8 pad-x'>
            <h1 className='headline mb-3'>
              <strong>Fight back against Centrelink debt claims</strong>
            </h1>
            <h2 className='h5 mb-4'>
              FraudStop makes it quick and easy to appeal an automated debt claim against
              you. All you need to do is enter a few details, explain why you want to
              appeal the debt claim against you, and hit send - FraudStop does the rest.
            </h2>
            <Accordion header='How does it work?' className='header-accordion'>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis non
                aspernatur adipisci deleniti, explicabo laboriosam magnam laudantium
                quaerat vitae voluptatum ad dolores laborum praesentium, cum
                exercitationem sapiente ducimus! Esse, odio.
              </p>
            </Accordion>
            <Accordion header='Why did we build Fraudstop?' className='header-accordion'>
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
  </>
)

const InputField = ({
  type,
  name,
  placeholder,
  label,
  value,
  errors,
  handleBlur,
  handleChange
}) => (
  <>
    <div className='mb-3 form-item'>
      <label className='mb-1' htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        className={errors ? ' has-error' : ''}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors && <small>{errors}</small>}
    </div>
  </>
)

export default FormWrapper
