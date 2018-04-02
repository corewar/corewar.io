import React from 'react'
import Media from 'react-media'
import { connect } from 'react-redux'

import MobileLayout from './mobileLayout'
import TabletLayout from './tabletLayout'
import DesktopLayout from './desktopLayout'

import SiteHeader from '../topbar/siteHeader'
import RootGrid from '../common/rootGrid'

import { sizes } from '../common/mediaQuery'

import { addWarrior } from '../parser/actions'

class App extends React.Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.addWarrior()
  }

  render() {
    return <RootGrid>
      <SiteHeader isAuthenticated={false}/>
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
    </RootGrid>
  }
}

export default connect(
  null,
  {
    addWarrior
  }
)(App)

export { App as PureApp }
