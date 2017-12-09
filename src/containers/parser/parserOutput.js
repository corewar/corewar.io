import React from 'react'

import './parserOutput.css'

const ParserOutput = ({parseResult}) => (
  <section id="output">
    <pre>
      {parseResult ? parseResult.warrior : 'awaiting redcode'}
    </pre>
  {/* <MessagePanel {...parseResult}/> */}
  </section>
)

export default ParserOutput