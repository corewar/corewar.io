import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { space, colour, font } from '../common/theme'
import { media } from '../common/mediaQuery'

const SettingsMenuGrid = styled.section`

  ${props => props.show && media.tablet ? `right: 0;` : `right: -200px;`};
  ${props => props.show && media.designer ? `right: -${space.m};` : `right: -216px;`};

  transition: 0.5s;
  position: absolute;
  bottom: 0;

  width: 200px;
  height: calc(100vh - ${space.controls} - ${space.header});

  display: grid;
  grid-template-rows: ${space.header} 1fr;

  background-color: ${colour.lightbg};
  border-left: 1px solid ${colour.lightbg};

  ${media.phone`margin-bottom: ${space.controls};`}
  ${media.tablet`margin-bottom: ${space.controls};`}
  ${media.desktop`margin-bottom: ${space.controls};`}

  color: ${colour.grey};

  span {
    margin: ${space.m};
    margin-top: ${space.l};
    width: 100%;
    border-bottom: ${colour.grey};
  }

  ul {
    margin: ${space.m};
  }

  li.active {
    color: ${colour.white};
    border-left: 2px solid ${colour.blue};
  }

  ul li {
    margin-left: ${space.m};
    margin-top: ${space.m};
    margin-right: ${space.s};

    padding-bottom: ${space.s};
    padding-top: ${space.s};
    padding-left: ${space.s};

    min-height: ${space.m};
    height: auto;
    border-bottom: 2px solid transparent;
    font-size: ${font.small};

    &:hover {
      border-bottom: 2px solid ${colour.blue};
      cursor: pointer;
      color: ${colour.white};
    }
  }

`

const SettingsMenu = ({ show, options, handleClick, currentSelection }) => (
  <SettingsMenuGrid show={show}>
    <span>/ settings</span>
    <ul>
      {options.map((option, i) => (
        <li
          className={option.id === currentSelection ? `active` : ``}
          key={`${option.name}_${i}`}
          onClick={() => handleClick(option.id)}>
          {option.name}
        </li>
      ))}
    </ul>
  </SettingsMenuGrid>
)

SettingsMenu.propTypes = {
  options: PropTypes.array
}

SettingsMenu.defaultProps = {
  options: []
}


export default SettingsMenu