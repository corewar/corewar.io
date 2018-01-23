import React from 'react'
import { connect } from 'react-redux'

import Container from '../styledComponents/mobile/container'
import NavBar from '../styledComponents/mobile/navBar'
import Main from '../styledComponents/mobile/main'
import Footer from '../styledComponents/mobile/footer'
import CompiledOutput from '../styledComponents/compiledOutput'
import TabLink from '../styledComponents/tabLink'

const OutputInterface = ({ currentParseResult }) => (
  <Container>
    <NavBar>
      <TabLink to='/src'>src</TabLink>
      <TabLink to='/output'>output</TabLink>
      <TabLink to='/core'>core</TabLink>
    </NavBar>
    <Main>
      <CompiledOutput>
        {currentParseResult.warrior}
      </CompiledOutput>
    </Main>
    <Footer>
    </Footer>
  </Container>
)

const mapStateToProps = state => ({
  currentParseResult: state.parser.currentParseResult
})

export default connect(
  mapStateToProps
)(OutputInterface)

export { OutputInterface as PureParserInterface }