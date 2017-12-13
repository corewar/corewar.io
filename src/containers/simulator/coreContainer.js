import React from 'react'

import CanvasCore from './canvasCore'

import './coreContainer.css'

const CoreContainer = ({ coreSize, getCoreInstructions }) => (
  <section id="core">
    <CanvasCore
      width={500}
      height={500}
      coreSize={coreSize}
      getCoreInstructions={getCoreInstructions}
      />
  </section>
)

export default CoreContainer
