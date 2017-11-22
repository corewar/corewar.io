import React from 'react'

const Cell = props => {

  let css = '';

  switch(props.cell.accessType) {
    case 0:
    css = 'read';
    case 1:
    css = 'write';
    case 2:
    css = 'execute'
  }

  console.log(props);
  return <div className={`cell ${css}`}>{props && props.cell.address}</div>
}

export default Cell;