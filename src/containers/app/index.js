import logo from '../../logo.png';
import React from 'react'
import { Route, NavLink } from 'react-router-dom'

import SiteHeader from './siteHeader'

import Home from '../home'
import Parser from '../parser'
import Simulator from '../simulator'

const App = () => (
  <div>
    <SiteHeader isAuthenticated={false}/>
    {/* <aside id="sidebar">
      <nav>
        <NavLink to="/" exact={true} activeClassName="home-active" className="home">Home</NavLink>
        <NavLink to="/parser" activeClassName="parser-active" className="parser">Parser</NavLink>
        <NavLink to="/simulator" activeClassName="simulator-active" className="simulator">Simulator</NavLink>
      </nav>
    </aside> */}
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/parser" component={Parser} />
      <Route exact path="/simulator" component={Simulator} />
    </main>
  </div>
)

export default App;
