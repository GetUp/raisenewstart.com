import React from 'react'
import Elm from 'react-elm-components'
import Layout from '../../components/Layout'
import Verify from '../../elm-src/FraudStopVerify.elm'

const query = process.browser && window.location.search

export default () => (
  <Layout>
    <Elm src={Verify.Elm.FraudStopVerify} flags={{ query }} />
  </Layout>
)
