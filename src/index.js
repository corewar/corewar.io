import React from 'react'
import registerServiceWorker from './registerServiceWorker'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import store, { history } from './store'
import App from './containers/app'
import styled from 'styled-components'

import 'typeface-lato'
import 'typeface-anonymous-pro'

import './cssreset.css'

import { font, colour } from './styles/theme'

const Wrapper = styled.div`
  min-width: 360px;
  overflow-x: hidden;
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
        <App />
      </Wrapper>
    </ConnectedRouter>
  </Provider>,
  target
)

registerServiceWorker();
