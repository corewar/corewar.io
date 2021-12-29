import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as PubSub from 'pubsub-js'
import throttle from '../../services/throttle'
import { setCoreInstructions, republish } from './actions'
import { getFileState } from '../files/reducer'
import { getSimulatorState } from './reducer'

const Core = () => {
  const dispatch = useDispatch()
  const { colours } = useSelector(getFileState)
  const { coreSize, isInitialised } = useSelector(getSimulatorState)

  const [nextExecutionAddress, setNextExecutionAddress] = useState(null)

  const coreContext = useRef(null)
  const interactiveContext = useRef(null)
  const coreCanvasEl = useRef(null)
  const interactiveCanvasEl = useRef(null)
  const canvasContainer = useRef(null)

  const containerWidth = useRef(null)
  const containerHeight = useRef(null)

  const cellSize = useRef(null)
  const cellsWide = useRef(null)
  const cellsHigh = useRef(null)

  const cellSprite = useRef(null)
  const endRowCellSprite = useRef(null)

  const messages = useRef([])
  const gridRendered = useRef([])

  const sprites = useRef([])
  const nextExecutionSprite = useRef(null)
  const inspectionAddress = useRef(null)

  useEffect(() => {
    PubSub.subscribe('CORE_ACCESS', (msg, data) => {
      messages.current = messages.current.concat(data)
    })
    return function cleanup() {
      PubSub.unsubscribe('CORE_ACCESS')
    }
  }, [])

  useEffect(() => {
    PubSub.subscribe('RESET_CORE', (msg, data) => {
      messages.current = []
      init()
    })
    return function cleanup() {
      PubSub.unsubscribe('RESET_CORE')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    PubSub.subscribe('NEXT_EXECUTION', (msg, data) => {
      setNextExecutionAddress(data.address)
    })
    return function cleanup() {
      PubSub.unsubscribe('NEXT_EXECUTION')
    }
  }, [])

  useLayoutEffect(() => {
    coreContext.current = coreCanvasEl.current.getContext('2d')
    interactiveContext.current = interactiveCanvasEl.current.getContext('2d')
  }, [])

  useEffect(() => {
    interactiveCanvasEl.current.addEventListener('click', e => canvasClick(e))

    window.addEventListener(
      'resize',
      throttle(() => init(), 200)
    )
  }, [isInitialised]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    calculateCoreDimensions()
    renderGrid()
  })

  const init = () => {
    gridRendered.current = false
    republish()
    renderMessages()
  }

  const calculateCoreDimensions = () => {
    const width = canvasContainer.current.clientWidth
    const height = canvasContainer.current.clientHeight

    // we get a brief period of zero values when switching display mode, during unmount/mount
    if (width === 0 && height === 0) {
      return
    }

    containerWidth.current = width
    containerHeight.current = height

    cellSize.current = calculateCellSize()
    cellsWide.current = Math.floor(containerWidth.current / cellSize.current)
    cellsHigh.current = Math.floor(containerHeight.current / cellSize.current)

    // moved sprite code here as sprites need to be redone when dimensions change
    cellSprite.current = prerenderCell()
    endRowCellSprite.current = prerenderRowEndCell()
    nextExecutionSprite.current = prerenderExecute('#D4DDE8')

    colours.forEach(c => {
      const colouredSprites = []
      colouredSprites.push(prerenderRead(c.hex))
      colouredSprites.push(prerenderWrite(c.hex))
      colouredSprites.push(prerenderExecute(c.hex))

      sprites.current[c.hex] = colouredSprites
    })

    cellSprite.current = prerenderCell()
  }

  const buildSprite = () => {
    const canvas = document.createElement('canvas')
    canvas.width = cellSize.current
    canvas.height = cellSize.current

    const context = canvas.getContext('2d')
    context.fillStyle = '#353E4A'
    context.fillRect(0, 0, canvas.width, canvas.height)

    return { canvas, context }
  }

  const prerenderCell = () => {
    const sprite = buildSprite()

    const context = sprite.context
    context.strokeStyle = '#D4DDE8'
    context.beginPath()
    context.moveTo(0, cellSize.current)
    context.lineTo(0, 0)
    context.lineTo(cellSize.current, 0)
    context.stroke()

    return sprite
  }

  const prerenderRowEndCell = () => {
    const sprite = buildSprite()

    const context = sprite.context
    context.strokeStyle = '#D4DDE8'
    context.beginPath()
    context.moveTo(0, cellSize.current)
    context.lineTo(0, 0)
    context.lineTo(cellSize.current, 0)
    context.lineTo(cellSize.current, cellSize.current)
    context.stroke()

    return sprite
  }

  const prerenderRead = colour => {
    const sprite = prerenderCell()

    const hSize = (cellSize.current - 1) / 2
    const radius = (cellSize.current - 1) / 8

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

    const x1 = cellSize.current
    const y1 = cellSize.current

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
    context.fillRect(1, 1, cellSize.current - 1, cellSize.current - 1)

    return sprite
  }

  const renderGrid = () => {
    if (gridRendered.current) {
      return
    }
    coreContext.current.clearRect(0, 0, containerWidth.current, containerHeight.current)

    let i = 0
    for (let y = 0; y < cellsHigh.current * cellSize.current; y += cellSize.current) {
      for (let x = 0; x < cellsWide.current * cellSize.current; x += cellSize.current) {
        let sprite
        if (x / cellSize.current === cellsWide.current - 1) {
          sprite = endRowCellSprite.current
        } else {
          sprite = cellSprite.current
        }

        coreContext.current.drawImage(sprite.canvas, x, y)
        if (++i >= coreSize) {
          gridRendered.current = true
          return
        }
      }
    }
  }

  const addressToScreenCoordinate = address => {
    const ix = address % cellsWide.current
    const iy = Math.floor(address / cellsWide.current)

    return {
      x: ix * cellSize.current,
      y: iy * cellSize.current
    }
  }

  const renderMessages = () => {
    messages.current.forEach(data => {
      renderCell(data)
    })

    messages.current = []

    window.requestAnimationFrame(() => {
      renderMessages()
      renderNextExecution()
      highlightClickPoint()
    })
  }

  const renderNextExecution = () => {
    interactiveContext.current.clearRect(
      0,
      0,
      containerWidth.current.width,
      containerHeight.current.height
    )

    if (!nextExecutionAddress) {
      return
    }

    const coordinate = addressToScreenCoordinate(nextExecutionAddress)
    interactiveContext.current.drawImage(
      nextExecutionSprite.current.canvas,
      coordinate.x,
      coordinate.y
    )
  }

  const screenCoordinateToAddress = point => {
    const x = Math.floor(point.x / cellSize.current)
    const y = Math.floor(point.y / cellSize.current)

    return y * cellsWide.current + x
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

    const sprite =
      sprites.current[event.warriorData.colour.hex][getAccessTypeIndex(event.accessType)]
    coreContext.current.drawImage(sprite.canvas, coordinate.x, coordinate.y)
  }

  const calculateCellSize = () => {
    const area = containerWidth.current * containerHeight.current
    const n = coreSize

    const maxCellSize = Math.sqrt(area / n)
    let possibleCellSize = Math.floor(maxCellSize)

    while (!isValidCellSize(possibleCellSize) && possibleCellSize > 0) {
      possibleCellSize--
    }

    return possibleCellSize
  }

  const isValidCellSize = possibleCellSize => {
    cellsWide.current = Math.floor(containerWidth.current / possibleCellSize)
    cellsHigh.current = Math.floor(containerHeight.current / possibleCellSize)

    return cellsWide.current * cellsHigh.current >= coreSize
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
    console.log('click', isInitialised)
    if (!isInitialised) {
      return
    }
    console.log('initialised')
    const point = getRelativeCoordinates(e)

    const address = screenCoordinateToAddress(point)

    inspectionAddress.current = address
    console.log('dispatch(getCoreInstructions(' + address + '))')
    dispatch(setCoreInstructions(address))
  }

  const highlightClickPoint = () => {
    const address = inspectionAddress.current

    const cell = addressToScreenCoordinate(address)

    const { x, y } = cell

    interactiveContext.current.strokeStyle = '#D4DDE8'

    interactiveContext.current.strokeRect(x, y, cellSize.current, cellSize.current)
  }

  return (
    <section className="flex flex-initial items-start justify-center rounded rounded-tl-none rounded-tr-none border border-gray-700 border-t-0">
      <div
        className="relative max-w-core max-h-core min-w-96 min-h-96 lg:w-core lg:h-core"
        ref={canvasContainer}
      >
        <canvas
          className="absolute top-0 left-0"
          ref={coreCanvasEl}
          height={containerHeight.current}
          width={containerWidth.current}
        ></canvas>
        <canvas
          className="absolute top-0 left-0"
          ref={interactiveCanvasEl}
          height={containerHeight.current}
          width={containerWidth.current}
        ></canvas>
      </div>
    </section>
  )
}

export default Core
