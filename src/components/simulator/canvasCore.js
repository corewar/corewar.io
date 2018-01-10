import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as PubSub from 'pubsub-js'

const colourPalette = [
  '#EB5757',
  '#6FCF97',
  '#56CCF2',
  '#F2C94C',
  '#BB6BD9',
  '#BDBDBD',
]

class CanvasCore extends Component {

  constructor(props) {

    super(props)

    this.getCoreInstructions = props.getCoreInstructions

    this.messages = []

    PubSub.subscribe('CORE_ACCESS', (msg, data) => {
      this.messages = this.messages.concat(data)
    })

    PubSub.subscribe('RESET_CORE', (msg, data) => {
      this.messages = []
      this.init()
    })

    this.state = {
      height: 550,
      width: 550
    }

  }

  componentDidUpdate(prevProps) {
    // if we got a new set of core options and the coreSize changed we need to redraw
    // the grid with new cell sizes
    if(this.props.coreSize !== prevProps.coreSize) {
      this.cellSize = this.calculateCellSize()
      this.cellsWide = Math.floor(this.containerWidth / this.cellSize)
      this.cellsHigh = Math.floor(this.containerHeight / this.cellSize)
      this.renderGrid()
    }
  }

  init() {

    const width = this.canvasContainer.clientWidth - 10
    const height = this.canvasContainer.clientHeight - 10

    this.setState({
      width: width,
      height: height
    })

    this.containerWidth = width
    this.containerHeight = height

    this.cellSize = this.calculateCellSize()
    this.cellsWide = Math.floor(this.containerWidth / this.cellSize)
    this.cellsHigh = Math.floor(this.containerHeight / this.cellSize)

    this.renderGrid()

  }

  componentDidMount() {

    this.init()

    this.interactiveCanvas.addEventListener("click", e => this.canvasClick(e))

    window.requestAnimationFrame(() => this.renderMessages())

  }

  componentWillUnmount() {
    PubSub.unsubscribe('CORE_ACCESS')
    PubSub.unsubscribe('RESET_CORE')
  }

  renderGrid() {
    this.clearCanvas()

    this.fillGridArea()

    this.renderGridLines()

    this.greyOutExtraCells()
  }

  addressToScreenCoordinate(address) {

    var ix = address % this.cellsWide
    var iy = Math.floor(address / this.cellsWide)

    return {
        x: ix * this.cellSize,
        y: iy * this.cellSize
    }
  }

  renderMessages() {

    this.messages.forEach((data) => {
      this.renderCurrentTask(data)
      this.renderCell(data, '#f00')
    })

    this.messages = []

    window.requestAnimationFrame(() => this.renderMessages())
  }

  renderCurrentTask(data) {

    const coordinate = this.addressToScreenCoordinate(data.address)

    this.clearInteractiveCanvas()

    this.interactiveContext.fillStyle = '#ffffff'

    this.interactiveContext.fillRect(
      coordinate.x,
      coordinate.y,
      this.cellSize,
      this.cellSize)

  }

  screenCoordinateToAddress(point) {

    var x = Math.floor(point.x / this.cellSize)
    var y = Math.floor(point.y / this.cellSize)

    return y * this.cellsWide + x
  }

  getColour(warriorId) {
    return colourPalette[warriorId]
  }

  renderCell(event) {

    var coordinate = this.addressToScreenCoordinate(event.address)

    var warriorId = event.warriorId

    var colour = this.getColour(warriorId)
    this.coreContext.fillStyle = colour
    this.coreContext.strokeStyle = colour

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
            throw Error("Cannot render unknown CoreAccessType: " + event.accessType);
            return;
    }
  }

  renderExecute(coordinate) {

    this.coreContext.fillRect(
        coordinate.x,
        coordinate.y,
        this.cellSize,
        this.cellSize);
  }

  renderRead(coordinate) {

    var hSize = this.cellSize / 2
    var radius = this.cellSize / 8

    var centre = {
        x: coordinate.x + hSize,
        y: coordinate.y + hSize
    }

    this.coreContext.beginPath()
    this.coreContext.arc(centre.x, centre.y, radius, 0, 2 * Math.PI, false)
    this.coreContext.fill()
  }

  renderWrite(coordinate) {

    var x0 = coordinate.x;
    var y0 = coordinate.y;

    var x1 = x0 + this.cellSize;
    var y1 = y0 + this.cellSize;

    this.coreContext.beginPath();
    this.coreContext.moveTo(x0, y0);
    this.coreContext.lineTo(x1, y1);
    this.coreContext.moveTo(x0, y1);
    this.coreContext.lineTo(x1, y0);
    this.coreContext.stroke();
  }

  clearCanvas() {

    this.coreContext.setTransform(1, 0, 0, 1, 0, 0)
    this.coreContext.clearRect(0, 0, this.containerWidth, this.containerHeight)
    this.coreContext.setTransform(1, 0, 0, 1, 0.5, 0.5)

  }

  clearInteractiveCanvas() {

    this.interactiveContext.setTransform(1, 0, 0, 1, 0, 0)
    this.interactiveContext.clearRect(0, 0, this.containerWidth, this.containerHeight)
    this.interactiveContext.setTransform(1, 0, 0, 1, 0.5, 0.5)
  }

  fillGridArea() {

    var width = this.cellsWide * this.cellSize;
    var height = this.cellsHigh * this.cellSize;

    this.coreContext.fillStyle = "#100E14";
    this.coreContext.fillRect(0, 0, width, height);

  }

  calculateCellSize() {

    var area = this.containerWidth * this.containerHeight;
    var n = this.props.coreSize;

    var maxCellSize = Math.sqrt(area / n);
    var possibleCellSize = Math.floor(maxCellSize);

    while (!this.isValidCellSize(possibleCellSize)) {

        possibleCellSize--;
    }

    return possibleCellSize;
  }

  isValidCellSize(cellSize) {
    var cellsWide = Math.floor(this.containerWidth / cellSize);
    var cellsHigh = Math.floor(this.containerHeight / cellSize);

    return cellsWide * cellsHigh >= this.props.coreSize;
  }

  renderGridLines() {

    this.coreContext.beginPath()
    this.renderVerticalLines()
    this.renderHorizontalLines()

    this.coreContext.strokeStyle = "#666"
    this.coreContext.stroke()
  }

  renderHorizontalLines() {

    var gridWidth = this.cellsWide * this.cellSize;
    var gridHeight = this.cellsHigh * this.cellSize;

    for (var y = 0; y <= gridHeight; y += this.cellSize) {

        this.coreContext.moveTo(0, y);
        this.coreContext.lineTo(gridWidth, y);
    }
  }

  renderVerticalLines() {

    var gridWidth = this.cellsWide * this.cellSize;
    var gridHeight = this.cellsHigh * this.cellSize;

    for (var x = 0; x <= gridWidth; x += this.cellSize) {

        this.coreContext.moveTo(x, 0);
        this.coreContext.lineTo(x, gridHeight);
    }
  }

  greyOutExtraCells() {

    var cellsDrawn = this.cellsWide * this.cellsHigh
    var extraCellsDrawn = cellsDrawn - this.props.coreSize;

    if (extraCellsDrawn === 0) {
        return
    }

    var gridWidth = this.cellsWide * this.cellSize;
    var gridHeight = this.cellsHigh * this.cellSize;

    var maxX = gridWidth - this.cellSize;
    var maxY = gridHeight - this.cellSize;

    var x = maxX;
    var y = maxY;

    this.coreContext.fillStyle = "#100E14"

    while (extraCellsDrawn-- > 0) {

      this.coreContext.fillRect(x, y, this.cellSize, this.cellSize);

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

      var canvasX = (event.pageX - totalOffsetX) - 2;
      var canvasY = (event.pageY - totalOffsetY) - 2;

      return { x: canvasX, y: canvasY };
  }

  canvasClick(e) {

    if(!this.props.isInitialised) {
      return;
    }

    this.clearInteractiveCanvas()

    const point = this.getRelativeCoordinates(e)

    const address = this.screenCoordinateToAddress(point)

    this.highlightClickPoint(point, address)

    this.getCoreInstructions(address)
  }

  highlightClickPoint(point, address) {

    const cell = this.addressToScreenCoordinate(address)

    const { x, y } = cell

    this.interactiveContext.beginPath()

    this.interactiveContext.strokeStyle = '#fff'

    this.interactiveContext.moveTo(x, y)

    this.interactiveContext.lineTo(x + this.cellSize, y)
    this.interactiveContext.lineTo(x + this.cellSize, y + this.cellSize)
    this.interactiveContext.lineTo(x, y + this.cellSize)
    this.interactiveContext.lineTo(x, y)

    this.interactiveContext.stroke()

  }

  render() {

    return <div id="canvasContainer"
      ref={(canvasContainer) => {
        if(canvasContainer == null) { return }
        this.canvasContainer = canvasContainer
    }}>
      <canvas
        ref={(coreCanvasEl) => {
          if(coreCanvasEl == null) { return }
          this.coreContext = coreCanvasEl.getContext("2d")
          this.coreCanvas = coreCanvasEl }}
        height={this.state.height}
        width={this.state.width}
        ></canvas>
      <canvas
        ref={(interactiveCanvasEl) => {
          if(interactiveCanvasEl == null) { return }
          this.interactiveContext = interactiveCanvasEl.getContext("2d")
          this.interactiveCanvas = interactiveCanvasEl }}
        height={this.state.height}
        width={this.state.width}
        ></canvas>
      </div>
  }

}

CanvasCore.PropTypes = {
  coreSize: PropTypes.number.isRequired,
  getCoreInstructions: PropTypes.func
}

export default CanvasCore