import styled from 'styled-components'
import PropTypes from 'prop-types'

import { colour } from '../../styles/theme'

const Button = styled.button.attrs({
  onClick: props => !props.disabled ? props.handleClick : undefined
})`
  color: ${props => props.disabled ? colour.grey : colour.white };
  border: none;
  background-color: transparent;
  width: 100%;
  height: 100%;

  &:hover {
    ${props => !props.disabled && `cursor: pointer`};
  }
`

Button.propTypes = {
  handleClick: PropTypes.func.required
}

export default Button