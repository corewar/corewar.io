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

const MobileControls = ({ addWarrior, currentWarrior, showMessages, toggleFileManager }) => (
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
      messages={currentWarrior.messages}
      handleClick={showMessages}>
      <ButtonGrid>
        <Octicon name="terminal"/>
        <ButtonText>console</ButtonText>
      </ButtonGrid>
    </ParseStatusButton>
    <Button
      enabled={hasNoErrors(currentWarrior)}
      handleClick={addWarrior}>
      <ButtonGrid>
        <Octicon name="git-commit"/>
        <ButtonText>add to core</ButtonText>
      </ButtonGrid>
    </Button>
  </Controls>
)

const hasNoErrors = (currentWarrior) => (
  currentWarrior.compiled && currentWarrior.messages.filter(x => x.type === 0).length === 0
)

MobileControls.PropTypes = {
  addWarrior: PropTypes.func,
  loadWarrior: PropTypes.func,
  currentWarrior: PropTypes.shape({
    compiled: PropTypes.string,
    messages: PropTypes.array
  }).isRequired
}

const mapStateToProps = state => ({
  currentWarrior: state.parser.currentWarrior
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