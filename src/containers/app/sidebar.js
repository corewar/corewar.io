import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ControlButton from './controlButton'

import './sidebar.css'

import {
  save
} from '../../modules/parser'

const Sidebar = () => (
  <aside id="sidebar">
    <ControlButton iconClass={`plus`} handleClick={save} />
    <ControlButton iconClass={`panel`} />
    <ControlButton iconClass={`delete`} />
  </aside>
)

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators({
  save
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)

export { Sidebar as PureSidebar }