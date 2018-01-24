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

const InputInterface = ({ redcode, parse }) => (
  <SourceCodeTextArea
    value={redcode}
    handleChange={e => parse(e.target.value)} />
)

const mapStateToProps = state => ({
  redcode: state.parser.redcode
})

export default connect(
  mapStateToProps,
  {
    parse
  }
)(InputInterface)

export { InputInterface as PureInputInterface }