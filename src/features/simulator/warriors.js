import React, { Component } from 'react'
import styled from 'styled-components'
import { List } from 'immutable'
import * as PubSub from 'pubsub-js'
import Octicon from 'react-octicon'
import { getIdenticon } from '../common/identicon'

import { colour, space, font } from '../common/theme'

const WarriorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-column-gap: ${space.s};
  grid-template-rows: repeat(2, 1fr);
  color: ${colour.white};
  font-size: ${font.small};
  height: 100%;
  overflow-y: auto;
  padding-top: ${space.s};


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

  &:hover {
    cursor: pointer;
  }
`

const WarriorControls = styled.div`
  padding-left: ${space.s};
  display: flex;
  justify-content: space-between;

  span:hover {
    cursor: pointer;
  }

  .octicon {
    color: ${colour.grey};
  }
`

const TaskCountDisplay = styled.div`
  margin-top: calc(${space.xs} + ${space.xs});
  padding: ${space.xs};
  text-align: center;
`

const TaskBar = styled.div`
  margin: ${space.xs};
  height: calc(100% - ${space.xs} - ${space.xs});
  ${props => `background-color: ${colour.warrior[props.warriorIndex]};`}
  ${props => `width: ${getWidth(props.tasks, props.maxTasks)}%;`}
`

const getWidth = (tasks, maxTasks) => {
  if(tasks === 0) {
    return 0
  }
  return Math.floor(tasks / maxTasks * 100)
}

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
    const { files, maxTasks, removeWarrior, loadWarrior } = this.props
    return <WarriorGrid>
      {files && files.map((file, i) => {
        const taskCount = this.state.tasks.get(i)
        return <WarriorWrapper key={`${file.guid}_${i}`}>
          <img
            src={`data:image/svg+xml;base64,${getIdenticon(file.compiled, i)}`} alt={`${file.name} avatar`}
            onClick={() => loadWarrior(file.guid)} />
          <WarriorControls>{file.name}<Octicon name="trashcan" onClick={() => removeWarrior(i)} /></WarriorControls>
          <TaskCountDisplay>{taskCount ? taskCount : 0 }</TaskCountDisplay>
          <TaskBar tasks={taskCount} maxTasks={maxTasks} warriorIndex={i}></TaskBar>
        </WarriorWrapper>
      }
      )}
    </WarriorGrid>
  }
}

Warriors.displayName = 'Warriors'

export default Warriors