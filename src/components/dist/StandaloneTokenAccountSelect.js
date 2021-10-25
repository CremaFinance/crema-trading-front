'use strict';
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
exports.__esModule = true;
var react_1 = require('react');
var markets_1 = require('../utils/markets');
var antd_1 = require('antd');
var icons_1 = require('@ant-design/icons');
var utils_1 = require('../utils/utils');
var notifications_1 = require('../utils/notifications');
function StandaloneTokenAccountsSelect(_a) {
  var accounts = _a.accounts,
    mint = _a.mint,
    label = _a.label;
  var _b = markets_1.useSelectedTokenAccounts(),
    selectedTokenAccounts = _b[0],
    setSelectedTokenAccounts = _b[1];
  var selectedValue;
  if (mint && mint in selectedTokenAccounts) {
    selectedValue = selectedTokenAccounts[mint];
  } else if (
    accounts &&
    (accounts === null || accounts === void 0 ? void 0 : accounts.length) > 0
  ) {
    selectedValue = accounts[0].pubkey.toBase58();
  } else {
    selectedValue = undefined;
  }
  var setTokenAccountForCoin = function (value) {
    if (!mint) {
      notifications_1.notify({
        message: 'Error selecting token account',
        description: 'Mint is undefined',
        type: 'error',
      });
      return;
    }
    var newSelectedTokenAccounts = __assign({}, selectedTokenAccounts);
    newSelectedTokenAccounts[mint] = value;
    setSelectedTokenAccounts(newSelectedTokenAccounts);
  };
  var toCopy = function (value) {
    // navigator.clipboard.writeText(value)
    var aux = document.createElement('input');
    // aux.setAttribute("value", toCopy);
    aux.setAttribute('value', value);
    document.body.appendChild(aux);
    aux.select();
    document.execCommand('copy');
    document.body.removeChild(aux);
    notifications_1.notify({
      message: 'Copy successfully',
      description: '',
      type: 'success',
    });
  };
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    label && react_1['default'].createElement('span', null, 'Token account:'),
    react_1['default'].createElement(
      antd_1.Select,
      {
        style: { width: '160px', border: 'none' },
        className: 'token-account-select',
        value: selectedValue,
        onSelect: setTokenAccountForCoin,
        suffixIcon: '',
      },
      accounts === null || accounts === void 0
        ? void 0
        : accounts.map(function (account) {
            return react_1['default'].createElement(
              antd_1.Select.Option,
              {
                key: account.pubkey.toBase58(),
                value: account.pubkey.toBase58(),
              },
              label
                ? utils_1.abbreviateAddress(account.pubkey, 8)
                : account.pubkey.toBase58(),
            );
          }),
    ),
    react_1['default'].createElement(antd_1.Button, {
      shape: 'round',
      icon: react_1['default'].createElement(icons_1.CopyOutlined, null),
      size: 'small',
      style: { border: 'none', position: 'absolute', right: '0px', top: '4px' },
      onClick: function () {
        return selectedValue && toCopy(selectedValue);
      },
    }),
  );
}
exports['default'] = StandaloneTokenAccountsSelect;
