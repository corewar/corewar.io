import React from 'react'

import CanvasCore from './canvasCore'
import ErrorBoundary from './../app/errorBoundary'

import './coreContainer.css'

const CoreContainer = ({ coreSize, getCoreInstructions, isRunning, isInitialised }) => (
  <section id="core">
    <ErrorBoundary>
      <CanvasCore
        coreSize={coreSize}
        getCoreInstructions={getCoreInstructions}
        isRunning={isRunning}
        isInitialised={isInitialised}
        />
    </ErrorBoundary>
  </section>
)

export default CoreContainer
