import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import SourceCodeTextArea from '../styledComponents/sourceCodeTextArea'
import CompiledOutput from '../styledComponents/compiledOutput'
import Controls from '../styledComponents/desktop/controls'
import Button from '../styledComponents/button'

import { space } from '../../styles/theme'

import {
  parse
} from '../../actions/parserActions'

const DesktopContainer = styled.section`
  display: grid;
  grid-template-columns: 5fr 1fr 4fr;
  grid-template-rows: ${space.header} 1fr;
  grid-column-gap: ${space.m};
`

const ParserGrid = styled.section`
  grid-row-start: 2;
  display: flex;
  height: calc(100vh - ${space.header} - ${space.header});
`

const CompleteInterface = ({ redcode, parse, currentParseResult }) => (
  <DesktopContainer>
    <Controls>
    </Controls>
    <ParserGrid>
      <SourceCodeTextArea desktop
        value={redcode}
        handleChange={e => parse(e.target.value)} />
      <CompiledOutput desktop>
        {currentParseResult.warrior}
      </CompiledOutput>
    </ParserGrid>
  </DesktopContainer>
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
)(CompleteInterface)

export { CompleteInterface as PureCompleteInterface }