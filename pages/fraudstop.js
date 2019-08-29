import React from 'react'
import Elm from 'react-elm-components'
import Layout from '../components/Layout'
import FraudStop from '../elm-src/FraudStop.elm'

export default () => (
  <Layout>
    <Elm src={FraudStop.Elm.FraudStop} />
  </Layout>
)
