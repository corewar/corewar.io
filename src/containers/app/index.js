// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';
// import * as core from "corewar";

import React from 'react'
import { Route, Link } from 'react-router-dom'
import Home from '../home'
import Parser from '../parser'

const App = () => (
  <div>
    <header>
      <Link to="/">Home</Link>
      <Link to="/parser">Parser</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/parser" component={Parser} />
    </main>
  </div>
)

// class App extends Component {

//   corewar;

//   constructor() {
//     super()
//     this.corewar = new core.Api()
//     this.state = {
//       parsedRedcode: '',
//       warrior: '',
//       selectedStandard: 2
//     };
//   }

//   handleRedcodeChange(e) {
//     const result = this.corewar.parse(e.target.value, { standard: this.state.selectedStandard});
//     const warrior = this.corewar.serialise(result.tokens);
//     console.log(result);
//     this.setState({
//       parsedRedcode: result,
//       warrior: warrior
//     });
//   }

//   handleStandardChange(e) {
//     this.setState({
//       selectedStandard: e.target.value
//     });
//   }

//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to Corewar</h1>
//         </header>
//         <div className="parser">
//           <select defaultValue={2} onChange={(e) => this.handleStandardChange(e)}>
//             <option value="0">ICWS'86</option>
//             <option value="1">ICWS'88</option>
//             <option value="2">ICWS'94-draft</option>
//           </select>
//           <textarea onChange={(e) => this.handleRedcodeChange(e)}></textarea>
//           <textarea value={
//               this.state.warrior
//             }></textarea>
//           <div>
//             <ul>
//               {
//                 this.state.parsedRedcode &&
//                 this.state.parsedRedcode.messages.map((msg) => <li key={msg}>{msg.text}</li>)
//               }
//             </ul>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default App;
