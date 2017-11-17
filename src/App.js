import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as core from "corewar";

class App extends Component {

  corewar;

  constructor() {
    super()
    this.corewar = new core.Api()
    this.state = {
      parsedRedcode: ''
    };
  }

  handleChange(e) {
    const result = this.corewar.parse(e.target.value.trim());
    console.log(result);
    this.setState({ parsedRedcode: result })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Corewar</h1>
        </header>
        <div className="parser">
          <textarea onChange={(e) => this.handleChange(e)}></textarea>
          <textarea value={
              this.state.parsedRedcode &&
              this.state.parsedRedcode.tokens.map((token) => token.lexeme)
            }></textarea>
          <div>
            <ul>
              {
                this.state.parsedRedcode &&
                this.state.parsedRedcode.messages.map((msg) => <li key={msg}>{msg.text}</li>)
              }
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
