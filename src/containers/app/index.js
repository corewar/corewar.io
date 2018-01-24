import React from 'react'
import Media from "react-media"

import MobileLayout from '../app/mobileLayout'
import TabletLayout from '../app/tabletLayout'

import { sizes } from '../../styles/mediaQuery'

const App = () => (
  <div>
    <Media
      query={{ maxWidth: sizes.phone }}
      render={() => <MobileLayout />}
    />

    <Media
      query={{ minWidth: sizes.phone }}
      render={() => <TabletLayout />}
    />
  </div>
)

export default App
