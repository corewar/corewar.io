module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      display: ['Inter'],
      body: ['Inter'],
      code: ['Anonymous Pro']
    },
    extend: {
      colors: {
        gray: {
          '100': '#EEF2F7',
          '200': '#D4DDE8',
          '300': '#A6B1BF',
          '400': '#8897AA',
          '500': '#6B7D94',
          '600': '#556477',
          '700': '#353E4A',
          '800': '#20252C',
          '900': '#15191E'
        },
        warriors: {
          '0': '#56CCF2',
          '1': '#EB5757',
          '2': '#F2C94C',
          '3': '#6FCF97',
          '4': '#BB6BD9'
        }
      },
      maxWidth: {
        core: '42.5rem'
      },
      minWidth: {
        '96': '24rem'
      },
      maxHeight: {
        core: '42.5rem'
      },
      minHeight: {
        '16': '4rem',
        '96': '24rem'
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
        '96': '24rem',
        '128': '32rem',
        core: '42.5rem'
      }
    }
  },
  variants: {},
  plugins: []
}
