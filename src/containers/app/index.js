import React from 'react'
import { Route } from 'react-router-dom'

import SiteHeader from './../../components/app/siteHeader'
import DebugInterface from './../../components/app/debugInterface'

import './app.css'

const App = () => (
  <div className="grid-container">
    <SiteHeader isAuthenticated={false}/>
    <main>
      <Route exact path="/" component={DebugInterface} />
      <Route exact path="/parser" component={DebugInterface} />
    </main>
  </div>
)

export default App
