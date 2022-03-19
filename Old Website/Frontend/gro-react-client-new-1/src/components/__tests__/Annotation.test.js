import React from 'react';
import { mount } from 'enzyme';
import Annotation from '../Annotation';

describe('<Annotation />', () => {
  it('should have two children with predefined text', () => {
    const expected1 = 'test3';
    const expected2 = 'test2';
    const wrapper = mount(<Annotation>
        <React.Fragment>
          <div>{expected1}</div>
          <div>{expected2}</div>
        </React.Fragment>
      </Annotation>);
    const actual1 = wrapper.find('Container').find('div').at(1).text();
    const actual2 = wrapper.find('Container').find('div').at(2).text();
    expect(actual1).toEqual(expected1);
    expect(actual2).toEqual(expected2);
  });
});
