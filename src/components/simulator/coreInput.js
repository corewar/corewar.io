import React, { Component } from 'react'
import * as PubSub from 'pubsub-js'
import FontAwesome from 'react-fontawesome'
import { List } from 'immutable'

import './coreInput.css'

class CoreInput extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tasks: List()
    }

    PubSub.subscribe('TASK_COUNT', (msg, data) => {
      const newTasks = this.state.tasks.splice(data.warriorId, 1, data.taskCount)
      this.setState({ tasks: newTasks })
    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe('TASK_COUNT')
  }

  render() {
    const { parseResults, removeWarrior } = this.props
    return <section id="coreInput">
      {
        parseResults && parseResults.map((result, i) => {
          const taskCount = this.state.tasks.get(i)
          return <div className="coreItem" key={`${result.metaData.name}_${i}`}>
              <div className={`coreItem_${i}`}></div>
              <span className={`itemName`}>{result.metaData.name}</span>
              <FontAwesome name='times' onClick={() => removeWarrior(i)}/>
              <section className={`taskCount`}>
                <div className={`inputItem coreItem_${i}`} style={{width: parseInt(taskCount / 8000 * 100 , 10) + '%' }}>
                </div>
                <span>{taskCount && taskCount}</span>
              </section>
            </div>
          }
        )
      }
    </section>
  }
}
export default CoreInput

