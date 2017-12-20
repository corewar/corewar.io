import React from 'react'

import CanvasCore from './canvasCore'

import './coreContainer.css'

const CoreContainer = ({ coreSize, getCoreInstructions, isRunning, isInitialised }) => (
  <section id="core">
    <CanvasCore
      coreSize={coreSize}
      getCoreInstructions={getCoreInstructions}
      />
  </section>
)

export default CoreContainer
