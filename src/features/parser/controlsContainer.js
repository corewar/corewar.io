import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Octicon from 'react-octicon'

import Button from  '../common/button'
import Controls from  '../common/controls'
import ParseStatusButton from  './parseStatusButton'

import {
  addWarrior,
  showMessages
} from './actions'

const MobileControls = ({ addWarrior, currentParseResult, showMessages }) => (
  <Controls>
    <ParseStatusButton
      enabled={true}
      messages={currentParseResult.messages}
      handleClick={showMessages}>
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
    addWarrior,
    showMessages
  }
)(MobileControls)

export { MobileControls as PureMobileControls }