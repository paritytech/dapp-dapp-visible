// Copyright 2015-2017 Parity Technologies (UK) Ltd.
// This file is part of Parity.

// Parity is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Parity is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Parity.  If not, see <http://www.gnu.org/licenses/>.

import React from 'react';
import { shallowToJson } from 'enzyme-to-json';

import { shallowWithIntl, mountWithIntl } from '../../setupTests';
import DappCard from '../DappCard';

const props = {
  dapp: {
    id: '123',
    name: 'Test'
  },
  methodGroups: { shell: { methods: ['foo', 'bar'] } },
  permissions: { 'foo:123': true },
  onEdit: () => {},
  onToggle: () => {}
};

test('should render correctly in viewing mode', () => {
  const component = shallowWithIntl(<DappCard {...props} />);

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should render correctly in viewing mode with no allowed methods', () => {
  const component = shallowWithIntl(<DappCard {...props} permissions={{}} />);

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should render correctly in editing mode', () => {
  const component = shallowWithIntl(<DappCard {...props} editingMode />);

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should handle onEdit button click', () => {
  const onEdit = jest.fn();

  const component = shallowWithIntl(<DappCard {...props} onEdit={onEdit} />);

  component
    .find(Button)
    .last()
    .simulate('click');
  expect(onEdit).toHaveBeenCalled();
});

test('should handle onToggle click', () => {
  const onToggle = jest.fn();

  const component = mountWithIntl(
    <DappCard {...props} editingMode onToggle={onToggle} />
  );

  component
    .find(List.Item)
    .last() // The 'bar' one
    .simulate('click');

  expect(onToggle).toHaveBeenCalledWith('bar', '123');
});
