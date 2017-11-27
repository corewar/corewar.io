import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
//import sinon from 'sinon';

import { PureSimulator } from './../../containers/simulator/index';

it('renders without crashing', () => {

  const props = {
    standardId: 1,
    isParsing: false,
    redcode: '',
    parseResult: {
      messages: [],
      warrior: {}
    },
    parse: () => {}
  };
  // parseResult: state.parser.parseResult,
  // isParsing: state.parser.isParsing,
  // standardId: state.parser.standardId,
  // redcode: state.parser.redcode

  const wrapper = shallow(<PureSimulator />);

});



