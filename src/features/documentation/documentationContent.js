import styled from 'styled-components'

import { colour, space, font } from '../common/theme'

const DocumentationContent = styled.section`
  background-color: ${colour.defaultbg};
  font-size: ${font.large};
  line-height: ${font.xlarge};
  padding: ${space.xl} 0 0 10%;
  font-weight: 300;

  p {
    color: ${colour.white};
    width: 60%;
    margin-bottom: ${space.l};
  }

  pre {
    font-family: ${font.code};
    background-color: ${colour.lightbg};
    color: ${colour.blue};
    padding: ${space.m};
    margin: ${space.l} 0;
    width: 30%;
  }

  a {
    color: ${colour.white};
    text-decoration-color: ${colour.coral};

    :hover {
      color: ${colour.blue};
    }
  }

  h3 {
    color: ${colour.blue};
    font-size: ${font.xlarge};
    margin-bottom: ${font.large};
  }

  button {
    border: 2px solid ${colour.white};
    min-width: 100px;
    color: ${colour.white};
    border-radius: 2px;
    background-color: transparent;
    padding: ${space.m};
    margin: ${space.m} 0;

    :hover {
      cursor: pointer;
      background-color: ${colour.darkbg};
    }
  }
`

export default DocumentationContent