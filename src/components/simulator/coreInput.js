import React, { Component } from 'react'
import * as PubSub from 'pubsub-js'
import FontAwesome from 'react-fontawesome'
import PropTypes from 'prop-types'
import { List } from 'immutable'

import './coreInput.css'

class CoreInput extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tasks: List()
    }

    PubSub.subscribe('TASK_COUNT', (msg, data) => {

      let newTasks = []

      data.forEach((item) => {
        newTasks = this.state.tasks.splice(data.warriorId, 1, data.taskCount)
      })

      this.setState({ tasks: newTasks })

    })
  }

  componentWillUnmount() {
    PubSub.unsubscribe('TASK_COUNT')
  }

  componentWillReceiveProps({ runProgress }) {
    if(runProgress === 0) {
      this.setState({ tasks: List() })
    }
  }

  render() {
    const { parseResults, removeWarrior } = this.props
    return <section id="coreInput">
      {
        parseResults && parseResults.map((result, i) => {
          const taskCount = this.state.tasks.get(i)
          //TODO: 8000 shoudln't be hardcoded
          const taskWidth = taskCount ? parseInt(taskCount / 8000 * 100 , 10) : 0
          return <div className="coreItem" key={`${result.metaData.name}_${i}`}>
              <div className={`coreItem_${i}`}></div>
              <span className={`itemName`}>{result.metaData.name}</span>
              <FontAwesome name='times' onClick={() => removeWarrior(i)}/>
              <section className={`taskCount`}>
                <div className={`inputItem coreItem_${i}`} style={{width: taskWidth + '%' }}>
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

CoreInput.PropTypes = {
  parseResult: PropTypes.arrayOf(
    PropTypes.shape({
      metaData: PropTypes.shape({
        name: PropTypes.string,
        author: PropTypes.string
      })
    })),
  removeWarrior: PropTypes.func
}

export default CoreInput

