import React from 'react'
import Elm from 'react-elm-components'
import Layout from '../../components/Layout'
import Verify from '../../elm-src/FraudStopVerify.elm'

export default () => (
  <Layout>
    <Elm src={Verify.Elm.FraudStopVerify} />
  </Layout>
)
