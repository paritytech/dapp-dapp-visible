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

import { shallowWithIntl } from '../setupTests';
import App from '../App';
import DappCard from '../DappCard';

const props = {
  // Mock store
  store: {
    sortedLocal: [{ id: '123', name: '123', type: 'local' }],
    sortedNetwork: [{ id: '456', name: '456', type: 'network' }],
    displayApps: { '123': false, '456': true },
    showApp: () => {},
    hideApp: () => {}
  }
};

test('should render correctly', () => {
  const component = shallowWithIntl(<App {...props} />);

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should call store.showApp when we click on a hidden app', () => {
  const showApp = jest.fn();
  const component = shallowWithIntl(
    <App store={{ ...props.store, showApp }} />
  );

  component
    .find(DappCard)
    .first() // 123
    .props()
    .onClick();

  expect(showApp).toHaveBeenCalled();
});

test('should call store.hideApp when we click on a visible app', () => {
  const hideApp = jest.fn();
  const component = shallowWithIntl(
    <App store={{ ...props.store, hideApp }} />
  );

  component
    .find(DappCard)
    .last() // 456
    .props()
    .onClick();

  expect(hideApp).toHaveBeenCalled();
});
