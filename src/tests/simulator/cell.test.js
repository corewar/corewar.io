
import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import Cell from '../../containers/simulator/cell';

describe('when rendering a cell', () => {

  it('renders without crashing', () => {
    shallow(<Cell />);
  });

  it('renders the label if the label is set', () => {

    const expectedLabel = 'sexyLabel';

    const props = {
      label: expectedLabel
    };

    let wrapper = shallow(<Cell data={props} />);

    expect(wrapper.contains(expectedLabel)).to.equal(true);

  });

  it('renders the icon if the label is not set', () => {

    const expectedIcon = 'iconPath';

    const props = {
      label: '',
      icon: expectedIcon
    };

    let wrapper = shallow(<Cell data={props}/>);

    expect(wrapper.contains(expectedIcon)).to.equal(true);

  });

});