import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import Octicon from 'react-octicon'
import styled from 'styled-components'

import Button from  '../common/button'
import ParseStatusButton from  '.parseStatusButton'

import { media } from  '../common/mediaQuery'
import { colour, space } from '../common/theme'

import {
  addWarrior
} from './actions'

const Controls = styled.div`

  grid-row-start: 2;
  border: none;

  ${media.phone`
    border-top: 1px solid ${colour.grey};
    background-color: ${colour.lightbg};
    grid-row-start: 4;
  `}
  ${media.tablet`
    border-top: 1px solid ${colour.grey};
    background-color: ${colour.lightbg};
  `}
  ${media.desktop`
    border-top: 1px solid ${colour.grey};
    background-color: ${colour.lightbg};
  `}

  display: flex;
  flex-direction: row;
  height: calc(${space.controls} - 1px);
`

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