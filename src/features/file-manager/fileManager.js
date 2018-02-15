import React from 'react'
import styled from 'styled-components'

import { space, colour } from '../common/theme'

const FileManagerGrid = styled.section`

  ${props => props.show ? `left: 0;` : `left: -200px;`};

  transition: 0.5s;
  position: absolute;
  bottom: 0;

  width: 200px;
  height: calc(100vh - ${space.controls} - ${space.header});

  display: grid;
  grid-template-rows: ${space.header} 1fr;

  background-color: ${colour.lightbg};
  border-right: 1px solid ${colour.grey};

  margin-bottom: ${space.controls};

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
    margin-top: ${space.l};
    padding-bottom: ${space.s};
    padding-top: ${space.s};
    margin-right: ${space.s};
    height: ${space.m};
    border-bottom: 2px solid transparent;

    &:hover {
      border-bottom: 2px solid ${colour.blue};
      cursor: pointer;
      color: ${colour.white};
    }
  }

`

const FileManager = ({ show, files }) => (
  <FileManagerGrid show={show}>

    <span>/ dougajmcdonald</span>
    <ul>
      {files.map(file => (
        <li key={file.guid}>{file.name}</li>
      ))}
    </ul>
  </FileManagerGrid>
)

export default FileManager