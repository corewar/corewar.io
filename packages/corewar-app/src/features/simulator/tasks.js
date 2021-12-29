import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import * as PubSub from 'pubsub-js'
import { getFileState } from '../files/reducer'
import { getSimulatorState } from './reducer'
import { replaceItem } from '../../services/array'
import SectionHeader from '../../app-chrome/section-header'

const getWidth = (tasks, maxTasks) => {
  if (!tasks) {
    return 1
  }
  return Math.floor((tasks / maxTasks) * 100)
}

const Tasks = () => {
  const { files } = useSelector(getFileState)
  const { maxTasks } = useSelector(getSimulatorState)

  const tasks = useRef([])

  useEffect(() => {
    PubSub.subscribe('CORE_INITIALISE', (msg, data) => {
      tasks.current = []
    })
    return function cleanup() {
      PubSub.unsubscribe('CORE_INITIALISE')
    }
  }, [])
  useEffect(() => {
    PubSub.subscribe('TASK_COUNT', (msg, data) => {
      let newTasks = tasks.current

      data.forEach(item => {
        newTasks = replaceItem(item.warriorId, newTasks, item.taskCount)
      })

      tasks.current = newTasks

      return function cleanup() {
        PubSub.unsubscribe('TASK_COUNT')
      }
    })
  }, [])

  return (
    <div className="flex flex-col my-2 h-24 p-2 flex-initial justify-start">
      <SectionHeader>Tasks</SectionHeader>
      {files
        .filter(
          file =>
            !file.data.hasErrors &&
            file.data.loaded &&
            file.tokens.filter(y => y.category === 'OPCODE').length > 0
        )
        .map((file, i) => (
          <div
            key={file.data.hash}
            className={`rounded my-1 h-${Math.round(16 / files.length)}`}
            style={{
              width: `${getWidth(tasks.current[i], maxTasks)}%`,
              backgroundColor: `${file.data.icon &&
                `rgba(${file.data.icon.foreground[0]},${file.data.icon.foreground[1]},${file.data.icon.foreground[2]},${file.data.icon.foreground[3]})`}`
            }}
          ></div>
        ))}
    </div>
  )
}

export default Tasks
