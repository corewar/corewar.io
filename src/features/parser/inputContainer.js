import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import SourceCodeTextArea from '../../components/styledComponents/sourceCodeTextArea'
import MessagePanel from './messagePanel'
import { space } from '../../styles/theme'

import {
  parse
} from './actions'

const StyledInput = styled.div`
  height: 100%;
`

const InputInterface = ({ redcode, parse, currentParseResult }) => (
  <StyledInput>
    <SourceCodeTextArea
      value={redcode}
      handleChange={e => parse(e.target.value)} />
    <MessagePanel messages={currentParseResult && currentParseResult.messages} />
  </StyledInput>
)

const mapStateToProps = state => ({
  redcode: state.parser.redcode,
  currentParseResult: state.parser.currentParseResult
})

export default connect(
  mapStateToProps,
  {
    parse
  }
)(InputInterface)

export { InputInterface as PureInputInterface }