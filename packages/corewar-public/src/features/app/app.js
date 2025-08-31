import PropTypes from 'prop-types'
import React from 'react'
import Media from 'react-media'
import { connect } from 'react-redux'

import DesktopLayout from './desktopLayout'
import MobileLayout from './mobileLayout'

import RootGrid from '../common/rootGrid'
import SiteHeader from '../topbar/siteHeader'

import { sizes } from '../common/mediaQuery'

import { addWarrior } from '../parser/actions'

class App extends React.Component {
  componentDidMount() {
    this.props.addWarrior()
  }

  render() {
    const { interfaceMode } = this.props
    return (
      <RootGrid>
        <SiteHeader isAuthenticated={false} />
        <Media
          query={{ maxWidth: sizes.desktop }}
          render={() => <MobileLayout interfaceMode={interfaceMode} />}
        />
        <Media query={{ minWidth: sizes.desktop }} render={() => <DesktopLayout />} />
      </RootGrid>
    )
  }
}

const mapStateToProps = (state) => ({
  interfaceMode: state.interfaceMode.interfaceMode
})

export default connect(mapStateToProps, {
  addWarrior
})(App)

export { App as PureApp }

App.propTypes = {
  addWarrior: PropTypes.func
}

App.defaultProps = {
  addWarrior: () => {}
}
