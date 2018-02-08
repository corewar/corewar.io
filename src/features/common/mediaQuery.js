import { css } from 'styled-components'

export const sizes = {
  designer: 1200, // Extra large devices (large desktops, 1200px and up)
  desktop: 992, // Large devices (desktops, 992px and up)
  tablet: 768, // Medium devices (tablets, 768px and up)
  phone: 576 // Small devices (landscape phones, 576px and up)
}

// Iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `

  return acc
}, {})