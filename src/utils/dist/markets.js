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
var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j];
    return r;
  };
exports.__esModule = true;
exports.useCurrentlyAutoSettling =
  exports.getExpectedFillPrice =
  exports.getMarketOrderPrice =
  exports.useMarketInfos =
  exports.getMarketInfos =
  exports.useBalancesForDeprecatedMarkets =
  exports.useGetOpenOrdersForDeprecatedMarkets =
  exports.useUnmigratedDeprecatedMarkets =
  exports.useWalletBalancesForAllMarkets =
  exports.useBalances =
  exports.useAllOpenOrders =
  exports.useAllOpenOrdersBalances =
  exports.useAllOpenOrdersAccounts =
  exports.useFills =
  exports.useFeeDiscountKeys =
  exports.useLocallyStoredFeeDiscountKey =
  exports.useTrades =
  exports.useOpenOrders =
  exports.useSelectedBaseCurrencyBalances =
  exports.useSelectedQuoteCurrencyBalances =
  exports.useSelectedBaseCurrencyAccount =
  exports.useSelectedQuoteCurrencyAccount =
  exports.getSelectedTokenAccountForMint =
  exports.useTokenAccounts =
  exports.useSelectedOpenOrdersAccount =
  exports.useOpenOrdersAccounts =
  exports.useOrderbook =
  exports.useOrderbookAccounts =
  exports.useBonfidaTrades =
  exports._useUnfilteredTrades =
  exports.useMarkPrice =
  exports.useMarket =
  exports.useSelectedTokenAccounts =
  exports.getTradePageUrl =
  exports.MarketProvider =
  exports.useCustomMarkets =
  exports.getMarketDetails =
  exports.DEFAULT_MARKET =
  exports.useUnmigratedOpenOrdersAccounts =
  exports.useAllMarkets =
  exports.useMarketsList =
  exports.USE_MARKETS =
    void 0;
var serum_1 = require('@project-serum/serum');
var web3_js_1 = require('@solana/web3.js');
var react_1 = require('react');
var utils_1 = require('./utils');
var fetch_loop_1 = require('./fetch-loop');
var connection_1 = require('./connection');
var wallet_1 = require('./wallet');
var immutable_tuple_1 = require('immutable-tuple');
var notifications_1 = require('./notifications');
var bn_js_1 = require('bn.js');
var tokens_1 = require('./tokens');
var token_instructions_1 = require('@project-serum/serum/lib/token-instructions');
var bonfidaConnector_1 = require('./bonfidaConnector');
// Used in debugging, should be false in production
var _IGNORE_DEPRECATED = false;
exports.USE_MARKETS = _IGNORE_DEPRECATED
  ? serum_1.MARKETS.map(function (m) {
      return __assign(__assign({}, m), { deprecated: false });
    })
  : serum_1.MARKETS;
function useMarketsList() {
  // return USE_MARKETS.filter(({ name, deprecated }) => !deprecated && !process.env.REACT_APP_EXCLUDE_MARKETS?.includes(name));
  // SOL/USDT SOL/USDC 和SRM/USDC  SRM/USDT  SRM/SOL
  var showObj = {
    'SOL/USDT': true,
    'SOL/USDC': true,
    'SRM/USDC': true,
    'SRM/USDT': true,
    'SRM/SOL': true,
  };
  var list = exports.USE_MARKETS.filter(function (_a) {
    var _b;
    var name = _a.name,
      deprecated = _a.deprecated;
    return (
      !deprecated &&
      !((_b = process.env.REACT_APP_EXCLUDE_MARKETS) === null || _b === void 0
        ? void 0
        : _b.includes(name)) &&
      showObj[name]
    );
  });
  console.log('useMarketsList###list####', list);
  return list;
}
exports.useMarketsList = useMarketsList;
function useAllMarkets() {
  var _this = this;
  var connection = connection_1.useConnection();
  var customMarkets = useCustomMarkets().customMarkets;
  var getAllMarkets = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var markets;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [
              4 /*yield*/,
              Promise.all(
                getMarketInfos(customMarkets).map(function (marketInfo) {
                  return __awaiter(_this, void 0, void 0, function () {
                    var market, e_1;
                    return __generator(this, function (_a) {
                      switch (_a.label) {
                        case 0:
                          _a.trys.push([0, 2, , 3]);
                          return [
                            4 /*yield*/,
                            serum_1.Market.load(
                              connection,
                              marketInfo.address,
                              {},
                              marketInfo.programId,
                            ),
                          ];
                        case 1:
                          market = _a.sent();
                          return [
                            2 /*return*/,
                            {
                              market: market,
                              marketName: marketInfo.name,
                              programId: marketInfo.programId,
                            },
                          ];
                        case 2:
                          e_1 = _a.sent();
                          notifications_1.notify({
                            message: 'Error loading all market',
                            description: e_1.message,
                            type: 'error',
                          });
                          return [2 /*return*/, null];
                        case 3:
                          return [2 /*return*/];
                      }
                    });
                  });
                }),
              ),
            ];
          case 1:
            markets = _a.sent();
            return [
              2 /*return*/,
              markets.filter(function (m) {
                return !!m;
              }),
            ];
        }
      });
    });
  };
  return fetch_loop_1.useAsyncData(
    getAllMarkets,
    immutable_tuple_1['default'](
      'getAllMarkets',
      customMarkets.length,
      connection,
    ),
    { refreshInterval: _VERY_SLOW_REFRESH_INTERVAL },
  );
}
exports.useAllMarkets = useAllMarkets;
function useUnmigratedOpenOrdersAccounts() {
  var _a;
  var connection = connection_1.useConnection();
  var wallet = wallet_1.useWallet().wallet;
  function getUnmigratedOpenOrdersAccounts() {
    return __awaiter(this, void 0, Promise, function () {
      var deprecatedOpenOrdersAccounts,
        deprecatedProgramIds,
        programId,
        _i,
        deprecatedProgramIds_1,
        openOrdersAccounts,
        e_2;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!wallet || !connection || !wallet.publicKey) {
              return [2 /*return*/, []];
            }
            console.log('refreshing useUnmigratedOpenOrdersAccounts');
            deprecatedOpenOrdersAccounts = [];
            deprecatedProgramIds = Array.from(
              new Set(
                exports.USE_MARKETS.filter(function (_a) {
                  var deprecated = _a.deprecated;
                  return deprecated;
                }).map(function (_a) {
                  var programId = _a.programId;
                  return programId.toBase58();
                }),
              ),
            ).map(function (publicKeyStr) {
              return new web3_js_1.PublicKey(publicKeyStr);
            });
            (_i = 0), (deprecatedProgramIds_1 = deprecatedProgramIds);
            _a.label = 1;
          case 1:
            if (!(_i < deprecatedProgramIds_1.length)) return [3 /*break*/, 6];
            programId = deprecatedProgramIds_1[_i];
            _a.label = 2;
          case 2:
            _a.trys.push([2, 4, , 5]);
            return [
              4 /*yield*/,
              serum_1.OpenOrders.findForOwner(
                connection,
                wallet.publicKey,
                programId,
              ),
            ];
          case 3:
            openOrdersAccounts = _a.sent();
            deprecatedOpenOrdersAccounts = deprecatedOpenOrdersAccounts.concat(
              openOrdersAccounts
                .filter(function (openOrders) {
                  return (
                    openOrders.baseTokenTotal.toNumber() ||
                    openOrders.quoteTokenTotal.toNumber()
                  );
                })
                .filter(function (openOrders) {
                  return exports.USE_MARKETS.some(function (market) {
                    return (
                      market.deprecated &&
                      market.address.equals(openOrders.market)
                    );
                  });
                }),
            );
            return [3 /*break*/, 5];
          case 4:
            e_2 = _a.sent();
            console.log(
              'Error loading deprecated markets',
              programId === null || programId === void 0
                ? void 0
                : programId.toBase58(),
              e_2.message,
            );
            return [3 /*break*/, 5];
          case 5:
            _i++;
            return [3 /*break*/, 1];
          case 6:
            // Maybe sort
            return [2 /*return*/, deprecatedOpenOrdersAccounts];
        }
      });
    });
  }
  var cacheKey = immutable_tuple_1['default'](
    'getUnmigratedOpenOrdersAccounts',
    connection,
    (_a = wallet === null || wallet === void 0 ? void 0 : wallet.publicKey) ===
      null || _a === void 0
      ? void 0
      : _a.toBase58(),
  );
  var accounts = fetch_loop_1.useAsyncData(
    getUnmigratedOpenOrdersAccounts,
    cacheKey,
    {
      refreshInterval: _VERY_SLOW_REFRESH_INTERVAL,
    },
  )[0];
  return {
    accounts: accounts,
    refresh: function (clearCache) {
      return fetch_loop_1.refreshCache(cacheKey, clearCache);
    },
  };
}
exports.useUnmigratedOpenOrdersAccounts = useUnmigratedOpenOrdersAccounts;
var MarketContext = react_1['default'].createContext(null);
var _VERY_SLOW_REFRESH_INTERVAL = 5000 * 1000;
// For things that don't really change
var _SLOW_REFRESH_INTERVAL = 5 * 1000;
// For things that change frequently
var _FAST_REFRESH_INTERVAL = 1000;
exports.DEFAULT_MARKET = exports.USE_MARKETS.find(function (_a) {
  var name = _a.name,
    deprecated = _a.deprecated;
  return name === 'SOL/USDT' && !deprecated;
});
function getMarketDetails(market, customMarkets) {
  var _a, _b;
  if (!market) {
    return {};
  }
  var marketInfos = getMarketInfos(customMarkets);
  var marketInfo = marketInfos.find(function (otherMarket) {
    return otherMarket.address.equals(market.address);
  });
  var baseCurrency =
    ((market === null || market === void 0 ? void 0 : market.baseMintAddress) &&
      ((_a = serum_1.TOKEN_MINTS.find(function (token) {
        return token.address.equals(market.baseMintAddress);
      })) === null || _a === void 0
        ? void 0
        : _a.name)) ||
    ((marketInfo === null || marketInfo === void 0
      ? void 0
      : marketInfo.baseLabel) &&
      (marketInfo === null || marketInfo === void 0
        ? void 0
        : marketInfo.baseLabel) + '*') ||
    'UNKNOWN';
  var quoteCurrency =
    ((market === null || market === void 0
      ? void 0
      : market.quoteMintAddress) &&
      ((_b = serum_1.TOKEN_MINTS.find(function (token) {
        return token.address.equals(market.quoteMintAddress);
      })) === null || _b === void 0
        ? void 0
        : _b.name)) ||
    ((marketInfo === null || marketInfo === void 0
      ? void 0
      : marketInfo.quoteLabel) &&
      (marketInfo === null || marketInfo === void 0
        ? void 0
        : marketInfo.quoteLabel) + '*') ||
    'UNKNOWN';
  return __assign(__assign({}, marketInfo), {
    marketName:
      marketInfo === null || marketInfo === void 0 ? void 0 : marketInfo.name,
    baseCurrency: baseCurrency,
    quoteCurrency: quoteCurrency,
    marketInfo: marketInfo,
  });
}
exports.getMarketDetails = getMarketDetails;
function useCustomMarkets() {
  var _a = utils_1.useLocalStorageState('customMarkets', []),
    customMarkets = _a[0],
    setCustomMarkets = _a[1];
  return { customMarkets: customMarkets, setCustomMarkets: setCustomMarkets };
}
exports.useCustomMarkets = useCustomMarkets;
function MarketProvider(_a) {
  var marketAddress = _a.marketAddress,
    setMarketAddress = _a.setMarketAddress,
    children = _a.children;
  var _b = useCustomMarkets(),
    customMarkets = _b.customMarkets,
    setCustomMarkets = _b.setCustomMarkets;
  var address = marketAddress && new web3_js_1.PublicKey(marketAddress);
  var connection = connection_1.useConnection();
  var marketInfos = getMarketInfos(customMarkets);
  var marketInfo =
    address &&
    marketInfos.find(function (market) {
      return market.address.equals(address);
    });
  // Replace existing market with a non-deprecated one on first load
  react_1.useEffect(function () {
    if (marketInfo && marketInfo.deprecated) {
      console.log('Switching markets from deprecated', marketInfo);
      if (exports.DEFAULT_MARKET) {
        setMarketAddress(exports.DEFAULT_MARKET.address.toBase58());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  var _c = react_1.useState(),
    market = _c[0],
    setMarket = _c[1];
  react_1.useEffect(
    function () {
      var _a;
      if (
        market &&
        marketInfo &&
        ((_a =
          // @ts-ignore
          market._decoded.ownAddress) === null || _a === void 0
          ? void 0
          : _a.equals(
              marketInfo === null || marketInfo === void 0
                ? void 0
                : marketInfo.address,
            ))
      ) {
        return;
      }
      setMarket(null);
      if (!marketInfo || !marketInfo.address) {
        notifications_1.notify({
          message: 'Error loading market',
          description: 'Please select a market from the dropdown',
          type: 'error',
        });
        return;
      }
      serum_1.Market.load(
        connection,
        marketInfo.address,
        {},
        marketInfo.programId,
      )
        .then(setMarket)
        ['catch'](function (e) {
          return notifications_1.notify({
            message: 'Error loading market',
            description: e.message,
            type: 'error',
          });
        });
      // eslint-disable-next-line
    },
    [connection, marketInfo],
  );
  return react_1['default'].createElement(
    MarketContext.Provider,
    {
      value: __assign(
        __assign({ market: market }, getMarketDetails(market, customMarkets)),
        {
          setMarketAddress: setMarketAddress,
          customMarkets: customMarkets,
          setCustomMarkets: setCustomMarkets,
        },
      ),
    },
    children,
  );
}
exports.MarketProvider = MarketProvider;
function getTradePageUrl(marketAddress) {
  if (!marketAddress) {
    var saved = localStorage.getItem('marketAddress');
    if (saved) {
      marketAddress = JSON.parse(saved);
    }
    marketAddress =
      marketAddress ||
      (exports.DEFAULT_MARKET === null || exports.DEFAULT_MARKET === void 0
        ? void 0
        : exports.DEFAULT_MARKET.address.toBase58()) ||
      '';
  }
  return '/market/' + marketAddress;
}
exports.getTradePageUrl = getTradePageUrl;
function useSelectedTokenAccounts() {
  var _a = utils_1.useLocalStorageState('selectedTokenAccounts', {}),
    selectedTokenAccounts = _a[0],
    setSelectedTokenAccounts = _a[1];
  return [selectedTokenAccounts, setSelectedTokenAccounts];
}
exports.useSelectedTokenAccounts = useSelectedTokenAccounts;
function useMarket() {
  var context = react_1.useContext(MarketContext);
  if (!context) {
    throw new Error('Missing market context');
  }
  return context;
}
exports.useMarket = useMarket;
function useMarkPrice() {
  var _a = react_1.useState(null),
    markPrice = _a[0],
    setMarkPrice = _a[1];
  var orderbook = useOrderbook()[0];
  var trades = useTrades();
  react_1.useEffect(
    function () {
      var _a, _b;
      var bb =
        ((_a =
          orderbook === null || orderbook === void 0
            ? void 0
            : orderbook.bids) === null || _a === void 0
          ? void 0
          : _a.length) > 0 && Number(orderbook.bids[0][0]);
      var ba =
        ((_b =
          orderbook === null || orderbook === void 0
            ? void 0
            : orderbook.asks) === null || _b === void 0
          ? void 0
          : _b.length) > 0 && Number(orderbook.asks[0][0]);
      var last = trades && trades.length > 0 && trades[0].price;
      var markPrice =
        bb && ba
          ? last
            ? [bb, ba, last].sort(function (a, b) {
                return a - b;
              })[1]
            : (bb + ba) / 2
          : null;
      setMarkPrice(markPrice);
    },
    [orderbook, trades],
  );
  return markPrice;
}
exports.useMarkPrice = useMarkPrice;
function _useUnfilteredTrades(limit) {
  if (limit === void 0) {
    limit = 10000;
  }
  var market = useMarket().market;
  var connection = connection_1.useConnection();
  function getUnfilteredTrades() {
    return __awaiter(this, void 0, Promise, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!market || !connection) {
              return [2 /*return*/, null];
            }
            return [4 /*yield*/, market.loadFills(connection, limit)];
          case 1:
            return [2 /*return*/, _a.sent()];
        }
      });
    });
  }
  var trades = fetch_loop_1.useAsyncData(
    getUnfilteredTrades,
    immutable_tuple_1['default']('getUnfilteredTrades', market, connection),
    { refreshInterval: _SLOW_REFRESH_INTERVAL },
  )[0];
  return trades;
  // NOTE: For now, websocket is too expensive since the event queue is large
  // and updates very frequently
  // let data = useAccountData(market && market._decoded.eventQueue);
  // if (!data) {
  //   return null;
  // }
  // const events = decodeEventQueue(data, limit);
  // return events
  //   .filter((event) => event.eventFlags.fill && event.nativeQuantityPaid.gtn(0))
  //   .map(market.parseFillEvent.bind(market));
}
exports._useUnfilteredTrades = _useUnfilteredTrades;
function useBonfidaTrades() {
  var market = useMarket().market;
  var marketAddress =
    market === null || market === void 0 ? void 0 : market.address.toBase58();
  function getBonfidaTrades() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!marketAddress) {
              return [2 /*return*/, null];
            }
            return [
              4 /*yield*/,
              bonfidaConnector_1['default'].getRecentTrades(marketAddress),
            ];
          case 1:
            return [2 /*return*/, _a.sent()];
        }
      });
    });
  }
  return fetch_loop_1.useAsyncData(
    getBonfidaTrades,
    immutable_tuple_1['default']('getBonfidaTrades', marketAddress),
    { refreshInterval: _SLOW_REFRESH_INTERVAL },
    false,
  );
}
exports.useBonfidaTrades = useBonfidaTrades;
function useOrderbookAccounts() {
  var market = useMarket().market;
  // @ts-ignore
  var bidData = connection_1.useAccountData(market && market._decoded.bids);
  // @ts-ignore
  var askData = connection_1.useAccountData(market && market._decoded.asks);
  return {
    bidOrderbook:
      market && bidData ? serum_1.Orderbook.decode(market, bidData) : null,
    askOrderbook:
      market && askData ? serum_1.Orderbook.decode(market, askData) : null,
  };
}
exports.useOrderbookAccounts = useOrderbookAccounts;
function useOrderbook(depth) {
  if (depth === void 0) {
    depth = 20;
  }
  var _a = useOrderbookAccounts(),
    bidOrderbook = _a.bidOrderbook,
    askOrderbook = _a.askOrderbook;
  var market = useMarket().market;
  var bids =
    !bidOrderbook || !market
      ? []
      : bidOrderbook.getL2(depth).map(function (_a) {
          var price = _a[0],
            size = _a[1];
          return [price, size];
        });
  var asks =
    !askOrderbook || !market
      ? []
      : askOrderbook.getL2(depth).map(function (_a) {
          var price = _a[0],
            size = _a[1];
          return [price, size];
        });
  return [{ bids: bids, asks: asks }, !!bids || !!asks];
}
exports.useOrderbook = useOrderbook;
// Want the balances table to be fast-updating, dont want open orders to flicker
// TODO: Update to use websocket
function useOpenOrdersAccounts(fast) {
  if (fast === void 0) {
    fast = false;
  }
  var market = useMarket().market;
  var _a = wallet_1.useWallet(),
    connected = _a.connected,
    wallet = _a.wallet;
  var connection = connection_1.useConnection();
  function getOpenOrdersAccounts() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!connected || !wallet) {
              return [2 /*return*/, null];
            }
            if (!market) {
              return [2 /*return*/, null];
            }
            return [
              4 /*yield*/,
              market.findOpenOrdersAccountsForOwner(
                connection,
                wallet.publicKey,
              ),
            ];
          case 1:
            return [2 /*return*/, _a.sent()];
        }
      });
    });
  }
  return fetch_loop_1.useAsyncData(
    getOpenOrdersAccounts,
    immutable_tuple_1['default'](
      'getOpenOrdersAccounts',
      wallet,
      market,
      connected,
    ),
    { refreshInterval: fast ? _FAST_REFRESH_INTERVAL : _SLOW_REFRESH_INTERVAL },
  );
}
exports.useOpenOrdersAccounts = useOpenOrdersAccounts;
function useSelectedOpenOrdersAccount(fast) {
  if (fast === void 0) {
    fast = false;
  }
  var accounts = useOpenOrdersAccounts(fast)[0];
  if (!accounts) {
    return null;
  }
  return accounts[0];
}
exports.useSelectedOpenOrdersAccount = useSelectedOpenOrdersAccount;
function useTokenAccounts() {
  var _a = wallet_1.useWallet(),
    connected = _a.connected,
    wallet = _a.wallet;
  var connection = connection_1.useConnection();
  function getTokenAccounts() {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!connected || !wallet) {
              return [2 /*return*/, null];
            }
            return [
              4 /*yield*/,
              tokens_1.getTokenAccountInfo(connection, wallet.publicKey),
            ];
          case 1:
            return [2 /*return*/, _a.sent()];
        }
      });
    });
  }
  return fetch_loop_1.useAsyncData(
    getTokenAccounts,
    immutable_tuple_1['default']('getTokenAccounts', wallet, connected),
    { refreshInterval: _SLOW_REFRESH_INTERVAL },
  );
}
exports.useTokenAccounts = useTokenAccounts;
function getSelectedTokenAccountForMint(accounts, mint, selectedPubKey) {
  if (!accounts || !mint) {
    return null;
  }
  var filtered = accounts.filter(function (_a) {
    var effectiveMint = _a.effectiveMint,
      pubkey = _a.pubkey;
    return (
      mint.equals(effectiveMint) &&
      (!selectedPubKey ||
        (typeof selectedPubKey === 'string'
          ? selectedPubKey
          : selectedPubKey.toBase58()) === pubkey.toBase58())
    );
  });
  return filtered && filtered[0];
}
exports.getSelectedTokenAccountForMint = getSelectedTokenAccountForMint;
function useSelectedQuoteCurrencyAccount() {
  var accounts = useTokenAccounts()[0];
  var market = useMarket().market;
  var selectedTokenAccounts = useSelectedTokenAccounts()[0];
  var mintAddress =
    market === null || market === void 0 ? void 0 : market.quoteMintAddress;
  return getSelectedTokenAccountForMint(
    accounts,
    mintAddress,
    mintAddress && selectedTokenAccounts[mintAddress.toBase58()],
  );
}
exports.useSelectedQuoteCurrencyAccount = useSelectedQuoteCurrencyAccount;
function useSelectedBaseCurrencyAccount() {
  var accounts = useTokenAccounts()[0];
  var market = useMarket().market;
  var selectedTokenAccounts = useSelectedTokenAccounts()[0];
  var mintAddress =
    market === null || market === void 0 ? void 0 : market.baseMintAddress;
  return getSelectedTokenAccountForMint(
    accounts,
    mintAddress,
    mintAddress && selectedTokenAccounts[mintAddress.toBase58()],
  );
}
exports.useSelectedBaseCurrencyAccount = useSelectedBaseCurrencyAccount;
// TODO: Update to use websocket
function useSelectedQuoteCurrencyBalances() {
  var _a;
  var quoteCurrencyAccount = useSelectedQuoteCurrencyAccount();
  var market = useMarket().market;
  var _b = connection_1.useAccountInfo(
      quoteCurrencyAccount === null || quoteCurrencyAccount === void 0
        ? void 0
        : quoteCurrencyAccount.pubkey,
    ),
    accountInfo = _b[0],
    loaded = _b[1];
  if (!market || !quoteCurrencyAccount || !loaded || !accountInfo) {
    return null;
  }
  if (
    market.quoteMintAddress.equals(serum_1.TokenInstructions.WRAPPED_SOL_MINT)
  ) {
    return (_a =
      (accountInfo === null || accountInfo === void 0
        ? void 0
        : accountInfo.lamports) / 1e9) !== null && _a !== void 0
      ? _a
      : 0;
  }
  return market.quoteSplSizeToNumber(
    new bn_js_1['default'](accountInfo.data.slice(64, 72), 10, 'le'),
  );
}
exports.useSelectedQuoteCurrencyBalances = useSelectedQuoteCurrencyBalances;
// TODO: Update to use websocket
function useSelectedBaseCurrencyBalances() {
  var _a;
  var baseCurrencyAccount = useSelectedBaseCurrencyAccount();
  var market = useMarket().market;
  var _b = connection_1.useAccountInfo(
      baseCurrencyAccount === null || baseCurrencyAccount === void 0
        ? void 0
        : baseCurrencyAccount.pubkey,
    ),
    accountInfo = _b[0],
    loaded = _b[1];
  if (!market || !baseCurrencyAccount || !loaded || !accountInfo) {
    return null;
  }
  if (
    market.baseMintAddress.equals(serum_1.TokenInstructions.WRAPPED_SOL_MINT)
  ) {
    return (_a =
      (accountInfo === null || accountInfo === void 0
        ? void 0
        : accountInfo.lamports) / 1e9) !== null && _a !== void 0
      ? _a
      : 0;
  }
  return market.baseSplSizeToNumber(
    new bn_js_1['default'](accountInfo.data.slice(64, 72), 10, 'le'),
  );
}
exports.useSelectedBaseCurrencyBalances = useSelectedBaseCurrencyBalances;
function useOpenOrders() {
  var _a = useMarket(),
    market = _a.market,
    marketName = _a.marketName;
  var openOrdersAccount = useSelectedOpenOrdersAccount();
  var _b = useOrderbookAccounts(),
    bidOrderbook = _b.bidOrderbook,
    askOrderbook = _b.askOrderbook;
  if (!market || !openOrdersAccount || !bidOrderbook || !askOrderbook) {
    return null;
  }
  return market
    .filterForOpenOrders(bidOrderbook, askOrderbook, [openOrdersAccount])
    .map(function (order) {
      return __assign(__assign({}, order), {
        marketName: marketName,
        market: market,
      });
    });
}
exports.useOpenOrders = useOpenOrders;
function useTrades(limit) {
  if (limit === void 0) {
    limit = 100;
  }
  var trades = _useUnfilteredTrades(limit);
  if (!trades) {
    return null;
  }
  // Until partial fills are each given their own fill, use maker fills
  return trades
    .filter(function (_a) {
      var eventFlags = _a.eventFlags;
      return eventFlags.maker;
    })
    .map(function (trade) {
      return __assign(__assign({}, trade), {
        side: trade.side === 'buy' ? 'sell' : 'buy',
      });
    });
}
exports.useTrades = useTrades;
function useLocallyStoredFeeDiscountKey() {
  var _a = utils_1.useLocalStorageState('feeDiscountKey', undefined),
    storedFeeDiscountKey = _a[0],
    setStoredFeeDiscountKey = _a[1];
  return {
    storedFeeDiscountKey: storedFeeDiscountKey
      ? new web3_js_1.PublicKey(storedFeeDiscountKey)
      : undefined,
    setStoredFeeDiscountKey: setStoredFeeDiscountKey,
  };
}
exports.useLocallyStoredFeeDiscountKey = useLocallyStoredFeeDiscountKey;
function useFeeDiscountKeys() {
  var _this = this;
  var market = useMarket().market;
  var _a = wallet_1.useWallet(),
    connected = _a.connected,
    wallet = _a.wallet;
  var connection = connection_1.useConnection();
  var setStoredFeeDiscountKey =
    useLocallyStoredFeeDiscountKey().setStoredFeeDiscountKey;
  var getFeeDiscountKeys = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var feeDiscountKey;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!connected || !wallet) {
              return [2 /*return*/, null];
            }
            if (!market) {
              return [2 /*return*/, null];
            }
            return [
              4 /*yield*/,
              market.findFeeDiscountKeys(connection, wallet.publicKey),
            ];
          case 1:
            feeDiscountKey = _a.sent();
            if (feeDiscountKey) {
              setStoredFeeDiscountKey(feeDiscountKey[0].pubkey.toBase58());
            }
            return [2 /*return*/, feeDiscountKey];
        }
      });
    });
  };
  return fetch_loop_1.useAsyncData(
    getFeeDiscountKeys,
    immutable_tuple_1['default'](
      'getFeeDiscountKeys',
      wallet,
      market,
      connected,
    ),
    { refreshInterval: _SLOW_REFRESH_INTERVAL },
  );
}
exports.useFeeDiscountKeys = useFeeDiscountKeys;
function useFills(limit) {
  if (limit === void 0) {
    limit = 100;
  }
  var marketName = useMarket().marketName;
  var fills = _useUnfilteredTrades(limit);
  var openOrdersAccounts = useOpenOrdersAccounts()[0];
  if (!openOrdersAccounts || openOrdersAccounts.length === 0) {
    return null;
  }
  if (!fills) {
    return null;
  }
  return fills
    .filter(function (fill) {
      return openOrdersAccounts.some(function (openOrdersAccount) {
        return fill.openOrders.equals(openOrdersAccount.publicKey);
      });
    })
    .map(function (fill) {
      return __assign(__assign({}, fill), { marketName: marketName });
    });
}
exports.useFills = useFills;
function useAllOpenOrdersAccounts() {
  var _this = this;
  var _a;
  var _b = wallet_1.useWallet(),
    wallet = _b.wallet,
    connected = _b.connected;
  var connection = connection_1.useConnection();
  var marketInfos = useMarketInfos();
  var programIds = __spreadArrays(
    new Set(
      marketInfos.map(function (info) {
        return info.programId.toBase58();
      }),
    ),
  ).map(function (stringProgramId) {
    return new web3_js_1.PublicKey(stringProgramId);
  });
  var getAllOpenOrdersAccounts = function () {
    return __awaiter(_this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!connected || !wallet) {
              return [2 /*return*/, []];
            }
            return [
              4 /*yield*/,
              Promise.all(
                programIds.map(function (programId) {
                  return serum_1.OpenOrders.findForOwner(
                    connection,
                    wallet.publicKey,
                    programId,
                  );
                }),
              ),
            ];
          case 1:
            return [2 /*return*/, _a.sent().flat()];
        }
      });
    });
  };
  return fetch_loop_1.useAsyncData(
    getAllOpenOrdersAccounts,
    immutable_tuple_1['default'](
      'getAllOpenOrdersAccounts',
      connection,
      connected,
      (_a =
        wallet === null || wallet === void 0 ? void 0 : wallet.publicKey) ===
        null || _a === void 0
        ? void 0
        : _a.toBase58(),
      marketInfos.length,
      (programIds || []).length,
    ),
    { refreshInterval: _SLOW_REFRESH_INTERVAL },
  );
}
exports.useAllOpenOrdersAccounts = useAllOpenOrdersAccounts;
function useAllOpenOrdersBalances() {
  var _a = useAllOpenOrdersAccounts(),
    openOrdersAccounts = _a[0],
    loadedOpenOrdersAccounts = _a[1];
  var _b = tokens_1.useMintInfos(),
    mintInfos = _b[0],
    mintInfosConnected = _b[1];
  var allMarkets = useAllMarkets()[0];
  if (!loadedOpenOrdersAccounts || !mintInfosConnected) {
    return {};
  }
  var marketsByAddress = Object.fromEntries(
    (allMarkets || []).map(function (m) {
      return [m.market.address.toBase58(), m];
    }),
  );
  var openOrdersBalances = {};
  for (var _i = 0, _c = openOrdersAccounts || []; _i < _c.length; _i++) {
    var account = _c[_i];
    var marketInfo = marketsByAddress[account.market.toBase58()];
    var baseMint =
      marketInfo === null || marketInfo === void 0
        ? void 0
        : marketInfo.market.baseMintAddress.toBase58();
    var quoteMint =
      marketInfo === null || marketInfo === void 0
        ? void 0
        : marketInfo.market.quoteMintAddress.toBase58();
    if (!(baseMint in openOrdersBalances)) {
      openOrdersBalances[baseMint] = [];
    }
    if (!(quoteMint in openOrdersBalances)) {
      openOrdersBalances[quoteMint] = [];
    }
    var baseMintInfo = mintInfos && mintInfos[baseMint];
    var baseFree = utils_1.divideBnToNumber(
      new bn_js_1['default'](account.baseTokenFree),
      utils_1.getTokenMultiplierFromDecimals(
        (baseMintInfo === null || baseMintInfo === void 0
          ? void 0
          : baseMintInfo.decimals) || 0,
      ),
    );
    var baseTotal = utils_1.divideBnToNumber(
      new bn_js_1['default'](account.baseTokenTotal),
      utils_1.getTokenMultiplierFromDecimals(
        (baseMintInfo === null || baseMintInfo === void 0
          ? void 0
          : baseMintInfo.decimals) || 0,
      ),
    );
    var quoteMintInfo = mintInfos && mintInfos[quoteMint];
    var quoteFree = utils_1.divideBnToNumber(
      new bn_js_1['default'](account.quoteTokenFree),
      utils_1.getTokenMultiplierFromDecimals(
        (quoteMintInfo === null || quoteMintInfo === void 0
          ? void 0
          : quoteMintInfo.decimals) || 0,
      ),
    );
    var quoteTotal = utils_1.divideBnToNumber(
      new bn_js_1['default'](account.quoteTokenTotal),
      utils_1.getTokenMultiplierFromDecimals(
        (quoteMintInfo === null || quoteMintInfo === void 0
          ? void 0
          : quoteMintInfo.decimals) || 0,
      ),
    );
    openOrdersBalances[baseMint].push({
      market: account.market,
      free: baseFree,
      total: baseTotal,
    });
    openOrdersBalances[quoteMint].push({
      market: account.market,
      free: quoteFree,
      total: quoteTotal,
    });
  }
  return openOrdersBalances;
}
exports.useAllOpenOrdersBalances = useAllOpenOrdersBalances;
exports.useAllOpenOrders = function () {
  var connection = connection_1.useConnection();
  var _a = wallet_1.useWallet(),
    connected = _a.connected,
    wallet = _a.wallet;
  var _b = react_1.useState(false),
    loaded = _b[0],
    setLoaded = _b[1];
  var _c = react_1.useState(0),
    refresh = _c[0],
    setRefresh = _c[1];
  var _d = react_1.useState(null),
    openOrders = _d[0],
    setOpenOrders = _d[1];
  var _e = react_1.useState(0),
    lastRefresh = _e[0],
    setLastRefresh = _e[1];
  var refreshOpenOrders = function () {
    if (new Date().getTime() - lastRefresh > 10 * 1000) {
      setRefresh(function (prev) {
        return prev + 1;
      });
    } else {
      console.log('not refreshing');
    }
  };
  react_1.useEffect(
    function () {
      if (connected && wallet) {
        var getAllOpenOrders = function () {
          return __awaiter(void 0, void 0, void 0, function () {
            var _openOrders, getOpenOrdersForMarket;
            return __generator(this, function (_a) {
              switch (_a.label) {
                case 0:
                  setLoaded(false);
                  _openOrders = [];
                  getOpenOrdersForMarket = function (marketInfo) {
                    return __awaiter(void 0, void 0, void 0, function () {
                      var market, orders, e_3;
                      return __generator(this, function (_a) {
                        switch (_a.label) {
                          case 0:
                            return [
                              4 /*yield*/,
                              utils_1.sleep(1000 * Math.random()),
                            ];
                          case 1:
                            _a.sent(); // Try not to hit rate limit
                            _a.label = 2;
                          case 2:
                            _a.trys.push([2, 5, , 6]);
                            return [
                              4 /*yield*/,
                              serum_1.Market.load(
                                connection,
                                marketInfo.address,
                                undefined,
                                marketInfo.programId,
                              ),
                            ];
                          case 3:
                            market = _a.sent();
                            return [
                              4 /*yield*/,
                              market.loadOrdersForOwner(
                                connection,
                                wallet === null || wallet === void 0
                                  ? void 0
                                  : wallet.publicKey,
                                30000,
                              ),
                            ];
                          case 4:
                            orders = _a.sent();
                            _openOrders.push({
                              orders: orders,
                              marketAddress: marketInfo.address.toBase58(),
                            });
                            return [3 /*break*/, 6];
                          case 5:
                            e_3 = _a.sent();
                            console.warn(
                              'Error loading open order ' +
                                marketInfo.name +
                                ' - ' +
                                e_3,
                            );
                            return [3 /*break*/, 6];
                          case 6:
                            return [2 /*return*/];
                        }
                      });
                    });
                  };
                  return [
                    4 /*yield*/,
                    Promise.all(
                      exports.USE_MARKETS.map(function (m) {
                        return getOpenOrdersForMarket(m);
                      }),
                    ),
                  ];
                case 1:
                  _a.sent();
                  setOpenOrders(_openOrders);
                  setLastRefresh(new Date().getTime());
                  setLoaded(true);
                  return [2 /*return*/];
              }
            });
          });
        };
        getAllOpenOrders();
      }
    },
    [connection, connected, wallet, refresh],
  );
  return {
    openOrders: openOrders,
    loaded: loaded,
    refreshOpenOrders: refreshOpenOrders,
  };
};
function useBalances() {
  var baseCurrencyBalances = useSelectedBaseCurrencyBalances();
  var quoteCurrencyBalances = useSelectedQuoteCurrencyBalances();
  var openOrders = useSelectedOpenOrdersAccount(true);
  var _a = useMarket(),
    baseCurrency = _a.baseCurrency,
    quoteCurrency = _a.quoteCurrency,
    market = _a.market;
  var baseExists =
    openOrders && openOrders.baseTokenTotal && openOrders.baseTokenFree;
  var quoteExists =
    openOrders && openOrders.quoteTokenTotal && openOrders.quoteTokenFree;
  if (
    baseCurrency === 'UNKNOWN' ||
    quoteCurrency === 'UNKNOWN' ||
    !baseCurrency ||
    !quoteCurrency
  ) {
    return [];
  }
  return [
    {
      market: market,
      key: '' + baseCurrency + quoteCurrency + baseCurrency,
      coin: baseCurrency,
      wallet: baseCurrencyBalances,
      orders:
        baseExists && market && openOrders
          ? market.baseSplSizeToNumber(
              openOrders.baseTokenTotal.sub(openOrders.baseTokenFree),
            )
          : null,
      openOrders: openOrders,
      unsettled:
        baseExists && market && openOrders
          ? market.baseSplSizeToNumber(openOrders.baseTokenFree)
          : null,
    },
    {
      market: market,
      key: '' + quoteCurrency + baseCurrency + quoteCurrency,
      coin: quoteCurrency,
      wallet: quoteCurrencyBalances,
      openOrders: openOrders,
      orders:
        quoteExists && market && openOrders
          ? market.quoteSplSizeToNumber(
              openOrders.quoteTokenTotal.sub(openOrders.quoteTokenFree),
            )
          : null,
      unsettled:
        quoteExists && market && openOrders
          ? market.quoteSplSizeToNumber(openOrders.quoteTokenFree)
          : null,
    },
  ];
}
exports.useBalances = useBalances;
function useWalletBalancesForAllMarkets() {
  var tokenAccounts = useTokenAccounts()[0];
  var connected = wallet_1.useWallet().connected;
  var _a = tokens_1.useMintInfos(),
    mintInfos = _a[0],
    mintInfosConnected = _a[1];
  if (!connected || !mintInfosConnected) {
    return [];
  }
  var balances = {};
  for (var _i = 0, _b = tokenAccounts || []; _i < _b.length; _i++) {
    var account = _b[_i];
    if (!account.account) {
      continue;
    }
    var parsedAccount = void 0;
    if (account.effectiveMint.equals(token_instructions_1.WRAPPED_SOL_MINT)) {
      parsedAccount = {
        mint: token_instructions_1.WRAPPED_SOL_MINT,
        owner: account.pubkey,
        amount: account.account.lamports,
      };
    } else {
      parsedAccount = tokens_1.parseTokenAccountData(account.account.data);
    }
    if (!(parsedAccount.mint.toBase58() in balances)) {
      balances[parsedAccount.mint.toBase58()] = 0;
    }
    var mintInfo = mintInfos && mintInfos[parsedAccount.mint.toBase58()];
    var additionalAmount = utils_1.divideBnToNumber(
      new bn_js_1['default'](parsedAccount.amount),
      utils_1.getTokenMultiplierFromDecimals(
        (mintInfo === null || mintInfo === void 0
          ? void 0
          : mintInfo.decimals) || 0,
      ),
    );
    balances[parsedAccount.mint.toBase58()] += additionalAmount;
  }
  return Object.entries(balances).map(function (_a) {
    var mint = _a[0],
      balance = _a[1];
    return { mint: mint, balance: balance };
  });
}
exports.useWalletBalancesForAllMarkets = useWalletBalancesForAllMarkets;
function useUnmigratedDeprecatedMarkets() {
  var _this = this;
  var connection = connection_1.useConnection();
  var accounts = useUnmigratedOpenOrdersAccounts().accounts;
  var marketsList =
    accounts &&
    Array.from(
      new Set(
        accounts.map(function (openOrders) {
          return openOrders.market;
        }),
      ),
    );
  var deps =
    marketsList &&
    marketsList.map(function (m) {
      return m.toBase58();
    });
  var useUnmigratedDeprecatedMarketsInner = function () {
    return __awaiter(_this, void 0, void 0, function () {
      var getMarket;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!marketsList) {
              return [2 /*return*/, null];
            }
            getMarket = function (address) {
              return __awaiter(_this, void 0, void 0, function () {
                var marketInfo, e_4;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      marketInfo = exports.USE_MARKETS.find(function (market) {
                        return market.address.equals(address);
                      });
                      if (!marketInfo) {
                        console.log('Failed loading market');
                        notifications_1.notify({
                          message: 'Error loading market',
                          type: 'error',
                        });
                        return [2 /*return*/, null];
                      }
                      _a.label = 1;
                    case 1:
                      _a.trys.push([1, 3, , 4]);
                      console.log('Loading market', marketInfo.name);
                      return [
                        4 /*yield*/,
                        serum_1.Market.load(
                          connection,
                          marketInfo.address,
                          {},
                          marketInfo.programId,
                        ),
                      ];
                    case 2:
                      // NOTE: Should this just be cached by (connection, marketInfo.address, marketInfo.programId)?
                      return [2 /*return*/, _a.sent()];
                    case 3:
                      e_4 = _a.sent();
                      console.log(
                        'Failed loading market',
                        marketInfo.name,
                        e_4,
                      );
                      notifications_1.notify({
                        message: 'Error loading market',
                        description: e_4.message,
                        type: 'error',
                      });
                      return [2 /*return*/, null];
                    case 4:
                      return [2 /*return*/];
                  }
                });
              });
            };
            return [4 /*yield*/, Promise.all(marketsList.map(getMarket))];
          case 1:
            return [
              2 /*return*/,
              _a.sent().filter(function (x) {
                return x;
              }),
            ];
        }
      });
    });
  };
  var markets = fetch_loop_1.useAsyncData(
    useUnmigratedDeprecatedMarketsInner,
    immutable_tuple_1['default'](
      'useUnmigratedDeprecatedMarketsInner',
      connection,
      deps && deps.toString(),
    ),
    { refreshInterval: _VERY_SLOW_REFRESH_INTERVAL },
  )[0];
  if (!markets) {
    return null;
  }
  return markets.map(function (market) {
    return {
      market: market,
      openOrdersList:
        accounts === null || accounts === void 0
          ? void 0
          : accounts.filter(function (openOrders) {
              return market && openOrders.market.equals(market.address);
            }),
    };
  });
}
exports.useUnmigratedDeprecatedMarkets = useUnmigratedDeprecatedMarkets;
function useGetOpenOrdersForDeprecatedMarkets() {
  var _a = wallet_1.useWallet(),
    connected = _a.connected,
    wallet = _a.wallet;
  var customMarkets = useCustomMarkets().customMarkets;
  var connection = connection_1.useConnection();
  var marketsAndOrders = useUnmigratedDeprecatedMarkets();
  var marketsList =
    marketsAndOrders &&
    marketsAndOrders.map(function (_a) {
      var market = _a.market;
      return market;
    });
  // This isn't quite right: open order balances could change
  var deps =
    marketsList &&
    marketsList
      .filter(function (market) {
        return !!market;
      })
      .map(function (market) {
        return market.address.toBase58();
      });
  function getOpenOrdersForDeprecatedMarkets() {
    return __awaiter(this, void 0, void 0, function () {
      var getOrders;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!connected || !wallet) {
              return [2 /*return*/, null];
            }
            if (!marketsList) {
              return [2 /*return*/, null];
            }
            console.log('refreshing getOpenOrdersForDeprecatedMarkets');
            getOrders = function (market) {
              return __awaiter(_this, void 0, void 0, function () {
                var marketName, e_5;
                return __generator(this, function (_a) {
                  switch (_a.label) {
                    case 0:
                      if (!market) {
                        return [2 /*return*/, null];
                      }
                      marketName = getMarketDetails(
                        market,
                        customMarkets,
                      ).marketName;
                      _a.label = 1;
                    case 1:
                      _a.trys.push([1, 3, , 4]);
                      console.log('Fetching open orders for', marketName);
                      return [
                        4 /*yield*/,
                        market.loadOrdersForOwner(connection, wallet.publicKey),
                      ];
                    case 2:
                      // Can do better than this, we have the open orders accounts already
                      return [
                        2 /*return*/,
                        _a.sent().map(function (order) {
                          return __assign(
                            { marketName: marketName, market: market },
                            order,
                          );
                        }),
                      ];
                    case 3:
                      e_5 = _a.sent();
                      console.log(
                        'Failed loading open orders',
                        market.address.toBase58(),
                        e_5,
                      );
                      notifications_1.notify({
                        message:
                          'Error loading open orders for deprecated ' +
                          marketName,
                        description: e_5.message,
                        type: 'error',
                      });
                      return [2 /*return*/, null];
                    case 4:
                      return [2 /*return*/];
                  }
                });
              });
            };
            return [4 /*yield*/, Promise.all(marketsList.map(getOrders))];
          case 1:
            return [
              2 /*return*/,
              _a
                .sent()
                .filter(function (x) {
                  return !!x;
                })
                .flat(),
            ];
        }
      });
    });
  }
  var cacheKey = immutable_tuple_1['default'](
    'getOpenOrdersForDeprecatedMarkets',
    connected,
    connection,
    wallet,
    deps && deps.toString(),
  );
  var _b = fetch_loop_1.useAsyncData(
      getOpenOrdersForDeprecatedMarkets,
      cacheKey,
      {
        refreshInterval: _VERY_SLOW_REFRESH_INTERVAL,
      },
    ),
    openOrders = _b[0],
    loaded = _b[1];
  console.log('openOrders', openOrders);
  return {
    openOrders: openOrders,
    loaded: loaded,
    refreshOpenOrders: function () {
      return fetch_loop_1.refreshCache(cacheKey);
    },
  };
}
exports.useGetOpenOrdersForDeprecatedMarkets =
  useGetOpenOrdersForDeprecatedMarkets;
function useBalancesForDeprecatedMarkets() {
  var markets = useUnmigratedDeprecatedMarkets();
  var customMarkets = utils_1.useLocalStorageState('customMarkets', [])[0];
  if (!markets) {
    return null;
  }
  var openOrderAccountBalances = [];
  markets.forEach(function (_a) {
    var market = _a.market,
      openOrdersList = _a.openOrdersList;
    var _b = getMarketDetails(market, customMarkets),
      baseCurrency = _b.baseCurrency,
      quoteCurrency = _b.quoteCurrency,
      marketName = _b.marketName;
    if (!baseCurrency || !quoteCurrency || !market) {
      return;
    }
    (openOrdersList || []).forEach(function (openOrders) {
      var inOrdersBase =
        (openOrders === null || openOrders === void 0
          ? void 0
          : openOrders.baseTokenTotal) &&
        (openOrders === null || openOrders === void 0
          ? void 0
          : openOrders.baseTokenFree) &&
        market.baseSplSizeToNumber(
          openOrders.baseTokenTotal.sub(openOrders.baseTokenFree),
        );
      var inOrdersQuote =
        (openOrders === null || openOrders === void 0
          ? void 0
          : openOrders.quoteTokenTotal) &&
        (openOrders === null || openOrders === void 0
          ? void 0
          : openOrders.quoteTokenFree) &&
        market.baseSplSizeToNumber(
          openOrders.quoteTokenTotal.sub(openOrders.quoteTokenFree),
        );
      var unsettledBase =
        (openOrders === null || openOrders === void 0
          ? void 0
          : openOrders.baseTokenFree) &&
        market.baseSplSizeToNumber(openOrders.baseTokenFree);
      var unsettledQuote =
        (openOrders === null || openOrders === void 0
          ? void 0
          : openOrders.quoteTokenFree) &&
        market.baseSplSizeToNumber(openOrders.quoteTokenFree);
      openOrderAccountBalances.push({
        marketName: marketName,
        market: market,
        coin: baseCurrency,
        key: '' + marketName + baseCurrency,
        orders: inOrdersBase,
        unsettled: unsettledBase,
        openOrders: openOrders,
      });
      openOrderAccountBalances.push({
        marketName: marketName,
        market: market,
        coin: quoteCurrency,
        key: '' + marketName + quoteCurrency,
        orders: inOrdersQuote,
        unsettled: unsettledQuote,
        openOrders: openOrders,
      });
    });
  });
  return openOrderAccountBalances;
}
exports.useBalancesForDeprecatedMarkets = useBalancesForDeprecatedMarkets;
function getMarketInfos(customMarkets) {
  var customMarketsInfo = customMarkets.map(function (m) {
    return __assign(__assign({}, m), {
      address: new web3_js_1.PublicKey(m.address),
      programId: new web3_js_1.PublicKey(m.programId),
      deprecated: false,
    });
  });
  return __spreadArrays(customMarketsInfo, exports.USE_MARKETS);
}
exports.getMarketInfos = getMarketInfos;
function useMarketInfos() {
  var customMarkets = useCustomMarkets().customMarkets;
  return getMarketInfos(customMarkets);
}
exports.useMarketInfos = useMarketInfos;
/**
 * If selling, choose min tick size. If buying choose a price
 * s.t. given the state of the orderbook, the order will spend
 * `cost` cost currency.
 *
 * @param orderbook serum Orderbook object
 * @param cost quantity to spend. Base currency if selling,
 *  quote currency if buying.
 * @param tickSizeDecimals size of price increment of the market
 */
function getMarketOrderPrice(orderbook, cost, tickSizeDecimals) {
  var _a;
  if (orderbook.isBids) {
    return orderbook.market.tickSize;
  }
  var spentCost = 0;
  var price, sizeAtLevel, costAtLevel;
  var asks = orderbook.getL2(1000);
  for (var _i = 0, asks_1 = asks; _i < asks_1.length; _i++) {
    (_a = asks_1[_i]), (price = _a[0]), (sizeAtLevel = _a[1]);
    costAtLevel = price * sizeAtLevel;
    if (spentCost + costAtLevel > cost) {
      break;
    }
    spentCost += costAtLevel;
  }
  var sendPrice = Math.min(price * 1.02, asks[0][0] * 1.05);
  var formattedPrice;
  if (tickSizeDecimals) {
    formattedPrice = utils_1.floorToDecimal(sendPrice, tickSizeDecimals);
  } else {
    formattedPrice = sendPrice;
  }
  return formattedPrice;
}
exports.getMarketOrderPrice = getMarketOrderPrice;
function getExpectedFillPrice(orderbook, cost, tickSizeDecimals) {
  var _a;
  var spentCost = 0;
  var avgPrice = 0;
  var price, sizeAtLevel, costAtLevel;
  for (var _i = 0, _b = orderbook.getL2(1000); _i < _b.length; _i++) {
    (_a = _b[_i]), (price = _a[0]), (sizeAtLevel = _a[1]);
    costAtLevel = (orderbook.isBids ? 1 : price) * sizeAtLevel;
    if (spentCost + costAtLevel > cost) {
      avgPrice += (cost - spentCost) * price;
      spentCost = cost;
      break;
    }
    avgPrice += costAtLevel * price;
    spentCost += costAtLevel;
  }
  var totalAvgPrice = avgPrice / Math.min(cost, spentCost);
  var formattedPrice;
  if (tickSizeDecimals) {
    formattedPrice = utils_1.floorToDecimal(totalAvgPrice, tickSizeDecimals);
  } else {
    formattedPrice = totalAvgPrice;
  }
  return formattedPrice;
}
exports.getExpectedFillPrice = getExpectedFillPrice;
function useCurrentlyAutoSettling() {
  var _a = react_1.useState(false),
    currentlyAutoSettling = _a[0],
    setCurrentlyAutosettling = _a[1];
  return [currentlyAutoSettling, setCurrentlyAutosettling];
}
exports.useCurrentlyAutoSettling = useCurrentlyAutoSettling;
