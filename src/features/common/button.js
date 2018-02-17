import styled from 'styled-components'
import PropTypes from 'prop-types'

import { colour } from './theme'

const Button = styled.button.attrs({
  onClick: props => props.enabled ? props.handleClick : null
})`
  color: ${props => !props.enabled ? colour.grey : colour.white };
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  height: 100%;
  font-size: 1.5em;
  transition: 0.5s;

  &:hover {
    ${props => props.enabled && `cursor: pointer`};
    transition: 0.5s;
    ${props => props.enabled && `background-color: ${colour.defaultbg}`};
    ${props => props.enabled && `color: ${colour.lightgrey}`};
  }
`

Button.propTypes = {
  handleClick: PropTypes.func
}

export default Button