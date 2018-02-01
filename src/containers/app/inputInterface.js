import React from 'react'
import { connect } from 'react-redux'

import SourceCodeTextArea from '../../components/styledComponents/sourceCodeTextArea'
import MessagePanel from '../../components/parser/messagePanel'

import {
  parse
} from '../../actions/parserActions'

const InputInterface = ({ redcode, parse }) => (
  <div>
  <SourceCodeTextArea
    value={redcode}
    handleChange={e => parse(e.target.value)} />
  <MessagePanel />
  </div>
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