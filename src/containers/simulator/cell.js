import React from 'react'
import { corewar } from 'corewar';

const Cell = props => {
  let css = '';
  return <div className={`cell ${css}`}>{props && props.data.address} : {corewar.instructionSerialiser.serialise(props.data)}</div>
}

export default Cell;