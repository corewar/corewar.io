import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import SourceCodeTextArea from '../styledComponents/sourceCodeTextArea'
import CompiledOutput from '../styledComponents/compiledOutput'
import Main from '../styledComponents/tablet/main'

import { space } from '../../styles/theme'

import {
  parse
} from '../../actions/parserActions'

const ParserGrid = styled.section`
  display: grid;
  grid-template-columns: 60% 40%;
  grid-template-rows: 1fr;
  height: calc(100vh - 48px);
`

const ParserInterface = ({ redcode, parse, currentParseResult }) => (
  <ParserGrid>
    <SourceCodeTextArea
      value={redcode}
      handleChange={e => parse(e.target.value)} />
    <CompiledOutput tablet>
    {`ORG	0
MOV.AB	#5,	#0
MOV.I	<-1,	{3
JMN.B	$-1,	$-2
SPL.B	>-3,	{-1277
JMZ.B	$5620,	*0
MOV.AB	#5,	#0
MOV.I	<-6,	{-2
JMN.B	$-6,	$-7
SPL.B	>-8,	{-1277
JMZ.B	$5620,	*0
MOV.AB	#5,	#0
MOV.I	<-11,	{-7
JMN.B	$-11,	$-12
SPL.B	>-13,	{-1277
JMZ.B	$5620,	*0
MOV.AB	#5,	#0
MOV.I	<-16,	{-12
JMN.B	$-16,	$-17
SPL.B	>-18,	{-1277
JMZ.B	$5620,	*0
MOV.AB	#5,	#0
MOV.I	<-21,	{-17
JMN.B	$-21,	$-22
SPL.B	>-23,	{-1277
JMZ.B	$5620,	*0
MOV.AB	#5,	#0
MOV.I	<-26,	{-22
JMN.B	$-26,	$-27
SPL.B	>-28,	{-1277
JMZ.B	$5620,	*0
MOV.AB	#5,	#0
MOV.I	<-31,	{-27
JMN.B	$-31,	$-32
SPL.B	>-33,	{-1277
JMZ.B	$5620,	*0
MOV.AB	#5,	#0
MOV.I	<-36,	{-32
JMN.B	$-36,	$-37
SPL.B	>-38,	{-1277
JMZ.B	$5620,	*0
MOV.AB	#5,	#0
MOV.I	<-41,	{-37
JMN.B	$-41,	$-42
SPL.B	>-43,	{-1277
JMZ.B	$5620,	*0
MOV.AB	#5,	#0
MOV.I	<-46,	{-42
JMN.B	$-46,	$-47
SPL.B	>-48,	{-1277
JMZ.B	$5620,	*0`}
      {currentParseResult.warrior}
    </CompiledOutput>
  </ParserGrid>
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