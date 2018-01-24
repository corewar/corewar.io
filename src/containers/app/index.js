import React from 'react'
import Media from "react-media"

import MobileLayout from '../app/mobileLayout'
import TabletLayout from '../app/tabletLayout'
import DesktopLayout from '../app/desktopLayout'

import { sizes } from '../../styles/mediaQuery'

const App = () => (
  <div>
    <Media
      query={{ maxWidth: sizes.phone }}
      render={() => <MobileLayout />}
    />

    <Media
      query={{ minWidth: sizes.phone, maxWidth: sizes.desktop }}
      render={() => <TabletLayout />}
    />

<Media
      query={{ minWidth: sizes.desktop }}
      render={() => <DesktopLayout />}
    />
  </div>
)

export default App
