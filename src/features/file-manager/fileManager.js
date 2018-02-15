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

  ul {
    margin: ${space.m};
  }

  ul li {
    margin: ${space.m};
    width: 100%;
    height: ${space.l};
  }


`

const SlideIn = props => {


}

const FileManager = ({ show }) => (
  <FileManagerGrid show={show}>
    /dougajmcdonald
    <ul>
      <li>file1.red</li>
      <li>file2.red</li>
      <li>file3.red</li>
    </ul>
  </FileManagerGrid>
)

export default FileManager