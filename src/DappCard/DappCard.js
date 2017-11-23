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

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import Image from 'semantic-ui-react/dist/commonjs/elements/Image';

import styles from './DappCard.css';

class DappCard extends PureComponent {
  static propTypes = {
    dapp: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    visible: PropTypes.bool.isRequired
  };

  render() {
    const { dapp, visible, onClick } = this.props;

    return (
      <Card className={!visible ? styles.hidden : ''} onClick={onClick}>
        <Card.Content>
          <Image src={dapp.image} className={styles.picture} centered />
          <Card.Header>{dapp.name}</Card.Header>
          <Card.Meta>{dapp.description}</Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

export default DappCard;
