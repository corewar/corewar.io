import React from 'react'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const Home = props => (
  <div>
    <h1>Corewar - home</h1>
    <p>Welcome to corewar</p>
    <button onClick={() => props.changePage()}>Go to parser page via redux</button>
  </div>
)

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/parser')
}, dispatch)

export default connect(
  null,
  mapDispatchToProps
)(Home)