import React, { Component, Fragment } from 'react'
import * as PubSub from 'pubsub-js'
import { replaceItem } from '../../helpers/arrayHelpers'
import styled from 'styled-components'

import { colour, space, font } from '../common/theme'

const RoundStatusWrapper = styled.section`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid ${colour.lightbg};

  span {
    color: ${colour.lightgrey};
    font-size: ${font.small};
    text-align: center;
    padding: ${space.s};
    border-bottom: 1px solid ${colour.lightbg};
  }
`

const ProgressBar = styled.div`
  height: ${space.m};
  width: ${props => props.runProgress}%;
  background-color: ${colour.success};
`

const TaskCountDisplay = styled.div`
  margin-top: calc(${space.xs} + ${space.xs});
  padding: ${space.xs};
  text-align: center;
  color: ${colour.white};
  font-size: ${font.small};
`

const TaskBar = styled.div`
  margin: ${space.xs};
  height: ${space.m};
  ${props => `background-color: ${colour.warrior[props.warriorIndex]};`}
  ${props => `width: ${getWidth(props.tasks, props.maxTasks)}%;`}
`

class RoundProgress extends Component{

  constructor(props) {
    super(props)

    this.state = {
      tasks: []
    }

    PubSub.subscribe('CORE_INITIALISE', (msg, data) => {
      this.setState({ tasks: [] })
    })

    PubSub.subscribe('TASK_COUNT', (msg, data) => {

      let newTasks = this.state.tasks

      data.forEach((item) => {
        newTasks = replaceItem(item.warriorId, newTasks, item.taskCount)
      })

      this.setState({ tasks: newTasks })

    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe('TASK_COUNT')
    PubSub.unsubscribe('CORE_INITIALISE')
  }

  render() {
    const { warriors, runProgress, taskCount, maxTasks } = this.props
    return (<RoundStatusWrapper>
      <span>Round status</span>
      <ProgressBar runProgress={runProgress} />
      <span>Tasks</span>
      {warriors && warriors.map((warrior, i) => {
        const taskCount = this.state.tasks[i]
        return <Fragment key={`warrior_${i}`}>
          <TaskCountDisplay>{taskCount}</TaskCountDisplay>
          <TaskBar tasks={taskCount} maxTasks={maxTasks} warriorIndex={i}></TaskBar>
        </Fragment>
      })}
    </RoundStatusWrapper>)
  }
}

const getWidth = (tasks, maxTasks) => {

  if(!tasks) {
    return 0
  }

  return Math.floor(tasks / maxTasks * 100)
}

export default RoundProgress