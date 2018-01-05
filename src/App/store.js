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
      displayApps: {},
      // computed
      get visibleApps() {
        return this.apps.filter(
          ({ id }) => this.displayApps[id] && this.displayApps[id].visible
        );
      }
    });

    this.loadApps();
  }

  setApps = action(apps => {
    this.apps = apps;
  });

  setDisplayApps = action(displayApps => {
    this.displayApps = displayApps;
  });

  hideApp = action(appId => {
    this._api.shell.setAppVisibility(appId, false).then(() => {
      this.displayApps = {
        ...this.displayApps,
        [appId]: { visible: false }
      };
    });
  });

  showApp = action(appId => {
    this._api.shell.setAppVisibility(appId, true).then(() => {
      this.displayApps = {
        ...this.displayApps,
        [appId]: { visible: true }
      };
    });
  });

  loadApp = appId => {
    this._api.shell.loadApp(appId);
  };

  loadApps() {
    return Promise.all([
      this._api.shell.getApps(true),
      this._api.shell.getApps(false)
    ]).then(([all, displayed]) => {
      if (displayed) {
        this.setDisplayApps(
          displayed.reduce((result, { id }) => {
            result[id] = { visible: true };
            return result;
          }, {})
        );
      }
      this.setApps(all);
    });
  }
}
