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

import { shallowWithIntl } from '../../setupTests';
import DappCard from '../DappCard';

// Mock props
const props = {
  dapp: {
    id: '123',
    name: 'Test'
  },
  visible: false,
  onClick: () => {}
};

test('should render correctly in when visible', () => {
  const component = shallowWithIntl(<DappCard {...props} />);

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should render correctly in when hidden', () => {
  const component = shallowWithIntl(<DappCard {...props} visible />);

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should handle onClick on card click', () => {
  const onClick = jest.fn();

  const component = shallowWithIntl(<DappCard {...props} onClick={onClick} />);

  component.simulate('click');
  expect(onClick).toHaveBeenCalled();
});
