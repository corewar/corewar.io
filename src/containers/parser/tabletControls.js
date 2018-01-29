import React from 'react'
import { connect } from 'react-redux'
import Octicon from 'react-octicon'

import Controls from '../../components/styledComponents/tablet/controls'
import Button from '../../components/styledComponents/button'
import ParseStatusButton from '../../components/styledComponents/parseStatusButton'

import {
  addWarrior
} from '../../actions/parserActions'

const TabletControls = ({ addWarrior, currentParseResult }) => (
  <Controls>
    <ParseStatusButton
      enabled={hasNoErrors(currentParseResult)}
      messages={currentParseResult.messages}
      handleClick={() => { console.log('disabled clicked me') }} disabled>
      <Octicon mega name="issue-opened"/>
    </ParseStatusButton>
    <Button
      enabled={hasNoErrors(currentParseResult)}
      handleClick={addWarrior}>
      <Octicon mega name="chevron-right"/>
    </Button>
  </Controls>
)

// TODO: this is duplicated between here and mobileControls
const hasNoErrors = (currentParseResult) => (
  currentParseResult.warrior && currentParseResult.messages.filter(x => x.type === 0).length === 0
)

const mapStateToProps = state => ({
  currentParseResult: state.parser.currentParseResult
})

export default connect(
  mapStateToProps,
  {
    addWarrior
  }
)(TabletControls)

export { TabletControls as PureTabletControls }