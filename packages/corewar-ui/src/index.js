import React from 'react'
import registerServiceWorker from './registerServiceWorker'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { Route } from 'react-router-dom'
import store, { history } from './store'

import App from './features/app/app'
import Home from './features/onboarding/home'
import SignUpContainer from './features/signup/signupContainer'
import FeedbackContainer from './features/feedback/feedbackContainer'
import Documentation from './features/documentation/documentation'

import 'typeface-inter'
import 'typeface-anonymous-pro'
import './styles/tailwind.css'

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <div className="m-0 p-0 h-screen w-full text-base bg-darkbg overflow-x-hidden font-body">
        <Route exact path="/" component={Home} />
        <Route exact path="/sign-up" component={SignUpContainer} />
        <Route exact path="/contact-us" component={FeedbackContainer} />
        <Route path="/learn" component={Documentation} />
        <Route path="/app" component={App} />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
)

registerServiceWorker()
