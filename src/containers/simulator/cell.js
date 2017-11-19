import React from 'react'


const Cell = props => (
  <div className="cell" key={Math.random()}>{props.addressInfo && props.addressInfo.cmd}</div>
)

export default Cell;