
import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';

import Core from '../../containers/simulator/core';
import Cell from '../../containers/simulator/cell';

describe('when rendering the core', () => {
  it('renders without crashing', () => {
    shallow(<Core />);
  });

  it('renders one cell per data item', () => {

    const expectedCells = [{}, {}];

    const props = expectedCells;

    let wrapper = mount(<Core data={props} />);

    expect(wrapper.find(Cell)).to.have.length(expectedCells.length);

  });
});

