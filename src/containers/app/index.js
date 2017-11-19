import logo from '../../logo.png';
import React from 'react'
import { Route, NavLink } from 'react-router-dom'
import './App.css';
import Home from '../home'
import Parser from '../parser'

const App = () => (
  <div>
    <header>
      <span className="logo">
        <img src={logo} alt="logo" />
        <h1>corewar</h1>
      </span>
    </header>
    <aside id="sidebar">
      <nav>
        <NavLink to="/" exact={true} activeClassName="active">Home</NavLink>
        <NavLink to="/parser" activeClassName="active">Parser</NavLink>
      </nav>
    </aside>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/parser" component={Parser} />
    </main>
  </div>
)

export default App;
