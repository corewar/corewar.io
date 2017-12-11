import React from 'react'

import './sectionHeader.css'

const InputSectionHeader = ({ headerText }) => (
  <section className="section-header input">
    <span>{`${headerText.toUpperCase()}`}</span>
  </section>
)

export default InputSectionHeader