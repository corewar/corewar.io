import React from 'react'

import MessagePanel from './messagePanel'

import './parserOutput.css'

const ParserOutput = ({isParsing, parseResult}) => (
  <section id="output">
    <pre>
      {isParsing ? 'parsing...' : parseResult ? parseResult.warrior : 'awaiting redcode'}
    </pre>
    <MessagePanel {...parseResult}/>
  </section>
)

export default ParserOutput