import styled from 'styled-components'
import PropTypes from 'prop-types'

import { colour } from '../../styles/theme'

const Button = styled.button.attrs({
  onClick: props => props.enabled ? props.handleClick : null
})`
  color: ${props => !props.enabled ? colour.grey : colour.white };
  border: none;
  outline: none;
  background-color: transparent;
  width: 100%;
  height: 100%;

  &:hover {
    ${props => props.enabled && `cursor: pointer`};
  }
`

// Button.propTypes = {
//   handleClick: PropTypes.func.required
// }

export default Button