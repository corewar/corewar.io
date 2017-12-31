import React from 'react'

import './parserOutput.css'

const ParserOutput = ({ isParsing, parseResult }) => (
  <section id="output">
    <pre>
      {isParsing ? 'parsing...' : parseResult ? parseResult.warrior : 'awaiting redcode'}
    </pre>
  </section>
)

export default ParserOutput