import React from 'react'
import styled from 'styled-components'

import CanvasCore from './canvasCore'
import FontAwesomeButton from '../simulator/fontAwesomeButton'
import ErrorBoundary from './../app/errorBoundary'
import Warriors from '../../containers/simulator/warriors'

import { colour, space } from  '../../styles/theme'
import { media } from  '../../styles/mediaQuery'

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

    border: 1px solid ${colour.grey};
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
`

const CoreInterface = ({ coreSize, getCoreInstructions, isRunning, isInitialised, init, parseResults, maxTasks }) => (
  <CanvasWrapper>
    <Warriors parseResults={parseResults} maxTasks={maxTasks} />
    <ErrorBoundary>
      <CanvasCore
        init={init}
        coreSize={coreSize}
        getCoreInstructions={getCoreInstructions}
        isRunning={isRunning}
        isInitialised={isInitialised}
        />
    </ErrorBoundary>
  </CanvasWrapper>
)

export default CoreInterface
