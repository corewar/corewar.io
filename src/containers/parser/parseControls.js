import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ControlButton from './controlButton'

import './parseControls.css'

import {
  save
} from '../../modules/parser'

const ParseControls = ({ save }) => (
  <div id="parseControls">
    <ControlButton iconClass={`plus`} handleClick={save} />
  </div>
)

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
  save
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ParseControls)

export { ParseControls as PureParseControls }

