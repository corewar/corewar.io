import React from 'react'

import './parserInput.css'

const ParserInput = ({ redcode, handleChange }) => (
  <section id="input">
    <textarea
      placeholder="enter your redcode"
      defaultValue={redcode}
      onChange={e => handleChange(e.target.value)}></textarea>
  </section>
)

export default ParserInput