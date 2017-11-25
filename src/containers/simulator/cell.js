import React from 'react'
import { corewar } from 'corewar';

const Cell = props => {

  let css = `cell-${props.data ? props.data.colour : 'default'}`;
  let label = props.data ? props.data.label : '';
  let icon = props.data ? props.data.icon : '';
  let address = props.data ? props.data.address : '';

  return <div className={`cell`}>
    <span className={`${css}`}>
      {label ? label : icon}
    </span>
  </div>
}

export default Cell;