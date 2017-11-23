
import React from 'react';
import { shallow } from 'enzyme';
import Home from '../../containers/home/index';

it('renders without crashing', () => {
  shallow(<Home.WrappedComponent />);
});