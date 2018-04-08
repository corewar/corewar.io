import React from 'react'
import registerServiceWorker from './registerServiceWorker'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'
import styled from 'styled-components'
import store, { history } from './store'

import App from './features/app/app'
import Home from './features/onboarding/home'
import SignUpContainer from './features/signup/signupContainer'
import Documentation from './features/documentation/documentation'

import 'typeface-lato'
import 'typeface-anonymous-pro'

import './cssreset.css'

import { font, colour } from './features/common/theme'

const Wrapper = styled.div`
  min-width: 360px;
  margin: 0;
  padding: 0;
  height: 100vh;
  font-family: ${font.default};
  font-size: ${font.base};
  background-color: ${colour.darkbg};
`

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Wrapper>
        <Route exact path='/' component={Home} />
        <Route exact path='/sign-up' component={SignUpContainer} />
        <Route path='/learn' component={Documentation} />
        <Route path='/app' component={App} />
      </Wrapper>
    </ConnectedRouter>
  </Provider>,
  target
)

registerServiceWorker();
