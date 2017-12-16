import React from 'react'
import FontAwesome from 'react-fontawesome'

import './coreInput.css'

const CoreInput = ({ parseResults, removeWarrior }) => (
  <section id="coreInput">
    {
      parseResults && parseResults.map((result, i) => (
        <div className="coreItem" key={`${result.metaData.name}_${i}`}>
          <span>{result.metaData.name}</span> <FontAwesome name='times' onClick={() => removeWarrior(i)}/>
          <div className={`inputItem coreItem_${i}`}></div>
        </div>
      ))
    }
  </section>
)

export default CoreInput
