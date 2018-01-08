
import React from 'react'
import { shallow, mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import { PureParseContainer } from './../../containers/parser/parseContainer'

describe('when testing the parse container', () => {

  it('renders without crashing', () => {
    shallow(<PureParseContainer />)
  })

})

