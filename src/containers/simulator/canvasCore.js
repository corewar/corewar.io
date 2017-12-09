import React, { Component } from 'react'
import * as PubSub from 'pubsub-js';


class CanvasCore extends React.Component{

  constructor(props) {

    super(props);

    this.coreSize = props.coreSize;
    this.cellSize = this.calculateCellSize();
    this.cellsWide = Math.floor(this.props.width / this.cellSize);
    this.cellsHigh = Math.floor(this.props.height / this.cellSize);
    this.messages = [];

    //this.canvas.addEventListener("click", (e) => { this.canvasClick(e); });

    PubSub.subscribe('CORE_ACCESS', (msg, data) => {
      this.messages.push(data);
    });
  }

  componentDidMount() {

    this.renderGrid();

    window.requestAnimationFrame(() => this.renderMessages());

  }

  componentWillUnmount() {
    PubSub.unsubscribe('CORE_ACCESS');
  }

  renderGrid() {
    this.clearCanvas();

    this.fillGridArea();

    this.renderGridLines();

    this.greyOutExtraCells();
  }

  addressToScreenCoordinate(address) {

    var ix = address % this.cellsWide;
    var iy = Math.floor(address / this.cellsWide);

    return {
        x: ix * this.cellSize,
        y: iy * this.cellSize
    };
  }

  renderMessages() {

    this.messages.forEach((data) => {
      this.renderCell(data, '#f00')
    })

    this.messages = [];

    if(this.props.runProgress < 100) {
      window.requestAnimationFrame(() => this.renderMessages());
    }

  }

  screenCoordinateToAddress(point) {

    var x = Math.floor(point.x / this.cellSize);
    var y = Math.floor(point.y / this.cellSize);

    return y * this.cellsWide + x;
  }

  getColour(warriorId) {
    switch(warriorId) {
      case 0:
        return '#f00';
      case 1:
        return '#00f';
      default:
        return '#0f0';
    }
  }

  renderCell(event) {

    var coordinate = this.addressToScreenCoordinate(event.address);

    var warriorId = event.warriorId;

    var colour = this.getColour(warriorId);

    //TODO colour for each process
    this.context.fillStyle = colour;
    this.context.strokeStyle = colour;

    switch (event.accessType) {
        case 0:
            this.renderRead(coordinate);
            break;
        case 1:
            this.renderWrite(coordinate);
            break;
        case 2:
            this.renderExecute(coordinate);
            break;
        default:
            //throw Error("Cannot render unknown CoreAccessType: " + event.accessType);
            return;
    }
  }

  renderExecute(coordinate) {

    this.context.fillRect(
        coordinate.x,
        coordinate.y,
        this.cellSize,
        this.cellSize);
  }

  renderRead(coordinate) {

    var hSize = this.cellSize / 2;
    var radius = this.cellSize / 8;

    var centre = {
        x: coordinate.x + hSize,
        y: coordinate.y + hSize
    };

    this.context.beginPath();
    this.context.arc(centre.x, centre.y, radius, 0, 2 * Math.PI, false);
    this.context.fill();
    //this.context.stroke();
  }

  renderWrite(coordinate) {

    var x0 = coordinate.x;
    var y0 = coordinate.y;

    var x1 = x0 + this.cellSize;
    var y1 = y0 + this.cellSize;

    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(x1, y1);
    this.context.moveTo(x0, y1);
    this.context.lineTo(x1, y0);
    this.context.stroke();
  }

  clearCanvas() {

    this.context.setTransform(1, 0, 0, 1, 0, 0);
    this.context.clearRect(0, 0, this.props.width, this.props.height);
    this.context.setTransform(1, 0, 0, 1, 0.5, 0.5);
  }

  fillGridArea() {

    var width = this.cellsWide * this.cellSize;
    var height = this.cellsHigh * this.cellSize;

    this.context.fillStyle = "#100E14";
    this.context.fillRect(0, 0, width, height);
  }

  calculateCellSize() {

    var area = this.props.width * this.props.height;
    var n = this.coreSize;

    var maxCellSize = Math.sqrt(area / n);
    var possibleCellSize = Math.floor(maxCellSize);

    while (!this.isValidCellSize(possibleCellSize)) {

        possibleCellSize--;
    }

    return possibleCellSize;
  }

  isValidCellSize(cellSize) {
    var cellsWide = Math.floor(this.props.width / cellSize);
    var cellsHigh = Math.floor(this.props.height / cellSize);

    return cellsWide * cellsHigh >= this.coreSize;
  }

  renderGridLines() {

    this.context.beginPath();
    this.renderVerticalLines();
    this.renderHorizontalLines();

    this.context.strokeStyle = "#666";
    this.context.stroke();
  }

  renderHorizontalLines() {

    var gridWidth = this.cellsWide * this.cellSize;
    var gridHeight = this.cellsHigh * this.cellSize;

    for (var y = 0; y <= gridHeight; y += this.cellSize) {

        this.context.moveTo(0, y);
        this.context.lineTo(gridWidth, y);
    }
  }

  renderVerticalLines() {

    var gridWidth = this.cellsWide * this.cellSize;
    var gridHeight = this.cellsHigh * this.cellSize;

    for (var x = 0; x <= gridWidth; x += this.cellSize) {

        this.context.moveTo(x, 0);
        this.context.lineTo(x, gridHeight);
    }
  }

  greyOutExtraCells() {

    var cellsDrawn = this.cellsWide * this.cellsHigh;
    var extraCellsDrawn = cellsDrawn - this.coreSize;

    if (extraCellsDrawn === 0) {
        return;
    }

    var gridWidth = this.cellsWide * this.cellSize;
    var gridHeight = this.cellsHigh * this.cellSize;

    var maxX = gridWidth - this.cellSize;
    var maxY = gridHeight - this.cellSize;

    var x = maxX;
    var y = maxY;

    this.context.fillStyle = "#100E14";
    while (extraCellsDrawn-- > 0) {

      this.context.fillRect(x, y, this.cellSize, this.cellSize);

      x -= this.cellSize;

      if (x < 0) {
          x = maxX;
          y -= this.cellSize;
      }
    }
  }

  getRelativeCoordinates(event) {

      var totalOffsetX = 0;
      var totalOffsetY = 0;
      var currentElement = event.target;

      do {
          totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
          totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
      }
      while (currentElement = currentElement.offsetParent)

      var canvasX = event.pageX - totalOffsetX;
      var canvasY = event.pageY - totalOffsetY;

      return { x: canvasX, y: canvasY };
  }

  render() {

    return <canvas
      ref={(canvasEl) => {
        if(canvasEl == null) {
          return;
        }
        this.context = canvasEl.getContext("2d");
        this.canvas = canvasEl; }}
      width={this.props.width}
      height={this.props.height}></canvas>
  }

}

export default CanvasCore;