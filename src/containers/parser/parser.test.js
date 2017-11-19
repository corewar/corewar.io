import React from 'react';
import ReactDOM from 'react-dom';
import { expect } from 'chai';
import { shallow } from 'enzyme';
//import sinon from 'sinon';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

import { Parser } from './index';

it('renders without crashing', () => {

  const wrapper = shallow(<Parser />);

});

it('renders parser textareas', () => {

  const wrapper = shallow(<Parser />);

  expect(wrapper.find('textarea')).to.have.length(2);

});



