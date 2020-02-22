import React from 'react'
import PropTypes from 'prop-types'
import Media from 'react-media'
import { connect } from 'react-redux'

import MobileLayout from './mobileLayout'
import DesktopLayout from './desktopLayout'

import SiteHeader from '../topbar/siteHeader'
import RootGrid from '../common/rootGrid'

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
        <SiteHeader isAuthenticated={false} history={this.props.history} />
        <Media
          query={{ maxWidth: sizes.desktop }}
          render={() => <MobileLayout interfaceMode={interfaceMode} />}
        />
        <Media query={{ minWidth: sizes.desktop }} render={() => <DesktopLayout />} />
      </RootGrid>
    )
  }
}

const mapStateToProps = state => ({
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
