import React from 'react'
import Elm from 'react-elm-components'
import Layout from '../components/Layout'
import FraudStop from '../elm-src/FraudStop.elm'

const host = process.env.apiHost

export default () => (
  <Layout title='Fraudstop | Raise Newstart'>
    <Elm src={FraudStop.Elm.FraudStop} flags={{ host }} />
  </Layout>
)
