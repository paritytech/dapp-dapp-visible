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

import Store from './store';

const mockApps = [
  { id: '123', name: '123', type: 'local' },
  { id: '456', name: '456', type: 'builtin' },
  { id: '789', name: '789', type: 'network' }
];
const mockApi = {
  shell: {
    getApps: () => Promise.resolve(),
    setAppVisibility: () => Promise.resolve(),
    loadApp: () => Promise.resolve()
  }
};

test('should correctly loadApps', () => {
  const store = new Store({
    shell: {
      ...mockApi.shell,
      getApps: showAllApps =>
        Promise.resolve(showAllApps ? mockApps : [mockApps[0]])
    }
  });
  expect.assertions(4);
  return store.loadApps().then(() => {
    expect(store.apps).toContainEqual(mockApps[0]);
    expect(store.apps).toContainEqual(mockApps[1]);
    expect(store.apps).toContainEqual(mockApps[2]);
    expect(store.displayApps).toEqual({ '123': { visible: true } });
  });
});

test('should handle setApps', () => {
  const store = new Store(mockApi);
  store.setApps(mockApps);

  expect(store.apps).toHaveLength(3);
});

test('should handle loadApp', () => {
  const loadApp = jest.fn(() => Promise.resolve());
  const store = new Store({ shell: { ...mockApi.shell, loadApp } });
  store.loadApp('123');

  expect(loadApp).toHaveBeenCalledWith('123');
});

test('should handle loadApp', () => {
  const store = new Store(mockApi);
  store.setDisplayApps({ '123': { visible: true } });

  expect(store.displayApps).toEqual({ '123': { visible: true } });
});

test('should handle showApp and call setAppVisibility', () => {
  const setAppVisibility = jest.fn(() => Promise.resolve());
  const store = new Store({ shell: { ...mockApi.shell, setAppVisibility } });
  store.showApp('123');

  expect(setAppVisibility).toHaveBeenCalledWith('123', true);
});

test('should handle hideApp and call setAppVisibility', () => {
  const setAppVisibility = jest.fn(() => Promise.resolve());
  const store = new Store({ shell: { ...mockApi.shell, setAppVisibility } });
  store.showApp('123');
  store.hideApp('123');

  expect(setAppVisibility).toHaveBeenLastCalledWith('123', false);
});

test('should handle get visibleApps', () => {
  const store = new Store(mockApi);
  store.setApps(mockApps);
  store.setDisplayApps({ '123': { visible: true } });

  expect(store.visibleApps).toContainEqual(mockApps[0]);
});
