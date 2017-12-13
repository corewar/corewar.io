import React from 'react'
import FontAwesome from 'react-fontawesome'

import './coreInput.css'

const CoreInput = ({ parseResults, removeWarrior }) => (
  <section id="coreInput">
    {
      parseResults && parseResults.map((result, i) => (
        <div className="coreItem" key={`${result.metaData.name}_${i}`}>
          {result.metaData.name} <FontAwesome name='times' onClick={() => removeWarrior(i)}/>
        </div>
      ))
    }
  </section>
)

export default CoreInput
