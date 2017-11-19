import React from 'react'
import { corewar } from "corewar";

const Cell = props => (
  <div className="cell">{props.instruction && corewar.instructionSerialiser.serialise(props.instruction)}</div>
)

export default Cell;