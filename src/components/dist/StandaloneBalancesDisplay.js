'use strict';
var __makeTemplateObject =
  (this && this.__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, 'raw', { value: raw });
    } else {
      cooked.raw = raw;
    }
    return cooked;
  };
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                  ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
var antd_1 = require('antd');
var react_1 = require('react');
var FloatingElement_1 = require('./layout/FloatingElement');
var styled_components_1 = require('styled-components');
var markets_1 = require('../utils/markets');
var DepositDialog_1 = require('./DepositDialog');
var wallet_1 = require('../utils/wallet');
var send_1 = require('../utils/send');
var connection_1 = require('../utils/connection');
var notifications_1 = require('../utils/notifications');
var StandaloneTokenAccountSelect_1 = require('./StandaloneTokenAccountSelect');
var LinkAddress_1 = require('./LinkAddress');
var icons_1 = require('@ant-design/icons');
var RowBox = styled_components_1['default'](antd_1.Row)(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      ['\n  padding-bottom: 20px;\n'],
      ['\n  padding-bottom: 20px;\n'],
    )),
);
var Tip = styled_components_1['default'].p(
  templateObject_2 ||
    (templateObject_2 = __makeTemplateObject(
      ['\n  font-size: 12px;\n  padding-top: 6px;\n  color: #FFBB00;'],
      ['\n  font-size: 12px;\n  padding-top: 6px;\n  color: #FFBB00;'],
    )),
);
var ActionButton = styled_components_1['default'](antd_1.Button)(
  templateObject_3 ||
    (templateObject_3 = __makeTemplateObject(
      [
        '\n  /* color: #07ebad; */\n  /* background-color: #212734; */\n  /* border-width: 0px; */\n  height: 28px;\n',
      ],
      [
        '\n  /* color: #07ebad; */\n  /* background-color: #212734; */\n  /* border-width: 0px; */\n  height: 28px;\n',
      ],
    )),
);
function StandaloneBalancesDisplay(_a) {
  var smallScreen = _a.smallScreen;
  var _b = markets_1.useMarket(),
    baseCurrency = _b.baseCurrency,
    quoteCurrency = _b.quoteCurrency,
    market = _b.market;
  var balances = markets_1.useBalances();
  var openOrdersAccount = markets_1.useSelectedOpenOrdersAccount(true);
  var connection = connection_1.useSendConnection();
  var _c = wallet_1.useWallet(),
    providerUrl = _c.providerUrl,
    providerName = _c.providerName,
    wallet = _c.wallet,
    connected = _c.connected;
  var _d = react_1.useState(''),
    baseOrQuote = _d[0],
    setBaseOrQuote = _d[1];
  var baseCurrencyAccount = markets_1.useSelectedBaseCurrencyAccount();
  var quoteCurrencyAccount = markets_1.useSelectedQuoteCurrencyAccount();
  var tokenAccounts = markets_1.useTokenAccounts()[0];
  var baseCurrencyBalances =
    balances &&
    balances.find(function (b) {
      return b.coin === baseCurrency;
    });
  var quoteCurrencyBalances =
    balances &&
    balances.find(function (b) {
      return b.coin === quoteCurrency;
    });
  function onSettleFunds() {
    return __awaiter(this, void 0, void 0, function () {
      var e_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!wallet) {
              notifications_1.notify({
                message: 'Wallet not connected',
                description: 'wallet is undefined',
                type: 'error',
              });
              return [2 /*return*/];
            }
            if (!market) {
              notifications_1.notify({
                message: 'Error settling funds',
                description: 'market is undefined',
                type: 'error',
              });
              return [2 /*return*/];
            }
            if (!openOrdersAccount) {
              notifications_1.notify({
                message: 'Error settling funds',
                description: 'Open orders account is undefined',
                type: 'error',
              });
              return [2 /*return*/];
            }
            if (!baseCurrencyAccount) {
              notifications_1.notify({
                message: 'Error settling funds',
                description: 'Open orders account is undefined',
                type: 'error',
              });
              return [2 /*return*/];
            }
            if (!quoteCurrencyAccount) {
              notifications_1.notify({
                message: 'Error settling funds',
                description: 'Open orders account is undefined',
                type: 'error',
              });
              return [2 /*return*/];
            }
            _a.label = 1;
          case 1:
            _a.trys.push([1, 3, , 4]);
            return [
              4 /*yield*/,
              send_1.settleFunds({
                market: market,
                openOrders: openOrdersAccount,
                connection: connection,
                wallet: wallet,
                baseCurrencyAccount: baseCurrencyAccount,
                quoteCurrencyAccount: quoteCurrencyAccount,
              }),
            ];
          case 2:
            _a.sent();
            return [3 /*break*/, 4];
          case 3:
            e_1 = _a.sent();
            notifications_1.notify({
              message: 'Error settling funds',
              description: e_1.message,
              type: 'error',
            });
            return [3 /*break*/, 4];
          case 4:
            return [2 /*return*/];
        }
      });
    });
  }
  var formattedBalances = [
    [
      baseCurrency,
      baseCurrencyBalances,
      'base',
      market === null || market === void 0
        ? void 0
        : market.baseMintAddress.toBase58(),
    ],
    [
      quoteCurrency,
      quoteCurrencyBalances,
      'quote',
      market === null || market === void 0
        ? void 0
        : market.quoteMintAddress.toBase58(),
    ],
  ];
  return react_1['default'].createElement(
    FloatingElement_1['default'],
    {
      style: smallScreen
        ? { flex: 1, paddingTop: 10, marginTop: 0, minHeight: 546 }
        : {
            flex: 1,
            paddingTop: 10,
            marginTop: 0,
            minHeight: 'calc(100vh - 507px)',
          },
    },
    react_1['default'].createElement(
      Tip,
      null,
      react_1['default'].createElement(
        'label',
        { style: { fontWeight: 700, color: '#DBDBDB', marginRight: '14px' } },
        'Asset Info',
      ),
      react_1['default'].createElement(
        'span',
        null,
        'All deposits go to your',
        ' ',
      ),
      react_1['default'].createElement('span', null, 'wallet'),
      react_1['default'].createElement('p', { className: 'border-bottom' }),
    ),
    formattedBalances.map(function (_a, index) {
      var currency = _a[0],
        balances = _a[1],
        baseOrQuote = _a[2],
        mint = _a[3];
      return react_1['default'].createElement(
        react_1['default'].Fragment,
        { key: index },
        react_1['default'].createElement(
          antd_1.Row,
          { align: 'middle', justify: 'start', style: { padding: '20px 0px' } },
          react_1['default'].createElement(
            antd_1.Col,
            { style: { flex: 1 } },
            currency,
            ' ',
            mint &&
              react_1['default'].createElement(
                antd_1.Popover,
                {
                  overlayClassName: 'ant-popover-address',
                  content: react_1['default'].createElement(
                    LinkAddress_1['default'],
                    { address: mint },
                  ),
                  placement: 'bottomRight',
                  title: 'Token mint',
                  trigger: 'hover',
                },
                react_1['default'].createElement(icons_1.InfoCircleOutlined, {
                  style: { color: '#FFFFFF' },
                }),
              ),
          ),
          react_1['default'].createElement(
            antd_1.Col,
            null,
            react_1['default'].createElement(
              'div',
              { className: 'disconnect-btn-box' },
              react_1['default'].createElement(
                ActionButton,
                {
                  ghost: true,
                  className: 'disconnect-btn',
                  onClick: function () {
                    return setBaseOrQuote(baseOrQuote);
                  },
                },
                'Deposit',
              ),
            ),
          ),
          react_1['default'].createElement(
            antd_1.Col,
            { style: { marginLeft: 12 } },
            react_1['default'].createElement(
              'div',
              { className: 'disconnect-btn-box' },
              react_1['default'].createElement(
                ActionButton,
                {
                  className: 'disconnect-btn',
                  ghost: true,
                  onClick: onSettleFunds,
                },
                'Settle',
              ),
            ),
          ),
        ),
        connected &&
          react_1['default'].createElement(
            antd_1.Row,
            {
              align: 'middle',
              style: {
                padding: '0px 12px',
                border: '1px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '10px',
                fontSize: '12px',
                display: 'flex',
                position: 'relative',
              },
            },
            react_1['default'].createElement(
              StandaloneTokenAccountSelect_1['default'],
              {
                accounts:
                  tokenAccounts === null || tokenAccounts === void 0
                    ? void 0
                    : tokenAccounts.filter(function (account) {
                        return account.effectiveMint.toBase58() === mint;
                      }),
                mint: mint,
                label: true,
              },
            ),
          ),
        react_1['default'].createElement(
          antd_1.Row,
          {
            style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '20px',
            },
          },
          react_1['default'].createElement(
            antd_1.Col,
            null,
            react_1['default'].createElement(
              'div',
              null,
              (balances && balances.wallet) || '0.00',
            ),
            react_1['default'].createElement(
              'div',
              { style: { color: 'rgba(255, 255, 255, 0.5)' } },
              'Wallet balance',
            ),
          ),
          react_1['default'].createElement(
            antd_1.Col,
            { style: { textAlign: 'right' } },
            react_1['default'].createElement(
              'div',
              null,
              (balances && balances.unsettled) || '0.00',
            ),
            react_1['default'].createElement(
              'div',
              { style: { color: 'rgba(255, 255, 255, 0.5)' } },
              'Unsettled balance',
            ),
          ),
        ),
      );
    }),
    react_1['default'].createElement(DepositDialog_1['default'], {
      baseOrQuote: baseOrQuote,
      onClose: function () {
        return setBaseOrQuote('');
      },
    }),
  );
}
exports['default'] = StandaloneBalancesDisplay;
var templateObject_1, templateObject_2, templateObject_3;
