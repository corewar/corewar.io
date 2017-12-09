import logo from '../../logo.png'
import React from 'react'
import { Route, NavLink } from 'react-router-dom'

import SiteHeader from './siteHeader'
import Sidebar from './sidebar'
import './app.css'

import Home from '../home'
import Parser from '../parser'
import Simulator from '../simulator'

const App = () => (
  <div className="grid-container">
    <SiteHeader isAuthenticated={false}/>
    <Sidebar />
      {/* <nav>
        <NavLink to="/" exact={true} activeClassName="home-active" className="home">Home</NavLink>
        <NavLink to="/parser" activeClassName="parser-active" className="parser">Parser</NavLink>
        <NavLink to="/simulator" activeClassName="simulator-active" className="simulator">Simulator</NavLink>
      </nav> */}
    <main>
      <Route exact path="/" component={Parser} />
      <Route exact path="/parser" component={Parser} />
      <Route exact path="/simulator" component={Simulator} />
    </main>
  </div>
)

export default App;
