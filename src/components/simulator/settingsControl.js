import React from 'react'
import FontAwesome from 'react-fontawesome'

const SettingsControl = ({ currentCoreOption, coreOptions, handleClick }) => (
  <div className="simulatorControl">
    <span className="tooltip">core settings</span>
    <div className="optionDropdown">
      <FontAwesome name="cog" size="2x" />
      <ul>
        {coreOptions && coreOptions.map(option => (
          <li key={option} className={option.id === currentCoreOption ? `active` : ``} onClick={() => handleClick(option.id)}>{option.name}</li>
        ))}
      </ul>
    </div>
  </div>
)

export default SettingsControl