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
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import DappIcon from '@parity/ui/lib/DappIcon';
import { FormattedMessage } from 'react-intl';

import DappVouchFor from './DappVouchFor';
import styles from './DappCard.css';

const DAPP_DAPP_VISIBLE_ID =
  '0xa48bd8fd56c90c899135281967a6cf90865c221b46f27f9fbe2a236d74a64ea2'; // This dapp's id

class DappCard extends Component {
  static propTypes = {
    dapp: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string
    }).isRequired,
    onAdd: PropTypes.func.isRequired,
    onOpen: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    visible: PropTypes.bool
  };

  handleAdd = () => this.props.onAdd(this.props.dapp.id);

  handleRemove = () => this.props.onRemove(this.props.dapp.id);

  handleOpen = () => this.props.onOpen(this.props.dapp.id);

  render() {
    const { dapp, visible } = this.props;

    return (
      <Card>
        <Card.Content>
          <DappIcon
            app={dapp}
            className={`ui centered image ${styles.picture}`}
          />
          <Card.Header>{dapp.name}</Card.Header>
          <Card.Meta>{dapp.description}</Card.Meta>
          <Card.Description>
            {dapp.type === 'local' && (
              <Label>
                <FormattedMessage
                  id="dapp.visible.localLabel"
                  defaultMessage="Local Dapp"
                />
              </Label>
            )}
            {dapp.type === 'builtin' && (
              <Label>
                <FormattedMessage
                  id="dapp.visible.builtinLabel"
                  defaultMessage="By Parity"
                />
              </Label>
            )}
            <DappVouchFor dapp={dapp} />
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            basic
            secondary
            content={
              <FormattedMessage
                id="dapp.visible.openDapp"
                defaultMessage="Open"
              />
            }
            icon="external"
            onClick={this.handleOpen}
          />
          {visible ? (
            <Button
              content={
                <FormattedMessage
                  id="dapp.visible.addedDapp"
                  defaultMessage="Added to home"
                />
              }
              disabled={dapp.id === DAPP_DAPP_VISIBLE_ID} // Do not allow removing this dapp from homepage
              icon="toggle on"
              onClick={this.handleRemove}
              primary
            />
          ) : (
            <Button
              basic
              content={
                <FormattedMessage
                  id="dapp.visible.addDapp"
                  defaultMessage="Add to home"
                />
              }
              icon="toggle off"
              onClick={this.handleAdd}
              primary
            />
          )}
        </Card.Content>
      </Card>
    );
  }
}

export default observer(DappCard);
