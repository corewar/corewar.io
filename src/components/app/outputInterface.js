import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'
import styledProperty from 'styled-property'

import ParserOutput from '../../components/parser/parserOutput'

import { colour, font, space } from '../../styles/theme'
import { media } from '../../styles/mediaQuery'

const MobileContainer = styled.div`
  display: none;
  grid-template-rows: ${space.s} 48px 1fr 48px;
  grid-template-columns: 1fr;

  ${media.phone`display: grid;`}
`

const MobileNav = styled.div`
  grid-row-start: 2;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr;
  text-align: center;
`

const BaseLink = styled(NavLink)`
  color: ${colour.grey};
  padding-top: ${space.m};
  height: ${space.header} - ${space.m};
  width: 100%;
  text-decoration: none;

  &:hover {
    color: ${colour.white};
  }
`

const StyledLink = styledProperty(BaseLink, 'activeClassName')`
  background-color: ${colour.defaultbg};
  color: ${colour.white};
`

const MobileBody = styled.section`
  grid-row-start: 3;
  height: calc(100vh - ${space.s} - ${space.header} - ${space.header} - ${space.controls});
  background-color: ${colour.defaultbg};
`

const MobileControls = styled.div`
  grid-row-start: 4;

  background-color: ${colour.lightbg};
`

const OutputInterface = ({ currentParseResult }) => (
  <MobileContainer>
    <MobileNav>
      <StyledLink to='/src'>src</StyledLink>
      <StyledLink to='/output'>output</StyledLink>
      <StyledLink to='/core'>core</StyledLink>
    </MobileNav>
    <MobileBody>
      <ParserOutput parseResult={currentParseResult} />
    </MobileBody>
    <MobileControls>
    </MobileControls>
  </MobileContainer>
)

const mapStateToProps = state => ({
  currentParseResult: state.parser.currentParseResult
})

export default connect(
  mapStateToProps
)(OutputInterface)

export { OutputInterface as PureParserInterface }