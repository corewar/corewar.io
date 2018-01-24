import React from 'react'
import { connect } from 'react-redux'

import Container from '../styledComponents/mobile/container'
import NavBar from '../styledComponents/mobile/navBar'
import Main from '../styledComponents/mobile/main'
import Footer from '../styledComponents/mobile/footer'
import SourceCodeTextArea from '../styledComponents/sourceCodeTextArea'
import TabLink from '../styledComponents/tabLink'

import {
  parse
} from '../../actions/parserActions'

const ParserInterface = ({ redcode, parse }) => (
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
    </Main>
    <Footer>
    </Footer>
  </Container>
)

const mapStateToProps = state => ({
  redcode: state.parser.redcode
})

export default connect(
  mapStateToProps,
  {
    parse
  }
)(ParserInterface)

export { ParserInterface as PureParserInterface }