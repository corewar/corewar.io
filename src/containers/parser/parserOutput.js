import React from 'react'

import MessagePanel from './messagePanel'

import './parserOutput.css'

const ParserOutput = ({isParsing, parseResult}) => (
  <section id="output">
    <pre>
      {isParsing ? 'parsing...' : parseResult ? parseResult.warrior : 'awaiting redcode'}
    </pre>
  </section>
)

export default ParserOutput