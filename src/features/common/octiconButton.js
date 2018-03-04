import React from 'react'
import styled from 'styled-components'
import Octicon from 'react-octicon'

import Button from './button'

const ButtonText = styled.span`
  display: inline-block;
  font-size: 0.5em;
`

const ButtonGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
`

const OcticonButton = ({ enabled = true, handleClick, iconName, buttonText }) => (
  <Button
    enabled={enabled}
    handleClick={handleClick}>
    <ButtonGrid>
      <Octicon name={iconName}/>
      <ButtonText>{buttonText}</ButtonText>
    </ButtonGrid>
  </Button>
)

export default OcticonButton