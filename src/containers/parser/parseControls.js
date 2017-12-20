import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ControlButton from './controlButton'

import './parseControls.css'

import {
  save
} from '../../modules/parser'

const ParseControls = ({ save, currentParseResult }) => (
  <div id="parseControls">
    <ControlButton iconClass={`plus`} tooltipText={`add to core`} handleClick={save} enabled={currentParseResult.warrior} />
  </div>
)

const mapStateToProps = state => ({
  currentParseResult: state.parser.currentParseResult
})

const mapDispatchToProps = dispatch => bindActionCreators({
  save
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParseControls)

export { ParseControls as PureParseControls }

