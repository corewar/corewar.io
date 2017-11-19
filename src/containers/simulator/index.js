import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './simulator.css';
import {
  init,
  step
} from '../../modules/simulator'

const Simulator = props => (
  <div>
    <h1>Core simulator</h1>
    <div>
      <p>
        <textarea value={props.redcode} />
      </p>
      <div>
      </div>
    </div>
  </div>
)

const mapStateToProps = state => ({
  redcode: state.parser.redcode
})

const mapDispatchToProps = dispatch => bindActionCreators({
  init,
  step
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Simulator)