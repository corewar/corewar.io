import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true })
    // this gets reported to rollbar
    throw new Error(error, info)
  }

  render() {
    if (this.state.hasError) {
      return <h1>This component has errored</h1>
    }
    return this.props.children
  }
}

export default ErrorBoundary