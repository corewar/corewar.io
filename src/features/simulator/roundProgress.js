import React from 'react'
import styled from 'styled-components'

import { colour, space, font } from '../common/theme'

const RoundProgressWrapper = styled.section`
  display: flex;
  flex-direction: column;

  span {
    color: ${colour.lightgrey};
    font-size: ${font.small};
    text-align: center;
    padding: ${space.s};
    border-bottom: 1px solid ${colour.lightbg};
  }
`

const ProgressBar = styled.div`
  height: ${space.l};
  width: ${props => props.runProgress}%;
  background-color: ${colour.coral};
`

const RoundProgress = ({ runProgress }) => (
  <RoundProgressWrapper>
    <span>Round progress</span>
    <ProgressBar runProgress={runProgress} />
  </RoundProgressWrapper>
)

export default RoundProgress