import React from 'react'

import './sectionHeader.css'

const OutputSectionHeader = ({ headerText }) => (
  <section className="section-header output">
    <span>{headerText && headerText.toUpperCase()}</span>
  </section>
)

export default OutputSectionHeader