import logo from '../../logo.png';
import React from 'react'
import { Route, Link } from 'react-router-dom'
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
        <Link to="/">Home</Link>
        <Link to="/parser">Parser</Link>
      </nav>
    </aside>
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/parser" component={Parser} />
    </main>
  </div>
)

export default App;
