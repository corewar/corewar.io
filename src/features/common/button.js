import styled from 'styled-components'
import PropTypes from 'prop-types'

import { colour } from './theme'

const Button = styled.button.attrs({
  onClick: props => props.enabled ? props.handleClick : null
})`
  color: ${props => !props.enabled ? colour.grey : colour.lightgrey };
  border: none;
  outline: none;
  background-color: transparent;
  flex: 1;

  font-size: 1.5em;
  transition: 0.5s;

  &:hover {
    ${props => props.enabled && `cursor: pointer`};
    transition: 0.5s;
    ${props => props.enabled && `background-color: ${colour.defaultbg}`};
    ${props => props.enabled && `color: ${colour.white}`};
  }
`

Button.propTypes = {
  handleClick: PropTypes.func
}

export default Button