'use strict';

var __makeTemplateObject =
  (void 0 && (void 0).__makeTemplateObject) ||
  function (cooked, raw) {
    if (Object.defineProperty) {
      Object.defineProperty(cooked, 'raw', {
        value: raw,
      });
    } else {
      cooked.raw = raw;
    }

    return cooked;
  };

var __assign =
  (void 0 && (void 0).__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];

          for (var p in s) {
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
          }
        }

        return t;
      };

    return __assign.apply(this, arguments);
  };

var __awaiter =
  (void 0 && (void 0).__awaiter) ||
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
  (void 0 && (void 0).__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function sent() {
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
      (g = {
        next: verb(0),
        throw: verb(1),
        return: verb(2),
      }),
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

      while (_) {
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
              return {
                value: op[1],
                done: false,
              };

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
      }

      if (op[0] & 5) throw op[1];
      return {
        value: op[0] ? op[1] : void 0,
        done: true,
      };
    }
  };

exports.__esModule = true;

var antd_1 = require('antd');

var react_1 = require('react');

var styled_components_1 = require('styled-components');

var markets_1 = require('../utils/markets');

var wallet_1 = require('../utils/wallet');

var notifications_1 = require('../utils/notifications');

var utils_1 = require('../utils/utils');

var connection_1 = require('../utils/connection');

var FloatingElement_1 = require('./layout/FloatingElement');

var send_1 = require('../utils/send');

var fetch_loop_1 = require('../utils/fetch-loop');

var immutable_tuple_1 = require('immutable-tuple');

var useInterval_1 = require('../utils/useInterval');

var SellButton = styled_components_1['default'](antd_1.Button)(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      [
        '\n  margin: 20px 0px 0px 0px;\n  background: #f23b69;\n  border-color: #f23b69;\n',
      ],
      [
        '\n  margin: 20px 0px 0px 0px;\n  background: #f23b69;\n  border-color: #f23b69;\n',
      ],
    )),
);
var BuyButton = styled_components_1['default'](antd_1.Button)(
  templateObject_2 ||
    (templateObject_2 = __makeTemplateObject(
      [
        '\n  margin: 20px 0px 0px 0px;\n  background: #14886B;\n  border-color: #14886B;\n',
      ],
      [
        '\n  margin: 20px 0px 0px 0px;\n  background: #14886B;\n  border-color: #14886B;\n',
      ],
    )),
);
var sliderMarks = {
  0: '0%',
  25: '25%',
  50: '50%',
  75: '75%',
  100: '100%',
};

function TradeForm(_a) {
  var _this = this;

  var style = _a.style,
    setChangeOrderRef = _a.setChangeOrderRef;

  var _b = react_1.useState('buy'),
    side = _b[0],
    setSide = _b[1];

  var _c = markets_1.useMarket(),
    baseCurrency = _c.baseCurrency,
    quoteCurrency = _c.quoteCurrency,
    market = _c.market;

  var baseCurrencyBalances = markets_1.useSelectedBaseCurrencyBalances();
  var quoteCurrencyBalances = markets_1.useSelectedQuoteCurrencyBalances();
  var baseCurrencyAccount = markets_1.useSelectedBaseCurrencyAccount();
  var quoteCurrencyAccount = markets_1.useSelectedQuoteCurrencyAccount();
  var openOrdersAccount = markets_1.useSelectedOpenOrdersAccount(true);

  var _d = wallet_1.useWallet(),
    wallet = _d.wallet,
    connected = _d.connected,
    select = _d.select;

  var sendConnection = connection_1.useSendConnection();
  var markPrice = markets_1.useMarkPrice();
  markets_1.useFeeDiscountKeys();
  var feeDiscountKey =
    markets_1.useLocallyStoredFeeDiscountKey().storedFeeDiscountKey;

  var _e = react_1.useState(false),
    postOnly = _e[0],
    setPostOnly = _e[1];

  var _f = react_1.useState(false),
    ioc = _f[0],
    setIoc = _f[1];

  var _g = react_1.useState(undefined),
    baseSize = _g[0],
    setBaseSize = _g[1];

  var _h = react_1.useState(undefined),
    quoteSize = _h[0],
    setQuoteSize = _h[1];

  var _j = react_1.useState(undefined),
    price = _j[0],
    setPrice = _j[1];

  var _k = react_1.useState(false),
    submitting = _k[0],
    setSubmitting = _k[1];

  var _l = react_1.useState(0),
    sizeFraction = _l[0],
    setSizeFraction = _l[1];

  var autoSettleEnabled = utils_1.useLocalStorageState(
    'autoSettleEnabled',
    true,
  )[0];
  var availableQuote =
    openOrdersAccount && market
      ? market.quoteSplSizeToNumber(openOrdersAccount.quoteTokenFree)
      : 0;
  var quoteBalance = (quoteCurrencyBalances || 0) + (availableQuote || 0);
  var baseBalance = baseCurrencyBalances || 0;
  var sizeDecimalCount =
    (market === null || market === void 0 ? void 0 : market.minOrderSize) &&
    utils_1.getDecimalCount(market.minOrderSize);
  var priceDecimalCount =
    (market === null || market === void 0 ? void 0 : market.tickSize) &&
    utils_1.getDecimalCount(market.tickSize);
  var publicKey =
    wallet === null || wallet === void 0 ? void 0 : wallet.publicKey;
  react_1.useEffect(
    function () {
      setChangeOrderRef && setChangeOrderRef(doChangeOrder); // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [setChangeOrderRef],
  );
  react_1.useEffect(
    function () {
      baseSize && price && onSliderChange(sizeFraction); // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [side],
  );
  react_1.useEffect(
    function () {
      updateSizeFraction(); // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [price, baseSize],
  );
  react_1.useEffect(
    function () {
      var warmUpCache = function warmUpCache() {
        return __awaiter(_this, void 0, void 0, function () {
          var startTime, endTime, e_1;
          return __generator(this, function (_a) {
            switch (_a.label) {
              case 0:
                _a.trys.push([0, 3, , 4]);

                if (!wallet || !publicKey || !market) {
                  console.log('Skipping refreshing accounts');
                  return [
                    2,
                    /*return*/
                  ];
                }

                startTime = send_1.getUnixTs();
                console.log('Refreshing accounts for ' + market.address);
                return [
                  4,
                  /*yield*/
                  market === null || market === void 0
                    ? void 0
                    : market.findOpenOrdersAccountsForOwner(
                        sendConnection,
                        publicKey,
                      ),
                ];

              case 1:
                _a.sent();

                return [
                  4,
                  /*yield*/
                  market === null || market === void 0
                    ? void 0
                    : market.findBestFeeDiscountKey(sendConnection, publicKey),
                ];

              case 2:
                _a.sent();

                endTime = send_1.getUnixTs();
                console.log(
                  'Finished refreshing accounts for ' +
                    market.address +
                    ' after ' +
                    (endTime - startTime),
                );
                return [
                  3, /*break*/
                  4,
                ];

              case 3:
                e_1 = _a.sent();
                console.log(
                  'Encountered error when refreshing trading accounts: ' + e_1,
                );
                return [
                  3, /*break*/
                  4,
                ];

              case 4:
                return [
                  2,
                  /*return*/
                ];
            }
          });
        });
      };

      warmUpCache();
      var id = setInterval(warmUpCache, 30000);
      return function () {
        return clearInterval(id);
      };
    },
    [market, sendConnection, wallet, publicKey],
  );
  useInterval_1.useInterval(function () {
    var autoSettle = function autoSettle() {
      return __awaiter(_this, void 0, void 0, function () {
        var e_2;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (
                !wallet ||
                !market ||
                !openOrdersAccount ||
                !baseCurrencyAccount ||
                !quoteCurrencyAccount
              ) {
                return [
                  2,
                  /*return*/
                ];
              }

              _a.label = 1;

            case 1:
              _a.trys.push([1, 3, , 4]); // settle funds into selected token wallets

              return [
                4,
                /*yield*/
                send_1.settleFunds({
                  market: market,
                  openOrders: openOrdersAccount,
                  connection: sendConnection,
                  wallet: wallet,
                  baseCurrencyAccount: baseCurrencyAccount,
                  quoteCurrencyAccount: quoteCurrencyAccount,
                }),
              ];

            case 2:
              // settle funds into selected token wallets
              _a.sent();

              return [
                3, /*break*/
                4,
              ];

            case 3:
              e_2 = _a.sent();
              console.log('Error auto settling funds: ' + e_2.message);
              return [
                3, /*break*/
                4,
              ];

            case 4:
              return [
                2,
                /*return*/
              ];
          }
        });
      });
    };

    connected &&
      (wallet === null || wallet === void 0 ? void 0 : wallet.autoApprove) &&
      autoSettleEnabled &&
      autoSettle();
  }, 10000);

  var onSetBaseSize = function onSetBaseSize(baseSize) {
    setBaseSize(baseSize);

    if (!baseSize) {
      setQuoteSize(undefined);
      return;
    }

    var usePrice = price || markPrice;

    if (!usePrice) {
      setQuoteSize(undefined);
      return;
    }

    var rawQuoteSize = baseSize * usePrice;
    var quoteSize =
      baseSize && utils_1.roundToDecimal(rawQuoteSize, sizeDecimalCount);
    setQuoteSize(quoteSize);
  };

  var onSetQuoteSize = function onSetQuoteSize(quoteSize) {
    setQuoteSize(quoteSize);

    if (!quoteSize) {
      setBaseSize(undefined);
      return;
    }

    var usePrice = price || markPrice;

    if (!usePrice) {
      setBaseSize(undefined);
      return;
    }

    var rawBaseSize = quoteSize / usePrice;
    var baseSize =
      quoteSize && utils_1.roundToDecimal(rawBaseSize, sizeDecimalCount);
    setBaseSize(baseSize);
  };

  var doChangeOrder = function doChangeOrder(_a) {
    var size = _a.size,
      price = _a.price;
    var formattedSize = size && utils_1.roundToDecimal(size, sizeDecimalCount);
    var formattedPrice =
      price && utils_1.roundToDecimal(price, priceDecimalCount);
    formattedSize && onSetBaseSize(formattedSize);
    formattedPrice && setPrice(formattedPrice);
  };

  var updateSizeFraction = function updateSizeFraction() {
    var rawMaxSize =
      side === 'buy' ? quoteBalance / (price || markPrice || 1) : baseBalance;
    var maxSize = utils_1.floorToDecimal(rawMaxSize, sizeDecimalCount);
    var sizeFraction = Math.min(((baseSize || 0) / maxSize) * 100, 100);
    setSizeFraction(sizeFraction);
  };

  var onSliderChange = function onSliderChange(value) {
    if (!price && markPrice) {
      var formattedMarkPrice = priceDecimalCount
        ? markPrice.toFixed(priceDecimalCount)
        : markPrice;
      setPrice(
        typeof formattedMarkPrice === 'number'
          ? formattedMarkPrice
          : parseFloat(formattedMarkPrice),
      );
    }

    var newSize;

    if (side === 'buy') {
      if (price || markPrice) {
        newSize = ((quoteBalance / (price || markPrice || 1)) * value) / 100;
      }
    } else {
      newSize = (baseBalance * value) / 100;
    } // round down to minOrderSize increment

    var formatted = utils_1.floorToDecimal(newSize, sizeDecimalCount);
    onSetBaseSize(formatted);
  };

  var postOnChange = function postOnChange(checked) {
    if (checked) {
      setIoc(false);
    }

    setPostOnly(checked);
  };

  var iocOnChange = function iocOnChange(checked) {
    if (checked) {
      setPostOnly(false);
    }

    setIoc(checked);
  };

  function onSubmit() {
    return __awaiter(this, void 0, void 0, function () {
      var e_3;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!price) {
              console.warn('Missing price');
              notifications_1.notify({
                message: 'Missing price',
                type: 'error',
              });
              return [
                2,
                /*return*/
              ];
            } else if (!baseSize) {
              console.warn('Missing size');
              notifications_1.notify({
                message: 'Missing size',
                type: 'error',
              });
              return [
                2,
                /*return*/
              ];
            }

            setSubmitting(true);
            _a.label = 1;

          case 1:
            _a.trys.push([1, 3, 4, 5]);

            if (!wallet) {
              return [
                2,
                /*return*/
                null,
              ];
            }

            return [
              4,
              /*yield*/
              send_1.placeOrder({
                side: side,
                price: price,
                size: baseSize,
                orderType: ioc ? 'ioc' : postOnly ? 'postOnly' : 'limit',
                market: market,
                connection: sendConnection,
                wallet: wallet,
                baseCurrencyAccount:
                  baseCurrencyAccount === null || baseCurrencyAccount === void 0
                    ? void 0
                    : baseCurrencyAccount.pubkey,
                quoteCurrencyAccount:
                  quoteCurrencyAccount === null ||
                  quoteCurrencyAccount === void 0
                    ? void 0
                    : quoteCurrencyAccount.pubkey,
                feeDiscountPubkey: feeDiscountKey,
              }),
            ];

          case 2:
            _a.sent();

            fetch_loop_1.refreshCache(
              immutable_tuple_1['default'](
                'getTokenAccounts',
                wallet,
                connected,
              ),
            );
            setPrice(undefined);
            onSetBaseSize(undefined);
            return [
              3, /*break*/
              5,
            ];

          case 3:
            e_3 = _a.sent();
            console.warn(e_3);
            notifications_1.notify({
              message: 'Error placing order',
              description: e_3.message,
              type: 'error',
            });
            return [
              3, /*break*/
              5,
            ];

          case 4:
            setSubmitting(false);
            return [
              7,
              /*endfinally*/
            ];

          case 5:
            return [
              2,
              /*return*/
            ];
        }
      });
    });
  }

  return react_1['default'].createElement(
    FloatingElement_1['default'],
    {
      style: __assign(
        {
          display: 'flex',
          flexDirection: 'column',
        },
        style,
      ),
    },
    react_1['default'].createElement(
      'div',
      {
        style: {
          flex: 1,
        },
      },
      react_1['default'].createElement(
        antd_1.Radio.Group,
        {
          onChange: function onChange(e) {
            return setSide(e.target.value);
          },
          value: side,
          buttonStyle: 'solid',
          style: {
            width: '100%',
            borderColor: side === 'buy' ? '#14886B' : '#C24E4F',
            borderStyle: 'solid',
            borderWidth: '2px',
            borderRadius: '12px',
            overflow: 'hidden',
          },
        },
        react_1['default'].createElement(
          antd_1.Radio.Button,
          {
            value: 'buy',
            style: {
              width: '50%',
              height: '36px',
              lineHeight: '36px',
              textAlign: 'center',
              background: side === 'buy' ? '#14886B' : '',
              // borderColor: side === 'buy' ? '#1FB690' : '',
              border: 'none',
            },
          },
          'BUY',
        ),
        react_1['default'].createElement(
          antd_1.Radio.Button,
          {
            value: 'sell',
            style: {
              width: '50%',
              height: '36px',
              lineHeight: '36px',
              textAlign: 'center',
              background: side === 'sell' ? '#C24E4F' : '',
              // borderColor: side === 'sell' ? '#F23B69' : '',
              border: 'none',
            },
          },
          'SELL',
        ),
      ),
      react_1['default'].createElement(
        'div',
        {
          className: 'gradient-input-back',
        },
        react_1['default'].createElement(antd_1.Input, {
          className: 'gradient-input-content gradient-input-content-padding',
          style: {
            textAlign: 'right',
          },
          // addonBefore={<div style={{ width: '30px' }}>Price</div>}
          suffix: react_1['default'].createElement(
            'span',
            {
              style: {
                fontSize: 10,
                opacity: 0.5,
              },
            },
            quoteCurrency,
          ),
          value: price,
          type: 'number',
          step:
            (market === null || market === void 0 ? void 0 : market.tickSize) ||
            1,
          // placeholder="Price"
          onChange: function onChange(e) {
            return setPrice(parseFloat(e.target.value));
          },
        }),
        react_1['default'].createElement(
          'span',
          {
            className: 'input-placeholder',
          },
          'Price',
        ),
      ),
      react_1['default'].createElement(
        'div',
        {
          className: 'gradient-input-back',
        },
        react_1['default'].createElement(antd_1.Input, {
          className: 'gradient-input-content gradient-input-content-padding',
          // style={{ width: 'calc(50% + 30px)', textAlign: 'right' }}
          // addonBefore={<div style={{ width: '30px' }}>Size</div>}
          // placeholder="Amount"
          suffix: react_1['default'].createElement(
            'span',
            {
              style: {
                fontSize: 10,
                opacity: 0.5,
              },
            },
            baseCurrency,
          ),
          value: baseSize,
          type: 'number',
          step:
            (market === null || market === void 0
              ? void 0
              : market.minOrderSize) || 1,
          onChange: function onChange(e) {
            return onSetBaseSize(parseFloat(e.target.value));
          },
        }),
        react_1['default'].createElement(
          'span',
          {
            className: 'input-placeholder',
          },
          'Amount',
        ),
      ),
      react_1['default'].createElement(
        'div',
        {
          className: 'gradient-input-back',
        },
        react_1['default'].createElement(antd_1.Input, {
          className: 'gradient-input-content gradient-input-content-padding',
          // placeholder="Total"
          // style={{ width: 'calc(50% - 30px)', textAlign: 'right' }}
          suffix: react_1['default'].createElement(
            'span',
            {
              style: {
                fontSize: 10,
                opacity: 0.5,
              },
            },
            quoteCurrency,
          ),
          value: quoteSize,
          type: 'number',
          step:
            (market === null || market === void 0
              ? void 0
              : market.minOrderSize) || 1,
          onChange: function onChange(e) {
            return onSetQuoteSize(parseFloat(e.target.value));
          },
        }),
        react_1['default'].createElement(
          'span',
          {
            className: 'input-placeholder',
          },
          'Total',
        ),
      ),
      react_1['default'].createElement(antd_1.Slider, {
        value: sizeFraction,
        tipFormatter: function tipFormatter(value) {
          return value + '%';
        },
        marks: sliderMarks,
        onChange: onSliderChange,
      }),
      react_1['default'].createElement(
        'div',
        {
          style: {
            paddingTop: 18,
            display: 'flex',
            alignItems: 'center',
          },
        },
        react_1['default'].createElement(
          'div',
          null,
          'POST Only ',
          react_1['default'].createElement(antd_1.Switch, {
            checked: postOnly,
            onChange: postOnChange,
            style: {
              marginRight: 40,
            },
          }),
        ),
        react_1['default'].createElement(
          'div',
          null,
          'IOC ',
          react_1['default'].createElement(antd_1.Switch, {
            checked: ioc,
            onChange: iocOnChange,
          }),
        ),
      ),
    ),
    side === 'buy' && connected
      ? react_1['default'].createElement(
          BuyButton,
          {
            className: 'gradient-btn-back',
            disabled: !price || !baseSize,
            onClick: onSubmit,
            block: true,
            type: 'primary',
            size: 'large',
            loading: submitting,
          },
          'Buy ',
          baseCurrency,
        )
      : null,
    side === 'sell' && connected
      ? react_1['default'].createElement(
          SellButton,
          {
            className: 'gradient-btn-back',
            disabled: !price || !baseSize,
            onClick: onSubmit,
            block: true,
            type: 'primary',
            size: 'large',
            loading: submitting,
          },
          'Sell ',
          baseCurrency,
        )
      : null,
    !connected
      ? react_1['default'].createElement(
          antd_1.Button,
          {
            className: 'gradient-btn-back',
            size: 'large',
            style: {
              marginTop: '20px',
            },
            onClick: select,
          },
          'Connect to a Wallet',
        )
      : null,
  );
}

exports['default'] = TradeForm;
var templateObject_1, templateObject_2;
