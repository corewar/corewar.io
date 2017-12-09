
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import SiteHeader from './../../containers/app/siteHeader';
import Login from './../../containers/app/login';
import Logo from './../../containers/app/logo';

it('renders without crashing', () => {
  shallow(<SiteHeader />);
});

it('contains the logo component', () => {

  const wrapper = shallow(<SiteHeader />);

  expect(wrapper.find(Logo)).to.have.length(1);
});


it('contains the login component', () => {

  const wrapper = shallow(<SiteHeader />);

  expect(wrapper.find(Login)).to.have.length(1);
});