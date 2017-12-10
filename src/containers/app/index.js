import React from 'react'
import { Route } from 'react-router-dom'

import SiteHeader from './siteHeader'
import Sidebar from './sidebar'
import DebugInterface from './debugInterface'

import './app.css'

const App = () => (
  <div className="grid-container">
    <SiteHeader isAuthenticated={false}/>
    <Sidebar />
    <main>
      <Route exact path="/" component={DebugInterface} />
      <Route exact path="/parser" component={DebugInterface} />
    </main>
  </div>
)

export default App;
