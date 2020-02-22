import React from 'react'
import styled from 'styled-components'

import { space, colour, font } from '../common/theme'
import { media } from '../common/mediaQuery'

const FileManagerGrid = styled.section`

  ${props => (props.show ? `left: 0;` : `left: -201px;`)};

  transition: 0.5s;
  position: absolute;
  bottom: 0;

  width: 200px;
  height: calc(100vh - ${space.controls} - ${space.header});

  display: grid;
  grid-template-rows: ${space.header} 1fr;

  background-color: ${colour.lightbg};

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

  ul li {
    margin-left: ${space.m};
    margin-top: ${space.m};
    padding-bottom: ${space.s};
    padding-top: ${space.s};
    margin-right: ${space.s};
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

const FileManager = ({ show, files, handleClick }) => (
  <FileManagerGrid show={show}>
    <span>/ root</span>
    <ul>
      {files.map((file, i) => (
        <li key={`${file.name}_${i}`} onClick={() => handleClick(file.source)}>
          {file.name}
        </li>
      ))}
    </ul>
  </FileManagerGrid>
)

export default FileManager
