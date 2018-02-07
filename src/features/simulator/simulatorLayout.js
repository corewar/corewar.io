import React from 'react'
import styled from 'styled-components'

import CanvasCore from './canvasCore'
import ErrorBoundary from './../app/errorBoundary'
import Warriors from './warriors'

import { colour } from  '../common/theme'
import { media } from  '../common/mediaQuery'

const CanvasWrapper = styled.section`

  height: 100%;
  position: relative;

  ${media.tablet`min-height: 400px;`}
  ${media.phone`min-height: 400px;`}

  display: grid;
  grid-template-rows: 75px 1fr;

  #canvasContainer {
    position: relative;

    ${media.desktop`min-height: 500px;`}
    ${media.tablet`min-height: 400px;`}
    ${media.phone`min-height: 400px;`}

    ${media.desktop`min-width: 500px;`}
    ${media.tablet`min-width: 400px;`}
    ${media.phone`min-width: 400px;`}

    border: 1px solid ${colour.lightbg};
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
`

const CoreInterface = ({ coreSize, getCoreInstructions, isRunning, isInitialised, init, parseResults, maxTasks, removeWarrior, republish }) => (
  <CanvasWrapper>
    <Warriors parseResults={parseResults} maxTasks={maxTasks} removeWarrior={removeWarrior} />
    <ErrorBoundary>
      <CanvasCore
        init={init}
        republish={republish}
        coreSize={coreSize}
        getCoreInstructions={getCoreInstructions}
        isRunning={isRunning}
        isInitialised={isInitialised}
        />
    </ErrorBoundary>
  </CanvasWrapper>
)

export default CoreInterface
