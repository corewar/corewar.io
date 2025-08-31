import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { font, colour, space } from '../common/theme'

const Container = styled.div`
  ${props => !props.visible && `display: none;`};
  color: ${props => props.enabled ? `${colour.white}` : `${colour.grey}`};
  font-size: ${font.small};
  flex: 1;
  text-align: center;
  position: relative;
  height: 100%;
  font-size: ${font.base};

  ul {
    display: none;
  }

  &:hover {
    cursor: ${props => props.enabled && `pointer`};
    color: ${props => props.enabled && `${colour.blue}`};

    ul {
      position: absolute;
      display: block;
      bottom: ${space.controls};
      height: 288px;
      text-align: center;
      width: 100%;
      margin-bottom: -1px;
    }

  }
`

export const MenuItem = styled.li`
  padding-top: ${space.s};
  display: block;
  height: 24px;
  font-size: ${font.base};
  color: ${props => props.active ? colour.defaultbg : colour.blue};
  background-color: ${props => props.active ? colour.blue : colour.lightbg};

  &:hover {
    color: ${colour.defaultbg};
    background-color: ${colour.blue};
  }
`

const SelectedItem = styled.div`
  display: inline-block;
  font-size: ${font.base};
  width: 100%;
  height: calc(100% - ${font.base});
  margin-top: ${font.base};
`

const SpeedControl = ({ processRate, processRates, handleClick, visible = true, enabled = true }) => (
  <Container visible={visible} enabled={enabled}>
      <SelectedItem>{`${processRate} x`}</SelectedItem>
      <ul>
        {processRates.map(rate => (
          <MenuItem
            key={rate}
            active={rate === processRate}
            onClick={() => handleClick(rate)}>{rate} x</MenuItem>
        ))}
      </ul>
  </Container>
)

export default SpeedControl

SpeedControl.propTypes = {
  processRates: PropTypes.array
}

SpeedControl.defaultProps = {
  processRates: []
}