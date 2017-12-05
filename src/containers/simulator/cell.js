import React, { Component } from 'react'
import './cell.css'

class Cell extends Component {

  shouldComponentUpdate(nextProps) {
    return (nextProps.data.colour !== this.props.data.colour || nextProps.data.label !== this.props.data.label);
  }

  render() {
    const { data } = this.props;
    let css = `cell-${data ? data.colour : 'default'}`;
    let label = data ? data.label : '';

    return <div className={`cell`}>
      <span className={`${css}`}>
        {label}
      </span>
    </div>
  }
}

export default Cell;