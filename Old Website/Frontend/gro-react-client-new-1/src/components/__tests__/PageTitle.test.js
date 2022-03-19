import React from 'react';
import { mount } from 'enzyme';
import PageTitle from '../PageTitle';

describe('<PageTitle />', () => {

  const expected = "test";
  const wrapper = mount(<PageTitle>{expected}</PageTitle>);

  it('should render a h1 with text "test"', () => {
    expect(wrapper.find('h1').length).toEqual(1);
  });

  it('should have a text = "test"', () => {
    expect(wrapper.find('h1').text()).toEqual(expected);
  });

});
