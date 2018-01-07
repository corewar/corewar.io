import React from 'react'

const SpeedControl = ({ processRate, processRates, handleClick }) => (
  <div className="simulatorControl">
    <span className="tooltip">set speed</span>
    <div className="optionDropdown text">
      <span className="text">{`${processRate} x`}</span>
      <ul>
        {processRates && processRates.map(rate => (
          <li
            key={rate}
            className={rate === processRate ? `active` : ``}
            onClick={() => handleClick(rate)}>{rate} x</li>
        ))}
      </ul>
    </div>
  </div>
)

export default SpeedControl