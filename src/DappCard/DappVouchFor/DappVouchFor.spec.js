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
// import VoucherStore from '@parity/ui/lib/DappVouchFor/store';
import VoucherStore from './store';

import { shallowWithIntl } from '../../setupTests';
import DappVouchFor from './DappVouchFor';

// Mock voucherStore
jest.mock('./store');

// Mock props
const props = {
  dapp: {
    id: '123',
    name: 'Test'
  }
};

test('should render correctly with 0 vouch', () => {
  VoucherStore.mockImplementation(() => ({ vouchers: [] }));
  const component = shallowWithIntl(<DappVouchFor {...props} />, {
    context: { api: {} }
  });

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should render correctly with 1 vouch', () => {
  VoucherStore.mockImplementation(() => ({ vouchers: ['123'] }));
  const component = shallowWithIntl(<DappVouchFor {...props} />, {
    context: { api: {} }
  });

  expect(shallowToJson(component)).toMatchSnapshot();
});

test('should render correctly with 2 vouch', () => {
  VoucherStore.mockImplementation(() => ({ vouchers: ['123', '456'] }));
  const component = shallowWithIntl(<DappVouchFor {...props} />, {
    context: { api: {} }
  });

  expect(shallowToJson(component)).toMatchSnapshot();
});
