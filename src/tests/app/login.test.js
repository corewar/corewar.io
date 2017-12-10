
import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import Login from './../../containers/app/login'
import UserInfo from './../../containers/app/userInfo'

it('renders without crashing', () => {
  shallow(<Login />);
});

it('renders the login and sign up buttons if unauthenticated', () => {

  const wrapper = shallow(<Login isAuthenticated={false}/>);

  expect(wrapper.find('button')).to.have.length(2);
});

it('renders the user info component if authenticated', () => {

    const wrapper = shallow(<Login isAuthenticated={true}/>);

    expect(wrapper.find(UserInfo)).to.have.length(1);
});