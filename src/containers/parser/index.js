import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './parser.css';
import {
  parse,
  setStandard
} from '../../modules/parser'

const Parser = props => (
  <div>
    <h1>Redcode Parser</h1>
    <div className="parser">
      {props.isParsing && <h2>Parsing...</h2>}
      <p>
        <select defaultValue={props.standardId} onChange={e => props.setStandard(e.target.value)}>
          <option value="0">ICWS'86</option>
          <option value="1">ICWS'88</option>
          <option value="2">ICWS'94-draft</option>
        </select>
      </p>
      <textarea onChange={e => props.parse(e.target.value)}></textarea>
      <textarea value={props.parseResult && props.parseResult.warrior}></textarea>
      <div>
        <ul>
          {/* {
            this.state.parsedRedcode &&
            this.state.parsedRedcode.messages.map((msg) => <li key={msg}>{msg.text}</li>)
        } */}
        </ul>
      </div>
    </div>
  </div>
)

const mapStateToProps = state => ({
  parseResult: state.parser.parseResult,
  isParsing: state.parser.isParsing,
  standardId: state.parser.standardId
})

const mapDispatchToProps = dispatch => bindActionCreators({
  parse,
  setStandard
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Parser)