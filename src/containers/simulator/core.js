import React from 'react'
import Cell from './cell';

const Core = props => {
  console.log(props.queue);
  return <div className="core">
    {props.queue && props.queue.map((cell, i) =>
      {
      console.log(cell);
      //const instruction = props.core.getAt(i);
      //console.log(instruction);
      return <Cell key={cell.address} cell={cell} />
    })}
  </div>
};

export default Core;