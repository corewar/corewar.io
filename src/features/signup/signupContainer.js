import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colour, space, font } from '../common/theme'
import { media } from '../common/mediaQuery'

import SiteNav from '../common/siteNav'
import HeroLogo from '../common/heroLogo'
import FeatureButton from '../common/featureButton'


import {
  subscribe
} from './actions'

const SignUpGrid = styled.main`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: ${space.header} auto auto;
  grid-template-columns: 100%;
  color: ${colour.white};
  colour: ${colour.white};
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: ${space.xl};
  padding-top: ${space.l};

  h1 {
    font-size: ${font.large};
    width: 50%;
    ${media.tablet`width: 80%;`}
    text-align: center;
    color: ${colour.blue};
    font-family: ${font.code};
  }

  h2 {
    margin: ${space.m};
    padding: ${space.m};
    color: ${colour.coral};
    background-color: ${colour.lightbg};
  }
`

const Form = styled.form`
  display: grid;
  grid-template-rows: repeat(3, 0.5fr 1fr);
  grid-template-columns: 100%;
  margin: ${space.xl};
  width: 30%;
  ${media.tablet`width: 80%;`}

  label {
    color: ${colour.grey};
    margin: ${space.m} ${space.m} 0 ${space.m};
  }

  input {
    margin: ${space.m};
    padding: ${space.s};
    border: 1px solid ${colour.lightbg};
    border-radius: 2px;
    background: transparent;
    color: ${colour.white};
    font-size: ${font.large};

    :focus {
      outline: 1px solid ${colour.blue};
    }
  }
`

class SignUpContainer extends React.Component {

  constructor(props) {
    super(props)
    this.state = { email: '' }
  }

  emailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  render() {
    const { subscribe, signupMessage } = this.props
    return <SignUpGrid>
      <SiteNav />
      <HeroLogo />
      <Content>
        <h1>Sign up to register your interest in corewar.io and receive early notification of features and releases</h1>
        {signupMessage && <h2>{signupMessage}</h2>}
        <Form>
          <label htmlFor='email'>Email Address</label>
          <input
            type="email"
            autoCapitalize="off"
            autoCorrect="off"
            id="email"
            size="25"
            value={this.state.email}
            onChange={(e) => this.emailChange(e)} />
          <FeatureButton onClick={() => subscribe(this.state.email)}>Sign up</FeatureButton>
        </Form>
      </Content>
    </SignUpGrid>
  }
}

const mapStateToProps = state => ({
  signupMessage: state.signup.signupMessage
})

export default connect(
  mapStateToProps,
  {
    subscribe
  }
)(SignUpContainer)

export { SignUpContainer as PureSignUpContainer }