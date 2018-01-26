import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Octicon from 'react-octicon'

import Controls from '../../components/styledComponents/mobile/controls'
import Button from  '../../components/styledComponents/button'

import {
  addWarrior
} from './../../actions/parserActions'

const MobileControls = ({ addWarrior }) => (
  <Controls>
    <Button enabled={true} handleClick={addWarrior}>
      <Octicon mega name="chevron-right"/>
    </Button>
  </Controls>
)

MobileControls.PropTypes = {
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
)(MobileControls)

export { MobileControls as PureMobileControls }