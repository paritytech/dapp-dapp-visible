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
import Label from 'semantic-ui-react/dist/commonjs/elements/Label';
import Popup from 'semantic-ui-react/dist/commonjs/modules/Popup';
import IdentityIcon from '@parity/ui/lib/IdentityIcon/identityIcon.js';
// import VoucherStore from '@parity/ui/lib/DappVouchFor/store'; // FIXME: Not working. Just try commenting this line and uncommenting the next one. -Amaury
import VoucherStore from './store';
import { FormattedMessage } from 'react-intl';

import styles from './DappVouchFor.css';

class DappVouchFor extends Component {
  static contextTypes = {
    api: PropTypes.object.isRequired
  };

  static propTypes = {
    dapp: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired
  };

  voucherStore = new VoucherStore(this.context.api, this.props.dapp);

  render() {
    const count = this.voucherStore.vouchers.length;
    if (!count) return null;

    return (
      <Popup
        wide
        trigger={
          <Label>
            <FormattedMessage
              id="dapp.visible.vouchedByCount"
              defaultMessage="{count} vouch{plural}"
              values={{ count, plural: count > 1 ? 'es' : '' }}
            />
          </Label>
        }
        content={
          <div>
            {this.voucherStore.vouchers
              .slice(0, 5)
              .map(voucher => (
                <IdentityIcon
                  key={voucher}
                  address={voucher}
                  tiny
                  className={styles.vouchAvatar}
                />
              ))}
            <FormattedMessage
              id="dapp.visible.vouchedBy"
              defaultMessage="vouched for this app"
            />
          </div>
        }
      />
    );
  }
}

export default observer(DappVouchFor);
