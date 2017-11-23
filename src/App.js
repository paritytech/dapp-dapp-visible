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

import { observer } from 'mobx-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import ActionBar from '@parity/ui/lib/Actionbar/actionbar';

import DappCard from './DappCard';
import styles from './App.css';

class App extends Component {
  handleToggleVisibility = dappId => {
    const { store } = this.props;
    if (store.displayApps[dappId]) {
      store.hideApp(dappId);
    } else {
      store.showApp(dappId);
    }
  };

  renderList = (title, subtitle, items) => {
    const { store } = this.props;
    if (!items || !items.length) {
      return null;
    }

    return (
      <div className={styles.sectionList}>
        <Header as="h4">{title}</Header>
        <div>{subtitle}</div>
        <Card.Group stackable className={styles.cardGroup}>
          {items.map((dapp, index) => (
            <DappCard
              key={index}
              dapp={dapp}
              visible={store.displayApps[dapp.id]}
              onClick={() => this.handleToggleVisibility(dapp.id)}
            />
          ))}
        </Card.Group>
      </div>
    );
  };

  render() {
    const { store } = this.props;
    console.log(store.apps);
    return (
      <div className={styles.layout}>
        <ActionBar
          title={
            <FormattedMessage
              id="dapps.visible.title"
              defaultMessage="Visible Dapps"
            />
          }
        />
        {this.renderList(
          <FormattedMessage
            id="dapps.visible.local.sectionTitle"
            defaultMessage="Applications locally available"
          />,
          <FormattedMessage
            id="dapps.visible.local.sectionSubtitle"
            defaultMessage="All applications installed locally on the machine by the user for access by the Parity client."
          />,
          store.sortedLocal
        )}
        {this.renderList(
          <FormattedMessage
            id="dapps.visible.builtin.sectionTitle"
            defaultMessage="Applications bundled with Parity"
          />,
          <FormattedMessage
            id="dapps.visible.builtin.sectionSubtitle"
            defaultMessage="Experimental applications developed by the Parity team to show off dapp capabilities, integration, experimental features and to control certain network-wide client behaviour."
          />,
          store.sortedBuiltin
        )}
        {this.renderList(
          <FormattedMessage
            id="dapps.visible.network.sectionTitle"
            defaultMessage="Applications on the global network"
          />,
          <FormattedMessage
            id="dapps.visible.network.sectionSubtitle"
            defaultMessage="These applications are not affiliated with Parity nor are they published by Parity. Each remain under the control of their respective authors. Please ensure that you understand the goals for each application before interacting."
          />,
          store.sortedNetwork
        )}
      </div>
    );
  }
}

export default observer(App);

App.propTypes = {
  store: PropTypes.object.isRequired
};
