import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import ControlButton from '../../components/parser/controlButton'

import './parseControls.css'

import {
  addWarrior
} from './../../actions/parserActions'

const ParseControls = ({ addWarrior, currentParseResult }) => (
  <div id="parseControls">
    <ControlButton
      iconClass={`plus`}
      tooltipText={`add to core`}
      handleClick={addWarrior}
      enabled={currentParseResult && currentParseResult.warrior && currentParseResult.messages.length === 0} />
  </div>
)

ParseControls.PropTypes = {
  addWarrior: PropTypes.func,
  currentParseResult: PropTypes.shape({
    warrior: PropTypes.string,
    messages: PropTypes.array
  }).isRequired
}

const mapStateToProps = state => ({
  currentParseResult: state.parser.currentParseResult
})

export default connect(
  mapStateToProps,
  {
    addWarrior
  }
)(ParseControls)

export { ParseControls as PureParseControls }

