import React from 'react'

const SpeedControl = ({ processRate, processRates, handleClick }) => (
  <div className="simulatorControl">
    <span className="tooltip">set speed</span>
    <div className="optionDropdown">
      <span>{`${processRate} x`}</span>
      <ul>
        {processRates && processRates.map(rate => (
          <li key={rate} onClick={() => handleClick(rate)}>{rate} x</li>
        ))}
      </ul>
    </div>
  </div>
)

export default SpeedControl