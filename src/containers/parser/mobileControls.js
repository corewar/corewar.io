import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Octicon from 'react-octicon'

import Controls from '../../components/styledComponents/mobile/controls'
import Button from  '../../components/styledComponents/button'
import ParseStatusButton from  '../../components/styledComponents/parseStatusButton'

import {
  addWarrior
} from './../../actions/parserActions'

const MobileControls = ({ addWarrior, currentParseResult }) => (
  <Controls>
    <ParseStatusButton
      enabled={hasNoErrors(currentParseResult)}
      messages={currentParseResult.messages}
      handleClick={() => { console.log('disabled clicked me') }} disabled>
      <Octicon mega name="issue-opened"/>
    </ParseStatusButton>
    <Button
      messages={hasNoErrors(currentParseResult)}
      handleClick={addWarrior}>
      <Octicon mega name="chevron-right"/>
    </Button>
  </Controls>
)

const hasNoErrors = (currentParseResult) => {
  currentParseResult.warrior && currentParseResult.messages.filter(x => x.type !== 0).length === 0
}

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