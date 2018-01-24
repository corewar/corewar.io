import React from 'react'
import styled from 'styled-components'

import CanvasCore from './canvasCore'
import FontAwesomeButton from '../simulator/fontAwesomeButton'
import ErrorBoundary from './../app/errorBoundary'

import { colour, space } from  '../../styles/theme'

const CanvasWrapper = styled.section`

  position: relative;
  min-height: 500px;
  display: grid;
  grid-template-rows: 130px 1fr ${space.header};

  #canvasContainer {
    position: relative;
    min-height: 500px;
    min-width: 500px;
    border: 1px solid ${colour.grey};
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
`

const Controls = styled.div`
  height: calc(${space.header} - ${space.m});
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  text-align: center;
  padding-top: ${space.m};
  color: ${colour.grey};
`

const CoreContainer = ({ coreSize, getCoreInstructions, isRunning, isInitialised, run, pause, step, init }) => (
  <CanvasWrapper>
    <div></div>
    <ErrorBoundary>
      <CanvasCore
        coreSize={coreSize}
        getCoreInstructions={getCoreInstructions}
        isRunning={isRunning}
        isInitialised={isInitialised}
        />
    </ErrorBoundary>
    <Controls>
      <FontAwesomeButton visible={!isRunning} enabled={isInitialised} iconName="play" handleClick={run} />
      <FontAwesomeButton visible={isRunning} enabled={isRunning} iconName="pause" handleClick={pause} />
      <FontAwesomeButton visible={true} enabled={!isRunning} iconName="step-forward" handleClick={step} />
      <FontAwesomeButton visible={true} enabled={true} iconName="undo" handleClick={init} />
    </Controls>
  </CanvasWrapper>
)

export default CoreContainer
