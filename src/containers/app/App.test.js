import React from 'react';
import ReactDOM from 'react-dom';
import App from './index';
import { MemoryRouter as Router, withRouter } from 'react-router-dom';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><App /></Router>, div);
});
