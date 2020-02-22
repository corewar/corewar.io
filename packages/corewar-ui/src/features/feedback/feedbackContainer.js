import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { colour, space, font } from '../common/theme'
import { media } from '../common/mediaQuery'

import SiteNav from '../common/siteNav'
import HeroLogo from '../common/heroLogo'
import FeatureButton from '../common/featureButton'

import { sendFeedback } from './actions'

const Grid = styled.main`
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-rows: ${space.header} auto auto;
  grid-template-columns: 100%;
  color: ${colour.white};
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

  p {
    width: 30%;
    text-align: center;
    line-height: ${font.large};
    margin: ${space.m};
    padding: ${space.m};
  }

  ul {
    margin-bottom: ${space.xxl};

    li {
      margin: ${space.m};
      text-align: center;
    }

    li a {
      color: ${colour.blue};
    }
  }
`

const Form = styled.form`
  display: grid;
  grid-template-rows: 50px 90px 50px 200px 85px;
  grid-template-columns: 100%;
  margin: ${space.xl};
  margin-bottom: 0;
  width: 30%;
  ${media.tablet`width: 80%;`}

  label {
    color: ${colour.grey};
    margin: ${space.m} ${space.m} 0 ${space.m};
  }

  input[type='email'] {
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

  textarea {
    margin: ${space.m};
    padding: ${space.s};
    border: 1px solid ${colour.lightbg};
    border-radius: 2px;
    background: transparent;
    color: ${colour.white};

    :focus {
      outline: 1px solid ${colour.blue};
    }
  }
`

class FeedbackContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = { email: '', msg: '' }
  }

  emailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  msgChange(e) {
    this.setState({
      msg: e.target.value
    })
  }

  render() {
    const { sendFeedback, feedbackMessage } = this.props
    return (
      <Grid>
        <SiteNav />
        <HeroLogo />
        <Content>
          <h1>
            We'd love to hear your feedback, good or bad. Help us to improve the service for you.
          </h1>
          {feedbackMessage && <h2>{feedbackMessage}</h2>}
          <Form>
            <label htmlFor="email">Email Address (so we can thank you)</label>
            <input
              type="email"
              autoCapitalize="off"
              autoCorrect="off"
              id="email"
              size="25"
              value={this.state.email}
              onChange={e => this.emailChange(e)}
            />
            <label htmlFor="message">Your message</label>
            <textarea
              autoCapitalize="off"
              autoCorrect="off"
              id="message"
              rows={5}
              value={this.state.msg}
              onChange={e => this.msgChange(e)}
            ></textarea>
            <FeatureButton
              onClick={() => sendFeedback({ email: this.state.email, msg: this.state.msg })}
            >
              Send Feedback
            </FeatureButton>
          </Form>
          <p>
            As well as providing feedback through this form, you can join one of our Corewar.io
            communities to speak to us directly
          </p>
          <ul>
            <li>
              <a href="https://corewario.slack.com">https://corewario.slack.com</a>
            </li>
            <li>
              <a href="https://spectrum.chat/corewar">https://spectrum.chat/corewar</a>
            </li>
          </ul>
        </Content>
      </Grid>
    )
  }
}

const mapStateToProps = state => ({
  feedbackMessage: state.feedback.feedbackMessage
})

export default connect(mapStateToProps, {
  sendFeedback
})(FeedbackContainer)

export { FeedbackContainer as PureFeedbackContainer }
