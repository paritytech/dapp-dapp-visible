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

import { action, extendObservable } from 'mobx';

export default class Store {
  constructor(api) {
    this._api = api;

    // Using mobx without @observable decorators
    extendObservable(this, {
      apps: [],
      displayAppsMap: {},
      // computed
      get sortedLocal() {
        return this.apps.filter(({ type }) => type === 'local');
      },
      get sortedBuiltin() {
        return this.apps.filter(({ type }) => type === 'builtin');
      },
      get sortedNetwork() {
        return this.apps.filter(({ type }) => type === 'network');
      },
      get displayApps() {
        return this.apps.filter(({ id }) => this.displayAppsMap[id]);
      }
    });

    this.loadApps();
  }

  setApps = action(apps => {
    this.apps = apps;
  });

  setdisplayAppsMap = action(displayAppsMap => {
    this.displayAppsMap = displayAppsMap;
  });

  hideApp = action(appId => {
    this.displayAppsMap = { ...this.displayAppsMap, [appId]: false };
    this._api.shell.setAppVisibility(appId, false);
  });

  showApp = action(appId => {
    this.displayAppsMap = { ...this.displayAppsMap, [appId]: true };
    this._api.shell.setAppVisibility(appId, true);
  });

  loadApps() {
    return Promise.all([
      this._api.shell.getApps(true),
      this._api.shell.getApps(false)
    ]).then(([all, displayed]) => {
      if (displayed) {
        this.setdisplayAppsMap(
          displayed.reduce((result, { id }) => {
            result[id] = true;
            return result;
          }, {})
        );
      }
      this.setApps(all);
    });
  }
}
