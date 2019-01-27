import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'

import ErrorBoundary from './../../features/common/errorBoundary'
import Button from './../../features/common/button'

describe('when testing the ErrorBoundary component', () => {
  it('renders without crashing', () => {
    shallow(<ErrorBoundary />)
  })

  it('renders and error message if there is one', () => {
    const expectedErrorMsg = 'oh noes!'

    const wrapper = mount(
      <ErrorBoundary errorMessage={expectedErrorMsg}>
        <Button />
      </ErrorBoundary>
    )

    wrapper.setState({ hasError: true })

    expect(wrapper.find('h1').text()).to.contain(expectedErrorMsg)

    expect(wrapper.find(Button)).to.have.length(0)
  })

  it('renders the children if there is no error', () => {
    const wrapper = shallow(
      <ErrorBoundary>
        <Button />
      </ErrorBoundary>
    )

    expect(wrapper.find(Button)).to.have.length(1)
  })

  function ProblemChild() {
    return null
    //throw new Error('Error thrown from problem child')
  }

  xit('if an error is caught, sets the state to error: true', () => {
    const wrapper = mount(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    )

    expect(wrapper.state().hasError).to.equal(true)
  })
})
