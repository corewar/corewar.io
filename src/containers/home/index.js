import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Home = props => (
  <div>
    <h1>Home</h1>
    <p>Welcome to corewar.js</p>
    <p>Here would go some intro text falling into the following categories:</p>
    <ul>
      <li>What is corewar?</li>
      <li>How do you play it? (on this site)</li>
      <li>Tutorials</li>
      <li>Hills</li>
    </ul>
  </div>
)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/parser')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Home)