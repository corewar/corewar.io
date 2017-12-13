import React from 'react'
import FontAwesome from 'react-fontawesome'

import './coreInput.css'

const CoreInput = ({ parseResults, removeWarrior }) => (
  <section id="coreInput">
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

export default CoreInput
