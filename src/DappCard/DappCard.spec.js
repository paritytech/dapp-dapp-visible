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
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';

import { shallowWithIntl } from '../setupTests';
import DappCard from './DappCard';

// Mock props
const props = {
  dapp: {
    id: '123',
    name: 'Test'
  },
  visible: false,
  onAdd: () => {},
  onOpen: () => {},
  onRemove: () => {}
};

test('should render correctly when visible', () => {
  const component = shallowWithIntl(<DappCard {...props} />);

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should render correctly when hidden', () => {
  const component = shallowWithIntl(<DappCard {...props} visible />);

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should render correctly a local dapp', () => {
  const component = shallowWithIntl(
    <DappCard {...props} dapp={{ ...props.dapp, type: 'local' }} />
  );

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should render correctly a builtin dapp', () => {
  const component = shallowWithIntl(
    <DappCard {...props} dapp={{ ...props.dapp, type: 'builtin' }} />
  );

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should handle onOpen on Open button click', () => {
  const onOpen = jest.fn();

  const component = shallowWithIntl(<DappCard {...props} onOpen={onOpen} />);

  component
    .find(Button)
    .first()
    .simulate('click');
  expect(onOpen).toHaveBeenCalledWith('123');
});

test('should handle onAdd on Add To Home button click', () => {
  const onAdd = jest.fn();

  const component = shallowWithIntl(<DappCard {...props} onAdd={onAdd} />);

  component
    .find(Button)
    .at(1)
    .simulate('click');
  expect(onAdd).toHaveBeenCalledWith('123');
});

test('should handle onRemove on Remove button click', () => {
  const onRemove = jest.fn();

  const component = shallowWithIntl(
    <DappCard {...props} onRemove={onRemove} visible />
  );

  component
    .find(Button)
    .last()
    .simulate('click');
  expect(onRemove).toHaveBeenCalledWith('123');
});
