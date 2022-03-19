import React from 'react';
import { shallow } from 'enzyme';
import BackgroundMenuContainer from '../BackgroundMenuContainer';

describe('<BackgroundMenuContainer />', () => {
  const mockCallBack = jest.fn();
  const wrapper = shallow(<BackgroundMenuContainer handleOnClick={mockCallBack}/>).dive();

  it('should handle click events', () => {
    wrapper.find('div').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('should have a div', () => {
    expect(wrapper.find('div').length).toEqual(1);
  });
});
