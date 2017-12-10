import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';
//import sinon from 'sinon';

import { PureParser } from './../../containers/parser/index';

describe('when rendering the parser', () => {

  it('renders without crashing', () => {

      const props = {
        standardId: 1,
        isParsing: false,
        redcode: '',
        currentParseResult: {
          messages: [],
          warrior: {}
        },
        parse: () => {}
      };

      const wrapper = shallow(<PureParser {...props} />);

    });

    // it('renders parser textareas', () => {

    //   const props = {
    //     standardId: 1,
    //     isParsing: false,
    //     redcode: '',
    //     currentParseResult: {
    //       messages: [],
    //       warrior: {}
    //     },
    //     parse: () => {}
    //   };

    //   const wrapper = shallow(<PureParser {...props} />);

    //   expect(wrapper.find('textarea')).to.have.length(1);
    //   expect(wrapper.find('pre')).to.have.length(1);

    // });

});



