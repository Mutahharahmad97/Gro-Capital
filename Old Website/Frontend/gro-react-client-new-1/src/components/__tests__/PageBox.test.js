import React from 'react';
import { mount } from 'enzyme';
import PageBox from '../PageBox';

describe('<PageBox />', () => {
  it('should render a h2 for title ', () => {
    const expected = "INVESTABILITY";
    const wrapper = mount(<PageBox title={expected}/>);
    expect(wrapper.find('h2').text()).toEqual(expected);
  });
});
