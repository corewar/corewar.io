import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import styled from 'styled-components'
import store from './store'

import App from './features/app/app'
import Documentation from './features/documentation/documentation'
import FeedbackContainer from './features/feedback/feedbackContainer'
import Home from './features/onboarding/home'
import SignUpContainer from './features/signup/signupContainer'

import 'typeface-anonymous-pro'
import 'typeface-inter'
import 'typeface-lato'

import './cssreset.css'

import { colour, font } from './features/common/theme'

const Wrapper = styled.div`
  min-width: 360px;
  margin: 0;
  padding: 0;
  height: 100vh;
  font-family: ${font.default};
  font-size: ${font.base};
  background-color: ${colour.darkbg};
  width: 100%;
  overflow-x: hidden;
`

const target = document.querySelector('#root')
const root = createRoot(target)

root.render(
  <Provider store={store}>
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUpContainer />} />
          <Route path="/contact-us" element={<FeedbackContainer />} />
          <Route path="/learn/*" element={<Documentation />} />
          <Route path="/app/*" element={<App />} />
        </Routes>
      </Wrapper>
    </Router>
  </Provider>
)
