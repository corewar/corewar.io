import React from 'react'
import { corewar } from 'corewar';

const Cell = props => {

  let css = '';

  // switch(props.cell.accessType) {
  //   case 0:
  //   css = 'read';
  //   case 1:
  //   css = 'write';
  //   case 2:
  //   css = 'execute'
  // }

  console.log(props);
  return <div className={`cell ${css}`}>{props && props.data.address} : {corewar.instructionSerialiser.serialise(props.data)}</div>
}

export default Cell;