import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Octicon from 'react-octicon'

import Button from  '../common/button'
import Controls from  '../common/controls'
import ParseStatusButton from  './parseStatusButton'

import {
  addWarrior
} from './actions'

const MobileControls = ({ addWarrior, currentParseResult }) => (
  <Controls>
    <ParseStatusButton
      enabled={hasNoErrors(currentParseResult)}
      messages={currentParseResult.messages}
      handleClick={() => { console.log('disabled clicked me') }}>
      <Octicon mega name="issue-opened"/>
    </ParseStatusButton>
    <Button
      enabled={hasNoErrors(currentParseResult)}
      handleClick={addWarrior}>
      <Octicon mega name="chevron-right"/>
    </Button>
  </Controls>
)

const hasNoErrors = (currentParseResult) => (
  currentParseResult.warrior && currentParseResult.messages.filter(x => x.type === 0).length === 0
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