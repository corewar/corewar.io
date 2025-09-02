import * as PubSub from 'pubsub-js'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import throttle from '../../services/throttle'
import { getFileState } from '../files/reducer'
import { republish, setCoreInstructions } from './actions'
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
  const gridRendered = useRef(false)
  const coreInitialized = useRef(false)

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
      gridRendered.current = false // Reset grid flag so it gets redrawn
      coreInitialized.current = false // Reset core initialization flag
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
    if (coreCanvasEl.current && interactiveCanvasEl.current) {
      coreContext.current = coreCanvasEl.current.getContext('2d')
      interactiveContext.current = interactiveCanvasEl.current.getContext('2d')
    }
  }, [])

  useEffect(() => {
    interactiveCanvasEl.current.addEventListener('click', (e) => canvasClick(e))

    // Use window resize with debouncing instead of ResizeObserver to avoid feedback loops
    const handleResize = throttle(() => {
      if (canvasContainer.current) {
        const newWidth = canvasContainer.current.clientWidth
        const newHeight = canvasContainer.current.clientHeight

        // Minimum size check to prevent issues with very small containers
        if (newWidth < 200 || newHeight < 200) {
          return
        }

        // Force recalculation if dimensions changed significantly
        if (
          Math.abs(newWidth - (containerWidth.current || 0)) > 5 ||
          Math.abs(newHeight - (containerHeight.current || 0)) > 5
        ) {
          // Force a complete re-initialization to ensure proper redraw
          init()
        }
      }
    }, 150)

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [isInitialised]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Ensure we have valid container dimensions before calculating
    if (
      canvasContainer.current &&
      canvasContainer.current.clientWidth > 0 &&
      canvasContainer.current.clientHeight > 0
    ) {
      const currentWidth = canvasContainer.current.clientWidth
      const currentHeight = canvasContainer.current.clientHeight

      // If dimensions have changed, force a complete re-initialization
      if (containerWidth.current !== currentWidth || containerHeight.current !== currentHeight) {
        // Update dimensions first to prevent infinite loop
        containerWidth.current = currentWidth
        containerHeight.current = currentHeight
        init()
      } else if (!containerWidth.current || !containerHeight.current) {
        // Only calculate if we don't have dimensions yet
        calculateCoreDimensions()
        renderGrid()
      }
    }
  })

  // Additional effect to handle initial sizing when container becomes available
  useEffect(() => {
    const checkAndInit = () => {
      if (
        canvasContainer.current &&
        canvasContainer.current.clientWidth > 0 &&
        canvasContainer.current.clientHeight > 0 &&
        (!containerWidth.current || !containerHeight.current)
      ) {
        init()
      }
    }

    // Check immediately
    checkAndInit()

    // Also check after a short delay to handle async container sizing
    const timeoutId = setTimeout(checkAndInit, 100)

    return () => clearTimeout(timeoutId)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const init = () => {
    // Always ensure dimensions are calculated and grid is rendered
    calculateCoreDimensions()

    // Ensure sprites are available even if dimensions didn't change
    if (!cellSprite.current || !endRowCellSprite.current) {
      cellSprite.current = prerenderCell()
      endRowCellSprite.current = prerenderRowEndCell()
      nextExecutionSprite.current = prerenderExecute('#D4DDE8')
    }

    // Always force grid redraw when init() is called
    gridRendered.current = false
    renderGrid()

    republish()
    renderMessages()
    coreInitialized.current = true
  }

  const calculateCoreDimensions = () => {
    if (!canvasContainer.current) {
      return
    }

    const width = canvasContainer.current.clientWidth
    const height = canvasContainer.current.clientHeight

    // we get a brief period of zero values when switching display mode, during unmount/mount
    if (width === 0 && height === 0) {
      return
    }

    // Only update if dimensions actually changed
    if (
      containerWidth.current === width &&
      containerHeight.current === height &&
      cellSize.current > 0
    ) {
      return
    }

    // Clear messages when dimensions change to prevent stale data issues
    messages.current = []

    // Reset grid rendering flag when dimensions change
    gridRendered.current = false

    containerWidth.current = width
    containerHeight.current = height

    cellSize.current = calculateCellSize()
    cellsWide.current = Math.floor(containerWidth.current / cellSize.current)
    cellsHigh.current = Math.floor(containerHeight.current / cellSize.current)

    // Validate that we can actually fit the core in the available space
    if (cellsWide.current * cellsHigh.current < coreSize) {
      console.warn(
        `Grid too small: ${cellsWide.current}x${cellsHigh.current} = ${cellsWide.current * cellsHigh.current} cells, need ${coreSize}`
      )
      // Use minimum viable cell size
      cellSize.current = Math.min(
        Math.floor(containerWidth.current / Math.ceil(Math.sqrt(coreSize))),
        Math.floor(containerHeight.current / Math.ceil(Math.sqrt(coreSize)))
      )
      cellsWide.current = Math.floor(containerWidth.current / cellSize.current)
      cellsHigh.current = Math.floor(containerHeight.current / cellSize.current)
    }

    // Update canvas dimensions
    if (coreCanvasEl.current && interactiveCanvasEl.current) {
      coreCanvasEl.current.width = containerWidth.current
      coreCanvasEl.current.height = containerHeight.current
      interactiveCanvasEl.current.width = containerWidth.current
      interactiveCanvasEl.current.height = containerHeight.current
    }

    // moved sprite code here as sprites need to be redone when dimensions change
    cellSprite.current = prerenderCell()
    endRowCellSprite.current = prerenderRowEndCell()
    nextExecutionSprite.current = prerenderExecute('#D4DDE8')

    colours.forEach((c) => {
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

  const prerenderRead = (colour) => {
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

  const prerenderWrite = (colour) => {
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

  const prerenderExecute = (colour) => {
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

    // Check if sprites are available
    if (!cellSprite.current || !endRowCellSprite.current) {
      return
    }

    if (!coreContext.current) {
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

  const addressToScreenCoordinate = (address) => {
    // Ensure we have valid grid dimensions
    if (
      !cellsWide.current ||
      !cellsHigh.current ||
      cellsWide.current <= 0 ||
      cellsHigh.current <= 0
    ) {
      return { x: 0, y: 0 }
    }

    const ix = address % cellsWide.current
    const iy = Math.floor(address / cellsWide.current)

    // Bounds check - ensure coordinates are within the current grid
    if (ix >= cellsWide.current || iy >= cellsHigh.current) {
      return { x: 0, y: 0 }
    }

    return {
      x: ix * cellSize.current,
      y: iy * cellSize.current
    }
  }

  const renderMessages = () => {
    // Only redraw grid if it hasn't been rendered yet
    if (!gridRendered.current) {
      renderGrid()
    }

    messages.current.forEach((data) => {
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
    if (!interactiveContext.current || !containerWidth.current || !containerHeight.current) {
      return
    }

    interactiveContext.current.clearRect(0, 0, containerWidth.current, containerHeight.current)

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

  const screenCoordinateToAddress = (point) => {
    const x = Math.floor(point.x / cellSize.current)
    const y = Math.floor(point.y / cellSize.current)

    return y * cellsWide.current + x
  }

  const getAccessTypeIndex = (accessType) => {
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

  const renderCell = (event) => {
    // Safety checks
    if (
      !event ||
      !event.warriorData ||
      !event.warriorData.colour ||
      !sprites.current[event.warriorData.colour.hex]
    ) {
      return
    }

    const coordinate = addressToScreenCoordinate(event.address)
    const accessTypeIndex = getAccessTypeIndex(event.accessType)

    // Ensure the sprite exists
    if (!sprites.current[event.warriorData.colour.hex][accessTypeIndex]) {
      return
    }

    const sprite = sprites.current[event.warriorData.colour.hex][accessTypeIndex]
    coreContext.current.drawImage(sprite.canvas, coordinate.x, coordinate.y)
  }

  const calculateCellSize = () => {
    const area = containerWidth.current * containerHeight.current
    const n = coreSize

    console.log(`calculateCellSize: area=${area}, coreSize=${n}`)

    // Calculate optimal cell size based on available space
    const maxCellSize = Math.sqrt(area / n)
    let possibleCellSize = Math.floor(maxCellSize)

    console.log(
      `calculateCellSize: maxCellSize=${maxCellSize}, possibleCellSize=${possibleCellSize}`
    )

    // Ensure we can fit the core in the available space
    while (!isValidCellSize(possibleCellSize) && possibleCellSize > 0) {
      possibleCellSize--
    }

    // If we can't fit the core, use the minimum viable size
    if (possibleCellSize === 0) {
      const minDimension = Math.min(containerWidth.current, containerHeight.current)
      const minCellsPerSide = Math.ceil(Math.sqrt(coreSize))
      possibleCellSize = Math.floor(minDimension / minCellsPerSide)
      console.log(
        `calculateCellSize: Using fallback, minDimension=${minDimension}, minCellsPerSide=${minCellsPerSide}, possibleCellSize=${possibleCellSize}`
      )
    }

    const finalCellSize = Math.max(possibleCellSize, 1)
    console.log(`calculateCellSize: Final cell size=${finalCellSize}`)
    return finalCellSize
  }

  const isValidCellSize = (possibleCellSize) => {
    cellsWide.current = Math.floor(containerWidth.current / possibleCellSize)
    cellsHigh.current = Math.floor(containerHeight.current / possibleCellSize)

    return cellsWide.current * cellsHigh.current >= coreSize
  }

  const getRelativeCoordinates = (event) => {
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

  const canvasClick = (e) => {
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
    <section className="flex flex-1 items-center justify-center rounded rounded-tl-none rounded-tr-none border border-gray-700 border-t-0 p-4 min-h-0">
      <div
        className="relative w-full h-full min-w-80 min-h-80"
        style={{
          width: '100%',
          height: '100%',
          minWidth: '320px',
          minHeight: '320px',
          maxWidth: '100%',
          maxHeight: '100%'
        }}
        ref={canvasContainer}
      >
        <canvas
          className="absolute top-0 left-0"
          ref={coreCanvasEl}
          height={containerHeight.current || 400}
          width={containerWidth.current || 400}
        ></canvas>
        <canvas
          className="absolute top-0 left-0"
          ref={interactiveCanvasEl}
          height={containerHeight.current || 400}
          width={containerWidth.current || 400}
        ></canvas>
      </div>
    </section>
  )
}

export default Core
