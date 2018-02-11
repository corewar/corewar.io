import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as PubSub from 'pubsub-js'

import { colour } from '../common/theme'

class CanvasCore extends Component {

  constructor(props) {

    super(props)

    this.getCoreInstructions = props.getCoreInstructions
    this.reset = props.init
    this.republish = props.republish

    this.messages = []
    this.lastCoordinates = null
    this.hasLoaded = false

    this.cellSprite = null;
    this.sprites = []

    this.state = {
      height: 0,
      width: 0
    }

    // oddly needs to happen here as unmount can happen AFTER a new instance has mounted :s
    PubSub.unsubscribe('CORE_ACCESS')
    PubSub.unsubscribe('RESET_CORE')

    PubSub.subscribe('CORE_ACCESS', (msg, data) => {
      this.messages = this.messages.concat(data)
    })

    PubSub.subscribe('RESET_CORE', (msg, data) => {
      this.messages = []
      this.init()
    })

  }

  init() {

    this.calculateCoreDimensions()

    this.buildSprites()

    this.renderGrid()

    this.republish()

  }

  calculateCoreDimensions() {
    const width = this.canvasContainer.clientWidth
    const height = this.canvasContainer.clientHeight

    // we get a brief period of zero values when switching display mode, during unmount/mount
    if (width === 0 && height === 0) {
      return
    }

    this.setState({
      width: width,
      height: height
    })

    this.containerWidth = width
    this.containerHeight = height

    this.cellSize = this.calculateCellSize()
    this.cellsWide = Math.floor(this.containerWidth / this.cellSize)
    this.cellsHigh = Math.floor(this.containerHeight / this.cellSize)
  }

  componentDidMount() {

    this.init()

    this.interactiveCanvas.addEventListener("click", e => this.canvasClick(e))

    window.addEventListener('resize', () => this.redraw())

    window.requestAnimationFrame(() => this.renderMessages())

  }

  componentDidUpdate(prevProps) {
    // if we got a new set of core options and the coreSize changed we need to redraw
    // the grid with new cell sizes
    if (this.props.coreSize !== prevProps.coreSize || !this.hasLoaded) {
      this.hasLoaded = true
      this.init()
    }
  }

  redraw() {
    this.init()
  }

  buildSprites() {

    this.sprites = [];
    this.cellSprite = this.prerenderCell()

    colour.warrior.forEach(c => {

      const sprites = []
      sprites.push(this.prerenderRead(c))
      sprites.push(this.prerenderWrite(c))
      sprites.push(this.prerenderExecute(c))

      this.sprites.push(sprites)
    })
  }

  buildSprite() {

    const canvas = document.createElement('canvas')
    canvas.width = this.cellSize
    canvas.height = this.cellSize

    const context = canvas.getContext('2d')
    context.fillStyle = colour.defaultbg
    context.fillRect(0, 0, canvas.width, canvas.height)

    return { canvas, context }
  }

  prerenderCell() {

    const sprite = this.buildSprite()

    const context = sprite.context
    context.strokeStyle = colour.grey
    context.beginPath()
    context.moveTo(0, this.cellSize)
    context.lineTo(0, 0)
    context.lineTo(this.cellSize, 0)
    context.stroke()

    return sprite;
  }

  prerenderRead(colour) {

    const sprite = this.prerenderCell()

    const hSize = (this.cellSize - 1) / 2
    const radius = (this.cellSize - 1) / 8

    const context = sprite.context

    context.fillStyle = colour
    context.strokeStyle = colour

    context.beginPath()
    context.arc(1 + hSize, 1 + hSize, radius, 0, 2 * Math.PI, false)
    context.fill()

    return sprite
  }

  prerenderWrite(colour) {

    const sprite = this.prerenderCell()

    const x0 = 1
    const y0 = 1

    const x1 = this.cellSize
    const y1 = this.cellSize

    const context = sprite.context

    context.fillStyle = colour
    context.strokeStyle = colour

    context.beginPath()
    context.moveTo(x0, y0)
    context.lineTo(x1, y1)
    context.moveTo(x0, y1)
    context.lineTo(x1, y0)
    context.stroke()

    return sprite
  }

  prerenderExecute(colour) {

    const sprite = this.prerenderCell()

    const context = sprite.context

    context.fillStyle = colour
    context.strokeStyle = colour
    context.fillRect(1, 1, this.cellSize - 1, this.cellSize - 1)

    //TODO current task rendering needs redoing anyway so removing for now...
    //this.renderCurrentTask(coordinate)

    return sprite
  }

  renderGrid() {

    let i = 0;
    for (let y = 0; y < this.cellsHigh * this.cellSize; y += this.cellSize) {
      for (let x = 0; x < this.cellsWide * this.cellSize; x += this.cellSize) {
        this.coreContext.drawImage(this.cellSprite.canvas, x, y)
        if (++i >= this.props.coreSize) {
          return;
        }
      }
    }
  }

  addressToScreenCoordinate(address) {

    const ix = address % this.cellsWide
    const iy = Math.floor(address / this.cellsWide)

    return {
      x: ix * this.cellSize,
      y: iy * this.cellSize
    }
  }

  renderMessages() {

    this.messages.forEach((data) => {
      this.renderCell(data)
    })

    this.messages = []

    window.requestAnimationFrame(() => this.renderMessages())
  }

  renderCurrentTask(coordinate) {

    if (this.lastCoordinates) {

      this.interactiveContext.clearRect(
        this.lastCoordinates.x,
        this.lastCoordinates.y,
        this.lastCoordinates.wh,
        this.lastCoordinates.wh)
    }

    this.interactiveContext.fillStyle = colour.white

    this.interactiveContext.fillRect(
      coordinate.x,
      coordinate.y,
      this.cellSize,
      this.cellSize)

    this.lastCoordinates = {
      x: coordinate.x,
      y: coordinate.y - 1,
      wh: this.cellSize + 2
    }

  }

  screenCoordinateToAddress(point) {

    const x = Math.floor(point.x / this.cellSize)
    const y = Math.floor(point.y / this.cellSize)

    return y * this.cellsWide + x
  }

  getColour(warriorId) {
    return colour.warrior[warriorId]
  }

  renderCell(event) {

    const coordinate = this.addressToScreenCoordinate(event.address)

    const warriorId = event.warriorId

    const sprite = this.sprites[warriorId][event.accessType]
    this.coreContext.drawImage(sprite.canvas, coordinate.x, coordinate.y)
  }

  calculateCellSize() {

    const area = this.containerWidth * this.containerHeight
    const n = this.props.coreSize

    const maxCellSize = Math.sqrt(area / n)
    let possibleCellSize = Math.floor(maxCellSize)

    while (!this.isValidCellSize(possibleCellSize)) {

      possibleCellSize--
    }

    return possibleCellSize
  }

  isValidCellSize(cellSize) {
    const cellsWide = Math.floor(this.containerWidth / cellSize)
    const cellsHigh = Math.floor(this.containerHeight / cellSize)

    return cellsWide * cellsHigh >= this.props.coreSize
  }

  getRelativeCoordinates(event) {

    let totalOffsetX = 0
    let totalOffsetY = 0
    let currentElement = event.target

    do {
      totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft
      totalOffsetY += currentElement.offsetTop - currentElement.scrollTop
    }
    while (currentElement = currentElement.offsetParent)

    const canvasX = (event.pageX - totalOffsetX) - 2
    const canvasY = (event.pageY - totalOffsetY) - 2

    return { x: canvasX, y: canvasY }
  }

  canvasClick(e) {

    if (!this.props.isInitialised) {
      return
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

    //this.interactiveContext.beginPath()

    this.interactiveContext.strokeStyle = '#ffffff'

    this.interactiveContext.strokeRect(x, y, this.cellSize, this.cellSize)

    // this.interactiveContext.moveTo(x, y)

    // this.interactiveContext.lineTo(x + this.cellSize, y)
    // this.interactiveContext.lineTo(x + this.cellSize, y + this.cellSize)
    // this.interactiveContext.lineTo(x, y + this.cellSize)
    // this.interactiveContext.lineTo(x, y)

    //this.interactiveContext.stroke()

  }

  render() {

    return <div id="canvasContainer"
      ref={(canvasContainer) => {
        if (canvasContainer == null) { return }
        this.canvasContainer = canvasContainer
      }}>
      <canvas
        ref={(coreCanvasEl) => {
          if (coreCanvasEl == null) { return }
          this.coreContext = coreCanvasEl.getContext("2d")
          this.coreCanvas = coreCanvasEl
        }}
        height={this.state.height}
        width={this.state.width}
      ></canvas>
      <canvas
        ref={(interactiveCanvasEl) => {
          if (interactiveCanvasEl == null) { return }
          this.interactiveContext = interactiveCanvasEl.getContext("2d")
          this.interactiveCanvas = interactiveCanvasEl
        }}
        height={this.state.height}
        width={this.state.width}
      ></canvas>
    </div>
  }

}

CanvasCore.PropTypes = {
  coreSize: PropTypes.number.isRequired,
  getCoreInstructions: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  republish: PropTypes.func.isRequired
}

export default CanvasCore