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
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';

import { shallowWithIntl } from '../setupTests';
import DappCard from '../DappCard';
import DappsStore from './store';
import { App } from './App';

jest.mock('./store');
const mockStore = {
  apps: [
    { id: '123', name: '123', description: '' },
    { id: '456', name: '456', description: '' }
  ],
  visibleApps: [{ id: '456', name: '456', description: '' }],
  displayApps: { '123': { visible: false }, '456': { visible: true } },
  showApp: () => {},
  hideApp: () => {},
  loadApp: () => {}
};

test('should render correctly when we display all apps', () => {
  DappsStore.mockImplementation(() => mockStore);
  const component = shallowWithIntl(<App />, { context: { api: {} } });

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should render correctly when we display my apps', () => {
  DappsStore.mockImplementation(() => mockStore);
  const component = shallowWithIntl(<App />, { context: { api: {} } });
  component.setState({ menu: 'MY_DAPPS' });

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should handle correctly changing menus', () => {
  DappsStore.mockImplementation(() => mockStore);
  const component = shallowWithIntl(<App />, { context: { api: {} } });

  component
    .find(Menu.Item)
    .at(1)
    .simulate('click', null, { name: 'MY_DAPPS' });
  expect(component.state('menu')).toBe('MY_DAPPS');

  component
    .find(Menu.Item)
    .at(0)
    .simulate('click', null, { name: 'ALL_DAPPS' });
  expect(component.state('menu')).toBe('ALL_DAPPS');
});

test('should handle searching dapps', () => {
  DappsStore.mockImplementation(() => mockStore);
  const component = shallowWithIntl(<App />, { context: { api: {} } });

  component
    .find(Input)
    .first()
    .props()
    .onChange(null, { value: '12' });
  expect(component.state('value')).toBe('12');
  component.update();
  expect(component.find('DappCard').length).toBe(1);
});

test('should call store.loadApp when we click on open App', () => {
  const loadApp = jest.fn();
  DappsStore.mockImplementation(() => ({ ...mockStore, loadApp }));
  const component = shallowWithIntl(<App />, { context: { api: {} } });

  component
    .find(DappCard)
    .first() // 123
    .props()
    .onOpen();

  expect(loadApp).toHaveBeenCalled();
});

test('should call store.showApp when we add to home', () => {
  const showApp = jest.fn();
  DappsStore.mockImplementation(() => ({ ...mockStore, showApp }));
  const component = shallowWithIntl(<App />, { context: { api: {} } });

  component
    .find(DappCard)
    .first() // 123
    .props()
    .onAdd();

  expect(showApp).toHaveBeenCalled();
});

test('should call store.hideApp when we hide it', () => {
  const hideApp = jest.fn();
  DappsStore.mockImplementation(() => ({ ...mockStore, hideApp }));
  const component = shallowWithIntl(<App />, { context: { api: {} } });

  component
    .find(DappCard)
    .last() // 456
    .props()
    .onRemove();

  expect(hideApp).toHaveBeenCalled();
});
