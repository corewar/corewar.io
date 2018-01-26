import React from 'react'
import { connect } from 'react-redux'

import SourceCodeTextArea from '../styledComponents/sourceCodeTextArea'
import MobileContent from '../styledComponents/mobile/mobileContent'
import MobileControls from '../../containers/parser/mobileControls'

import {
  parse
} from '../../actions/parserActions'

const InputInterface = ({ redcode, parse }) => (
  <MobileContent>
    <SourceCodeTextArea
      value={redcode}
      handleChange={e => parse(e.target.value)} />
    <MobileControls />
  </MobileContent>
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