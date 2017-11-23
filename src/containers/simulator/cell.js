import React from 'react'
import { corewar } from 'corewar';

const Cell = props => {

  let css = `cell-${props.data ? props.data : 'default'}`;
  let label = props.data ? props.data.label : '';
  let icon = props.data ? props.data.icon : '';
  let address = props.data ? props.data.address : '';

  return <div className={`cell ${css}`}>
    {label ? label : icon}
  </div>
}

export default Cell;