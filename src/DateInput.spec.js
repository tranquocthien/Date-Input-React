import React from 'react';
import { mount } from 'enzyme';
import DateInput from '../DateInput';

describe('DateInput', () => {
  const onBlur = jest.fn();
  const onChange = jest.fn();
  const onDragStart = jest.fn();
  const onDrop = jest.fn();
  const onFocus = jest.fn();
  let value;

  afterEach(() => {
    value = '';
    onBlur.mockReset();
    onChange.mockReset();
    onDragStart.mockReset();
    onDrop.mockReset();
    onFocus.mockReset();
  });

  const Testable = () => (
    <DateInput
      id="dob"
      name="dob"
      value={value}
      margin="normal"
      onBlur={onBlur}
      onDrop={onDrop}
      onFocus={onFocus}
      variant="outlined"
      onChange={onChange}
      required
      disabled={false}
      fullWidth
      onDragStart={onDragStart}
    />
  );

  it('should render an empty input field', () => {
    const wrapper = mount(<Testable />);
    const inputField = wrapper.find('input');
    expect(inputField.props().value).toEqual('');
  });

  it('should populate the input field given a valid date', () => {
    // Set a valid date YYYY-MM-DD
    value = '2020-02-26';
    const wrapper = mount(<Testable />);
    const inputField = wrapper.find('input');
    expect(inputField.props().value).toEqual('26/02/2020');
  });

  it('should not populate the input field given an invalid date', () => {
    // Set an invalid date YYYY-MM-DD
    value = '2020-13-26';
    const wrapper = mount(<Testable />);
    const inputField = wrapper.find('input');
    expect(inputField.props().value).toEqual('');
  });
});
