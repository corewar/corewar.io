import React, { useState, useEffect } from 'react'

const Core = () => {
  const [messages, setMessages] = useState([])
  const [sprites, setSprites] = useState([])
  const [nextExecutionAddress, setNextExecutionAddress] = useState(null)
  const [hasLoaded, setHasLoaded] = useState(false)
  const [inspectionAddress, setInspectionAddress] = useState(null)
  const [cellSprite, setCellSprite] = useState(null)
  const [nextExecutionSprite, setNextExecutionSprite] = useState(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  useEffect(() => {
    PubSub.subscribe('CORE_ACCESS', (msg, data) => {
      setMessages(messages.concat(data))
    })
    return function cleanup() {
      PubSub.unsubscribe('CORE_ACCESS')
    }
  })

  useEffect(() => {
    PubSub.subscribe('RESET_CORE', (msg, data) => {
      setMessages([])
      init()
    })
    return function cleanup() {
      PubSub.unsubscribe('RESET_CORE')
    }
  })

  useEffect(() => {
    PubSub.subscribe('NEXT_EXECUTION', (msg, data) => {
      setNextExecutionAddress(data.address)
    })
    return function cleanup() {
      PubSub.unsubscribe('NEXT_EXECUTION')
    }
  })

  useEffect(() => {
    init()

    this.interactiveCanvas.addEventListener('click', e => this.canvasClick(e))

    window.addEventListener(
      'resize',
      throttle(() => init(), 200)
    )

    window.requestAnimationFrame(() => {
      renderMessages()
      renderNextExecution()
      highlightClickPoint()
    })
  })

  const init = () => {
    calculateCoreDimensions()

    buildSprites()

    renderGrid()

    republish()
  }

  const calculateCoreDimensions = () => {
    const width = this.canvasContainer.clientWidth
    const height = this.canvasContainer.clientHeight

    // we get a brief period of zero values when switching display mode, during unmount/mount
    if (width === 0 && height === 0) {
      return
    }

    setDimensions({
      width: width,
      height: height
    })

    this.containerWidth = width
    this.containerHeight = height

    this.cellSize = calculateCellSize()
    this.cellsWide = Math.floor(this.containerWidth / this.cellSize)
    this.cellsHigh = Math.floor(this.containerHeight / this.cellSize)
  }

  const buildSprites = () => {
    this.sprites = {}
    setCellSprite(prerenderCell())
    setNextExecutionSprite(prerenderExecute('#fff'))

    colour.warrior.forEach(c => {
      const colouredSprites = []
      colouredSprites.push(this.prerenderRead(c.hex))
      colouredSprites.push(this.prerenderWrite(c.hex))
      colouredSprites.push(this.prerenderExecute(c.hex))

      sprites[c.hex] = colouredSprites
    })
  }

  const buildSprite = () => {
    const canvas = document.createElement('canvas')
    canvas.width = this.cellSize
    canvas.height = this.cellSize

    const context = canvas.getContext('2d')
    context.fillStyle = colour.defaultbg
    context.fillRect(0, 0, canvas.width, canvas.height)

    return { canvas, context }
  }

  const prerenderCell = () => {
    const sprite = buildSprite()

    const context = sprite.context
    context.strokeStyle = colour.grey
    context.beginPath()
    context.moveTo(0, this.cellSize)
    context.lineTo(0, 0)
    context.lineTo(this.cellSize, 0)
    context.stroke()

    return sprite
  }

  const prerenderRead = colour => {
    const sprite = prerenderCell()

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

  const prerenderWrite = colour => {
    const sprite = prerenderCell()

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

  const prerenderExecute = colour => {
    const sprite = prerenderCell()

    const context = sprite.context

    context.fillStyle = colour
    context.strokeStyle = colour
    context.fillRect(1, 1, this.cellSize - 1, this.cellSize - 1)

    return sprite
  }

  const renderGrid = () => {
    this.coreContext.clearRect(0, 0, this.containerWidth, this.containerHeight)

    let i = 0
    for (let y = 0; y < this.cellsHigh * this.cellSize; y += this.cellSize) {
      for (let x = 0; x < this.cellsWide * this.cellSize; x += this.cellSize) {
        this.coreContext.drawImage(this.cellSprite.canvas, x, y)
        if (++i >= this.props.coreSize) {
          return
        }
      }
    }
  }

  const addressToScreenCoordinate = address => {
    const ix = address % this.cellsWide
    const iy = Math.floor(address / this.cellsWide)

    return {
      x: ix * this.cellSize,
      y: iy * this.cellSize
    }
  }

  const renderMessages = () => {
    this.messages.forEach(data => {
      renderCell(data)
    })

    setMessages([])

    window.requestAnimationFrame(() => {
      renderMessages()
      renderNextExecution()
      highlightClickPoint()
    })
  }

  const renderNextExecution = () => {
    this.interactiveContext.clearRect(0, 0, dimensions.width, dimensions.height)

    if (!nextExecutionAddress) {
      return
    }

    const coordinate = addressToScreenCoordinate(nextExecutionAddress)
    this.interactiveContext.drawImage(this.nextExecutionSprite.canvas, coordinate.x, coordinate.y)
  }

  const screenCoordinateToAddress = point => {
    const x = Math.floor(point.x / this.cellSize)
    const y = Math.floor(point.y / this.cellSize)

    return y * this.cellsWide + x
  }

  const getAccessTypeIndex = accessType => {
    switch (accessType) {
      case 'READ':
        return 0
      case 'WRITE':
        return 1
      case 'EXECUTE':
        return 2
      default:
        throw Error(`Unexpected access type ${accessType}`)
    }
  }

  const renderCell = event => {
    const coordinate = addressToScreenCoordinate(event.address)

    const sprite = sprites[event.warriorData.colour.hex][getAccessTypeIndex(event.accessType)]
    this.coreContext.drawImage(sprite.canvas, coordinate.x, coordinate.y)
  }

  const calculateCellSize = () => {
    const area = this.containerWidth * this.containerHeight
    const n = this.props.coreSize

    const maxCellSize = Math.sqrt(area / n)
    let possibleCellSize = Math.floor(maxCellSize)

    while (!isValidCellSize(possibleCellSize)) {
      possibleCellSize--
    }

    return possibleCellSize
  }

  const isValidCellSize = cellSize => {
    const cellsWide = Math.floor(this.containerWidth / cellSize)
    const cellsHigh = Math.floor(this.containerHeight / cellSize)

    return cellsWide * cellsHigh >= this.props.coreSize
  }

  const getRelativeCoordinates = event => {
    let totalOffsetX = 0
    let totalOffsetY = 0
    let currentElement = event.target

    do {
      totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft
      totalOffsetY += currentElement.offsetTop - currentElement.scrollTop
    } while ((currentElement = currentElement.offsetParent))

    const canvasX = event.pageX - totalOffsetX - 2
    const canvasY = event.pageY - totalOffsetY - 2

    return { x: canvasX, y: canvasY }
  }

  const canvasClick = e => {
    if (!this.props.isInitialised) {
      return
    }

    const point = getRelativeCoordinates(e)

    const address = screenCoordinateToAddress(point)

    setInspectionAddress(address)

    getCoreInstructions(address)
  }

  const highlightClickPoint = () => {
    const address = inspectionAddress

    const cell = addressToScreenCoordinate(address)

    const { x, y } = cell

    this.interactiveContext.strokeStyle = '#ffffff'

    this.interactiveContext.strokeRect(x, y, this.cellSize, this.cellSize)
  }

  return (
    <div className="max-w-core max-h-core min-w-96 min-h-96 w-full h-full lg:w-core lg:h-core bg-gray-500 rounded flex-none"></div>
  )
}

export default Core
