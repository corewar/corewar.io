import React from 'react'
import FontAwesome from 'react-fontawesome'

import './warriorList.css'

const WarriorList = ({ parseResults, removeWarrior }) => (

  <section className="warriorList">
    <span className="sectionSubTitle">warriors</span>
    <ul>
    {
      parseResults && parseResults.map((result, i) => (
        <li key={`${result.metaData.name}_${i}`}>
          {result.metaData.name} <FontAwesome name='times' onClick={() => removeWarrior(i)}/>
        </li>
      ))
    }
    </ul>
  </section>

)

export default WarriorList