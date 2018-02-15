import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Octicon from 'react-octicon'
import styled from 'styled-components'

import Button from  '../common/button'
import Controls from  '../common/controls'
import ParseStatusButton from  './parseStatusButton'

import {
  addWarrior,
  showMessages,
  toggleFileManager
} from './actions'

const ButtonText = styled.span`
  display: inline-block;
  font-size: 0.5em;
`

const ButtonGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
`

const MobileControls = ({ addWarrior, currentParseResult, showMessages, toggleFileManager }) => (
  <Controls>
    <Button
      enabled={true}
      handleClick={toggleFileManager}>
      <ButtonGrid>
        <Octicon name="file-directory"/>
        <ButtonText>manage files</ButtonText>
      </ButtonGrid>
    </Button>
    <ParseStatusButton
      enabled={true}
      messages={currentParseResult.messages}
      handleClick={showMessages}>
      <ButtonGrid>
        <Octicon name="terminal"/>
        <ButtonText>console</ButtonText>
      </ButtonGrid>
    </ParseStatusButton>
    <Button
      enabled={hasNoErrors(currentParseResult)}
      handleClick={addWarrior}>
      <ButtonGrid>
        <Octicon name="git-commit"/>
        <ButtonText>add to core</ButtonText>
      </ButtonGrid>
    </Button>
  </Controls>
)

const hasNoErrors = (currentParseResult) => (
  currentParseResult.warrior && currentParseResult.messages.filter(x => x.type === 0).length === 0
)

MobileControls.PropTypes = {
  addWarrior: PropTypes.func,
  loadWarrior: PropTypes.func,
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
    showMessages,
    toggleFileManager
  }
)(MobileControls)

export { MobileControls as PureMobileControls }