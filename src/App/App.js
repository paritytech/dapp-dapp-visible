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

import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import Page from '@parity/ui/lib/Page';
import Grid from 'semantic-ui-react/dist/commonjs/collections/Grid';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import Input from 'semantic-ui-react/dist/commonjs/elements/Input';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';

import DappCard from '../DappCard';
import DappsStore from './store';
import styles from './App.css';

const ALL_DAPPS = 'ALL_DAPPS';
const MY_DAPPS = 'MY_DAPPS';

export class App extends Component {
  static contextTypes = {
    api: PropTypes.object.isRequired
  };

  static propTypes = {
    intl: intlShape
  };

  state = {
    menu: ALL_DAPPS, // or MY_DAPPS
    value: ''
  };

  dappsStore = new DappsStore(this.context.api);

  handleMenuClick = (_, { name }) => this.setState({ menu: name });

  handleSearch = (_, { value }) => this.setState({ value });

  renderList = (title, subtitle, items) => {
    const { intl: { formatMessage } } = this.props;
    return (
      <div>
        <Header as="h4">{title}</Header>
        {subtitle}
        <br />
        <Input
          fluid
          iconPosition="left"
          icon="search"
          placeholder={formatMessage({
            id: 'dapps.visible.search',
            defaultMessage: 'Search for dapps by name, description...'
          })}
          className={styles.search}
          onChange={this.handleSearch}
        />
        {items && (
          <Card.Group stackable className={styles.cardGroup}>
            {items
              .filter(
                ({ name, description }) =>
                  this.state.value
                    ? name.includes(this.state.value) ||
                      description.includes(this.state.value)
                    : true
              )
              .map((dapp, index) => (
                <DappCard
                  key={`${dapp.id}-${index}`}
                  dapp={dapp}
                  visible={
                    this.dappsStore.displayApps[dapp.id] &&
                    this.dappsStore.displayApps[dapp.id].visible
                  }
                  onAdd={this.dappsStore.showApp}
                  onRemove={this.dappsStore.hideApp}
                  onOpen={this.dappsStore.loadApp}
                />
              ))}
          </Card.Group>
        )}
      </div>
    );
  };

  render() {
    return (
      <Page
        title={
          <FormattedMessage
            id="dapps.visible.title"
            defaultMessage="Browse Dapps"
          />
        }
      >
        <Grid>
          <Grid.Row>
            <Grid.Column width={4}>
              <Menu pointing secondary vertical>
                <Menu.Item
                  name={ALL_DAPPS}
                  active={this.state.menu === ALL_DAPPS}
                  onClick={this.handleMenuClick}
                >
                  <FormattedMessage
                    id="dapps.visible.allDapps"
                    defaultMessage="All Dapps"
                  />
                </Menu.Item>
                <Menu.Item
                  name={MY_DAPPS}
                  active={this.state.menu === MY_DAPPS}
                  onClick={this.handleMenuClick}
                >
                  <FormattedMessage
                    id="dapps.visible.myDapps"
                    defaultMessage="My Dapps"
                  />
                  <Label>{this.dappsStore.visibleApps.length}</Label>
                </Menu.Item>
              </Menu>
            </Grid.Column>
            <Grid.Column width={12}>
              {this.state.menu === ALL_DAPPS
                ? this.renderList(
                    <FormattedMessage
                      id="dapps.visible.local.sectionTitleAllDapps"
                      defaultMessage="All available Dapps"
                    />,
                    <FormattedMessage
                      id="dapps.visible.local.sectionSubtitleAllDapps"
                      defaultMessage="Here are all available dapps for your Parity Client. You can add them on your homepage or try them out here."
                    />,
                    this.dappsStore.apps
                  )
                : this.renderList(
                    <FormattedMessage
                      id="dapps.visible.local.sectionTitleMyDapps"
                      defaultMessage="My Applications"
                    />,
                    <FormattedMessage
                      id="dapps.visible.local.sectionSubtitleMyDapps"
                      defaultMessage="The dapps here are added on your homepage for quick access."
                    />,
                    this.dappsStore.visibleApps
                  )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Page>
    );
  }
}

export default injectIntl(observer(App));
