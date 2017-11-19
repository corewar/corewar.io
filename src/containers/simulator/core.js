import React from 'react'
import Cell from './cell';

const Core = props => (
  <div className="core">
    {props.core && props.core.instructions && props.core.instructions.map((cell, i) =>
    {
      const instruction = props.core.getAt(i);
      console.log(instruction);
      return <Cell key={instruction.address} instruction={instruction} />
    })}
  </div>
);

export default Core;