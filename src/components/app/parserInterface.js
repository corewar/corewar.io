import React from 'react'
import { connect } from 'react-redux'

import Container from '../styledComponents/mobile/container'
import NavBar from '../styledComponents/mobile/navBar'
import Main from '../styledComponents/mobile/main'
import Footer from '../styledComponents/mobile/footer'
import SourceCodeTextArea from '../styledComponents/sourceCodeTextArea'
import CompiledOutput from '../styledComponents/compiledOutput'
import TabLink from '../styledComponents/tabLink'

import {
  parse
} from '../../actions/parserActions'

const ParserInterface = ({ redcode, parse, currentParseResult }) => (
  <Container>
    <NavBar>
      <TabLink to='/src'>src</TabLink>
      <TabLink to='/output'>output</TabLink>
      <TabLink to='/core'>core</TabLink>
    </NavBar>
    <Main>
      <SourceCodeTextArea
        value={redcode}
        handleChange={e => parse(e.target.value)} />
      <CompiledOutput>
        {currentParseResult.warrior}
      </CompiledOutput>
    </Main>
    <Footer>
    </Footer>
  </Container>
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
)(ParserInterface)

export { ParserInterface as PureParserInterface }