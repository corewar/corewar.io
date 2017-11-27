import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import { PureSimulator } from './../../containers/simulator/index';

describe('when rendering the simulator', () => {

  it('renders without crashing', () => {
    const wrapper = shallow(<PureSimulator />);
  });

});



