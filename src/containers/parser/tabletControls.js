import React from 'react'
import { connect } from 'react-redux'
import Octicon from 'react-octicon'

import Controls from '../../components/styledComponents/tablet/controls'
import Button from '../../components/styledComponents/button'

import {
  addWarrior
} from '../../actions/parserActions'

const TabletControls = ({ addWarrior, currentParseResult }) => (
  <Controls>
  <Button
    enabled={true}
    handleClick={() => { console.log('disabled clicked me') }} disabled>
    <Octicon mega name="issue-opened"/>
  </Button>
  <Button
    enabled={currentParseResult.warrior && currentParseResult.messages.filter(x => x.type !== 1).length === 0}
    handleClick={addWarrior}>
    <Octicon mega name="chevron-right"/>
  </Button>
  </Controls>
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