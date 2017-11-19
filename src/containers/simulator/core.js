
import React from 'react'
import Cell from './cell';

const Core = props => (
  <div className="core">
    {props.core && props.core.map(cell => <Cell addressInfo={cell.addressInfo} />)}
  </div>
);

export default Core;