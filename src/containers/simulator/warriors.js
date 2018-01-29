import React, { Component } from 'react'
import styled from 'styled-components'
import Identicon from 'identicon.js'
import jssha from 'jssha'
import { List } from 'immutable'
import * as PubSub from 'pubsub-js'

import { colour, space, font } from '../../styles/theme'

const WarriorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  color: ${colour.white};
  font-size: ${font.small};
  height: 100%;
  overflow-y: auto;


  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar {
    width: ${space.xs};
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: ${space.xs};
    background-color: ${colour.blue};
  }
`

const WarriorWrapper = styled.div`
  padding: ${space.xs};
  display: grid;
  grid-template-columns: 40px 1fr;
  grid-template-rows: 1fr 20px;
`

const WarriorControls = styled.div`
  padding-left: ${space.s};
`

const TaskCountDisplay = styled.div`
  padding: ${space.xs};
  text-align: center;
`

class Warriors extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tasks: List()
    }

    PubSub.subscribe('TASK_COUNT', (msg, data) => {

      let newTasks = []

      data.forEach((item) => {
        newTasks = this.state.tasks.splice(item.warriorId, 1, item.taskCount)
      })

      this.setState({ tasks: newTasks })

    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe('TASK_COUNT')
  }

  render() {
    const { parseResults } = this.props
    return <WarriorContainer>
      {parseResults && parseResults.map((result, i) => {
        const taskCount = this.state.tasks.get(i)
        return <WarriorWrapper key={`${result.warrior}_${i}`}>
          <img src={`data:image/svg+xml;base64,${getIdenticonSvg(result.warrior, i)}`} />
          <WarriorControls>{result.metaData.name}</WarriorControls>
          <TaskCountDisplay>{taskCount ? taskCount : 0 }</TaskCountDisplay>
          <div></div>
        </WarriorWrapper>
      }
      )}
    </WarriorContainer>
  }
}

const getIdenticonSvg = (warrior, i) => {

  var sha = new jssha("SHA-512", "TEXT");

  sha.update(warrior)

  const hash = sha.getHash('HEX')

  const options = {
    size: 40,
    foreground: hexToRgbA(colour.warrior[i]),
    background: [0,0,0,0],
    margin: 0,
    format: 'svg'
  }

  return new Identicon(hash, options)
}

const hexToRgbA = (hex) => {

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return [r, g, b, 255]
}

Warriors.displayName = 'Warriors'

export default Warriors