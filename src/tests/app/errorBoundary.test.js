
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import ErrorBoundary from './../../components/app/errorBoundary'
import Login from './../../components/app/login'

describe('when testing the ErrorBoundary component', () => {

  it('renders without crashing', () => {
    shallow(<ErrorBoundary />)
  })

  it('renders and error message if there is one', () => {

    const expectedErrorMsg = 'oh noes!'

    const wrapper = mount(<ErrorBoundary errorMessage={expectedErrorMsg}>
      <Login />
      </ErrorBoundary>)

    wrapper.setState({ hasError: true })

    expect(wrapper.find('h1').text()).to.contain(expectedErrorMsg)

    expect(wrapper.find(Login)).to.have.length(0)

  })


  it('renders the children if there is no error', () => {
    const wrapper = shallow(<ErrorBoundary><Login/></ErrorBoundary>)

    expect(wrapper.find(Login)).to.have.length(1)
  })

})

