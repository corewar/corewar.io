import Identicon from 'identicon.js'
import jssha from 'jssha'

import { colour } from './theme'

export const createHash = (input) => {

  const sha = new jssha('SHA-512', 'TEXT')

  sha.update(input)

  return sha.getHash('HEX')
}

export const getIdenticon = (compiled, colour, size = 40) => {

  const hash = createHash(compiled)

  const options = {
    size: size,
    foreground: hexToRgbA(colour),
    background: [0,0,0,0],
    margin: 0,
    format: 'svg'
  }

  return new Identicon(hash, options)
}

const hexToRgbA = (hex) => {

  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  return [r, g, b, 255]
}