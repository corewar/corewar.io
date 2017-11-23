import React from 'react'
import { corewar } from 'corewar';

const Cell = props => {
  let css = `cell-${props.data.colour}`;
  return <div className={`cell ${css}`}>
    {props.data && props.data.address} : {props.data.label}
  </div>
}

export default Cell;