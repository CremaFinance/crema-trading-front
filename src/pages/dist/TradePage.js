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
var react_1 = require('react');
var antd_1 = require('antd');
var styled_components_1 = require('styled-components');
var Orderbook_1 = require('../components/Orderbook');
var UserInfoTable_1 = require('../components/UserInfoTable');
var StandaloneBalancesDisplay_1 = require('../components/StandaloneBalancesDisplay');
var markets_1 = require('../utils/markets');
var TradeForm_1 = require('../components/TradeForm');
var TradesTable_1 = require('../components/TradesTable');
var LinkAddress_1 = require('../components/LinkAddress');
var TradingView_1 = require('../components/TradingView');
var TopBar_1 = require('../components/TopBar');
var DeprecatedMarketsInstructions_1 = require('../components/DeprecatedMarketsInstructions');
var icons_1 = require('@ant-design/icons');
var CustomMarketDialog_1 = require('../components/CustomMarketDialog');
var notifications_1 = require('../utils/notifications');
var react_router_dom_1 = require('react-router-dom');
var nanoid_1 = require('nanoid');
require('../assets/css/tradePage/index.less');
var icon_Trading_2x_png_1 = require('../assets/img/crema/icon-Trading@2x.png');
var icon_Swap_2x_png_1 = require('../assets/img/crema/icon-Swap@2x.png');
var icon_Pools_2x_png_1 = require('../assets/img/crema/icon-Pools@2x.png');
var SRM_png_1 = require('../assets/img/crema/SRM.png');
var icon_coin_usdt_2x_png_1 = require('../assets/img/crema/icon_coin_usdt@2x.png');
var icon_SOL_2x_png_1 = require('../assets/img/crema/icon_SOL@2x.png');
var icon_USDC_png_1 = require('../assets/img/crema/icon_USDC.png');
var tag_Mainnet_png_1 = require('../assets/img/crema/tag-Mainnet.png');
var Option = antd_1.Select.Option,
  OptGroup = antd_1.Select.OptGroup;
var Wrapper = styled_components_1['default'].div(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      [
        '\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 8px 8px;\n  .borderNone .ant-select-selector {\n    border: none !important;\n  }\n',
      ],
      [
        '\n  height: 100%;\n  display: flex;\n  flex-direction: column;\n  padding: 8px 8px;\n  .borderNone .ant-select-selector {\n    border: none !important;\n  }\n',
      ],
    )),
);
var marketIcon = {
  HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1: {
    beforeCoin: icon_SOL_2x_png_1['default'],
    afterCoin: icon_coin_usdt_2x_png_1['default'],
  },
  '9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT': {
    beforeCoin: icon_SOL_2x_png_1['default'],
    afterCoin: icon_USDC_png_1['default'],
  },
  AtNnsY1AyRERWJ8xCskfz38YdvruWVJQUVXgScC1iPb: {
    beforeCoin: SRM_png_1['default'],
    afterCoin: icon_coin_usdt_2x_png_1['default'],
  },
  ByRys5tuUWDgL73G8JBAEfkdFf8JWBzPBDHsBVQ5vbQA: {
    beforeCoin: SRM_png_1['default'],
    afterCoin: icon_USDC_png_1['default'],
  },
  jyei9Fpj2GtHLDDGgcuhDacxYLLiSyxU4TY7KxB2xai: {
    beforeCoin: SRM_png_1['default'],
    afterCoin: icon_SOL_2x_png_1['default'],
  },
};
function TradePage() {
  var marketAddress = react_router_dom_1.useParams().marketAddress;
  react_1.useEffect(
    function () {
      if (marketAddress) {
        localStorage.setItem('marketAddress', JSON.stringify(marketAddress));
      }
    },
    [marketAddress],
  );
  var history = react_router_dom_1.useHistory();
  function setMarketAddress(address) {
    history.push(markets_1.getTradePageUrl(address));
  }
  return react_1['default'].createElement(
    markets_1.MarketProvider,
    { marketAddress: marketAddress, setMarketAddress: setMarketAddress },
    react_1['default'].createElement(TradePageInner, null),
  );
}
exports['default'] = TradePage;
function TradePageInner() {
  var _a = markets_1.useMarket(),
    market = _a.market,
    marketName = _a.marketName,
    customMarkets = _a.customMarkets,
    setCustomMarkets = _a.setCustomMarkets,
    setMarketAddress = _a.setMarketAddress;
  var markets = markets_1.useMarketsList();
  var _b = react_1.useState(false),
    handleDeprecated = _b[0],
    setHandleDeprecated = _b[1];
  var _c = react_1.useState(false),
    addMarketVisible = _c[0],
    setAddMarketVisible = _c[1];
  var deprecatedMarkets = markets_1.useUnmigratedDeprecatedMarkets();
  var _d = react_1.useState({
      height: window.innerHeight,
      width: window.innerWidth,
    }),
    dimensions = _d[0],
    setDimensions = _d[1];
  react_1.useEffect(
    function () {
      document.title = marketName
        ? marketName +
          ' \u2014 Crema Finance | A Powerful Concentrated Liquidity Protocol'
        : 'Crema Finance | A Powerful Concentrated Liquidity Protocol';
    },
    [marketName],
  );
  var changeOrderRef = react_1.useRef();
  react_1.useEffect(function () {
    var handleResize = function () {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };
    window.addEventListener('resize', handleResize);
    return function () {
      return window.removeEventListener('resize', handleResize);
    };
  }, []);
  var width =
    dimensions === null || dimensions === void 0 ? void 0 : dimensions.width;
  var componentProps = {
    onChangeOrderRef: function (ref) {
      return (changeOrderRef.current = ref);
    },
    onPrice: react_1.useCallback(function (price) {
      return changeOrderRef.current && changeOrderRef.current({ price: price });
    }, []),
    onSize: react_1.useCallback(function (size) {
      return changeOrderRef.current && changeOrderRef.current({ size: size });
    }, []),
  };
  var component = (function () {
    if (handleDeprecated) {
      return react_1['default'].createElement(DeprecatedMarketsPage, {
        switchToLiveMarkets: function () {
          return setHandleDeprecated(false);
        },
      });
    } else if (width < 1000) {
      return react_1['default'].createElement(
        RenderSmaller,
        __assign({}, componentProps),
      );
    } else if (width < 1450) {
      return react_1['default'].createElement(
        RenderSmall,
        __assign({}, componentProps),
      );
      // return <RenderNormal {...componentProps} />;
    } else {
      return react_1['default'].createElement(
        RenderNormal,
        __assign({}, componentProps),
      );
    }
  })();
  var onAddCustomMarket = function (customMarket) {
    var marketInfo = markets_1.getMarketInfos(customMarkets).some(function (m) {
      return m.address.toBase58() === customMarket.address;
    });
    if (marketInfo) {
      notifications_1.notify({
        message: 'A market with the given ID already exists',
        type: 'error',
      });
      return;
    }
    var newCustomMarkets = __spreadArrays(customMarkets, [customMarket]);
    setCustomMarkets(newCustomMarkets);
    setMarketAddress(customMarket.address);
  };
  var onDeleteCustomMarket = function (address) {
    var newCustomMarkets = customMarkets.filter(function (m) {
      return m.address !== address;
    });
    setCustomMarkets(newCustomMarkets);
  };
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(CustomMarketDialog_1['default'], {
      visible: addMarketVisible,
      onClose: function () {
        return setAddMarketVisible(false);
      },
      onAddCustomMarket: onAddCustomMarket,
    }),
    react_1['default'].createElement(
      Wrapper,
      null,
      react_1['default'].createElement(
        antd_1.Row,
        {
          className: 'pc-menu',
          align: 'middle',
          style: {
            paddingLeft: 10,
            paddingRight: 5,
            background: 'rgba(255,255,255,0.03)',
            height: '76px',
            marginLeft: '0px',
          },
          gutter: 16,
        },
        react_1['default'].createElement(
          antd_1.Col,
          { style: { display: 'flex', alignItems: 'center' } },
          react_1['default'].createElement('div', { className: 'logo' }),
          react_1['default'].createElement('img', {
            style: { height: '16px', marginRight: '10px' },
            src: tag_Mainnet_png_1['default'],
            alt: '',
          }),
        ),
        react_1['default'].createElement(
          antd_1.Col,
          {
            style: {
              padding: '2px',
              borderRadius: '8px',
              marginRight: '28px',
              background:
                'linear-gradient(214deg, #59BDAD 0%, #6676F5 61%, #9A89F9 76%, #EBA7FF 100%)',
            },
          },
          react_1['default'].createElement(
            'div',
            { className: 'menu-item-active' },
            react_1['default'].createElement('img', {
              className: 'page-icon',
              src: icon_Trading_2x_png_1['default'],
              alt: '',
            }),
            react_1['default'].createElement('span', null, 'Trading'),
          ),
        ),
        react_1['default'].createElement(
          antd_1.Col,
          {
            style: {
              padding: '8px 17px',
              marginRight: '7px',
              color: 'rgba(255,255,255,0.5)',
            },
          },
          react_1['default'].createElement(
            'div',
            {
              className: 'menu-item',
              onClick: function () {
                return goUrl('swap');
              },
            },
            react_1['default'].createElement('img', {
              className: 'page-icon',
              src: icon_Swap_2x_png_1['default'],
              alt: '',
            }),
            react_1['default'].createElement('span', null, 'Swap'),
          ),
        ),
        react_1['default'].createElement(
          antd_1.Col,
          {
            style: {
              padding: '8px 17px',
              marginRight: '7px',
              color: 'rgba(255,255,255,0.5)',
            },
          },
          react_1['default'].createElement(
            'div',
            {
              className: 'menu-item',
              onClick: function () {
                return goUrl('pool');
              },
            },
            react_1['default'].createElement('img', {
              className: 'page-icon',
              src: icon_Pools_2x_png_1['default'],
              alt: '',
            }),
            react_1['default'].createElement('span', null, 'Pools'),
          ),
        ),
        react_1['default'].createElement(
          antd_1.Col,
          { style: { flex: 1, display: 'flex', justifyContent: 'flex-end' } },
          react_1['default'].createElement(TopBar_1['default'], null),
        ),
      ),
      react_1['default'].createElement(
        antd_1.Row,
        {
          className: 'h5-head',
          align: 'middle',
          style: {
            paddingLeft: 5,
            paddingRight: 5,
            background: 'rgba(255,255,255,0.03)',
            height: '76px',
            marginLeft: '0px',
            marginTop: '10px',
          },
          gutter: 16,
        },
        react_1['default'].createElement(
          antd_1.Col,
          { style: { paddingLeft: '10px' } },
          react_1['default'].createElement(MarketSelector, {
            markets: markets,
            setHandleDeprecated: setHandleDeprecated,
            placeholder: 'Select market',
            customMarkets: customMarkets,
            onDeleteCustomMarket: onDeleteCustomMarket,
          }),
        ),
        market
          ? react_1['default'].createElement(
              antd_1.Col,
              null,
              react_1['default'].createElement(
                'span',
                { style: { marginRight: '8px', marginLeft: '60px' } },
                'Market Address',
              ),
              react_1['default'].createElement(
                antd_1.Popover,
                {
                  content: react_1['default'].createElement(
                    LinkAddress_1['default'],
                    { address: market.publicKey.toBase58() },
                  ),
                  placement: 'bottomRight',
                  title: 'Market address',
                  trigger: 'click',
                  overlayClassName: 'ant-popover-address',
                },
                react_1['default'].createElement(icons_1.InfoCircleOutlined, {
                  style: { color: '#07ebad' },
                }),
              ),
            )
          : null,
        react_1['default'].createElement(
          antd_1.Col,
          null,
          react_1['default'].createElement(
            'span',
            { style: { marginRight: '8px', marginLeft: '60px' } },
            'Add Custom Market',
          ),
          react_1['default'].createElement(icons_1.PlusCircleOutlined, {
            style: { color: '#07ebad' },
            onClick: function () {
              return setAddMarketVisible(true);
            },
          }),
        ),
      ),
      component,
    ),
  );
}
function goUrl(url) {
  // window.location.href = `https://app.hydraswap.io/${url}`
  // let href = `https://app.hydraswap.io/${url}`
  var href = 'https://app.crema.finance/' + url;
  // let href = `https://www.hydratest.xyz/${url}`;
  var a = document.createElement('a');
  a.setAttribute('href', href);
  a.setAttribute('target', '_blank');
  a.click();
}
function MarketSelector(_a) {
  var _b, _c;
  var markets = _a.markets,
    placeholder = _a.placeholder,
    setHandleDeprecated = _a.setHandleDeprecated,
    customMarkets = _a.customMarkets,
    onDeleteCustomMarket = _a.onDeleteCustomMarket;
  var _d = markets_1.useMarket(),
    market = _d.market,
    setMarketAddress = _d.setMarketAddress;
  var onSetMarketAddress = function (marketAddress) {
    setHandleDeprecated(false);
    setMarketAddress(marketAddress);
  };
  var extractBase = function (a) {
    return a.split('/')[0];
  };
  var extractQuote = function (a) {
    return a.split('/')[1];
  };
  var selectedMarket =
    (_c =
      (_b = markets_1
        .getMarketInfos(customMarkets)
        .find(function (proposedMarket) {
          return (
            (market === null || market === void 0 ? void 0 : market.address) &&
            proposedMarket.address.equals(market.address)
          );
        })) === null || _b === void 0
        ? void 0
        : _b.address) === null || _c === void 0
      ? void 0
      : _c.toBase58();
  react_1.useEffect(
    function () {
      console.log(selectedMarket, 'selectedMarket##');
    },
    [selectedMarket],
  );
  return react_1['default'].createElement(
    'div',
    { className: 'select-box' },
    selectedMarket
      ? react_1['default'].createElement(
          react_1['default'].Fragment,
          null,
          react_1['default'].createElement('img', {
            src: marketIcon[selectedMarket].beforeCoin,
            className: 'coin-icon-before',
            alt: '',
          }),
          react_1['default'].createElement('img', {
            src: marketIcon[selectedMarket].afterCoin,
            className: 'coin-icon-after',
            alt: '',
          }),
        )
      : null,
    react_1['default'].createElement(
      antd_1.Select,
      {
        showSearch: true,
        size: 'large',
        // style={{ width: 200 }}
        placeholder: placeholder || 'Select a market',
        optionFilterProp: 'name',
        bordered: false,
        onSelect: onSetMarketAddress,
        listHeight: 400,
        value: selectedMarket,
        filterOption: function (input, option) {
          var _a;
          return (
            ((_a =
              option === null || option === void 0 ? void 0 : option.name) ===
              null || _a === void 0
              ? void 0
              : _a.toLowerCase().indexOf(input.toLowerCase())) >= 0
          );
        },
        suffixIcon: react_1['default'].createElement(
          'svg',
          {
            className: 'icon modal-icon-close',
            fill: 'rgba(255, 255, 255, 0.5)',
            'aria-hidden': 'true',
          },
          react_1['default'].createElement('use', { xlinkHref: '#icondown' }),
        ),
      },
      customMarkets &&
        customMarkets.length > 0 &&
        react_1['default'].createElement(
          OptGroup,
          { label: 'Custom' },
          customMarkets.map(function (_a, i) {
            var address = _a.address,
              name = _a.name;
            return react_1['default'].createElement(
              Option,
              {
                value: address,
                key: nanoid_1.nanoid(),
                name: name,
                style: {
                  padding: '10px',
                },
              },
              react_1['default'].createElement(
                antd_1.Row,
                null,
                react_1['default'].createElement(
                  antd_1.Col,
                  { flex: 'auto' },
                  name,
                ),
                selectedMarket !== address &&
                  react_1['default'].createElement(
                    antd_1.Col,
                    null,
                    react_1['default'].createElement(icons_1.DeleteOutlined, {
                      onClick: function (e) {
                        e.stopPropagation();
                        e.nativeEvent.stopImmediatePropagation();
                        onDeleteCustomMarket && onDeleteCustomMarket(address);
                      },
                    }),
                  ),
              ),
            );
          }),
        ),
      react_1['default'].createElement(
        OptGroup,
        { label: 'Markets' },
        markets
          .sort(function (a, b) {
            return extractQuote(a.name) === 'USDT' &&
              extractQuote(b.name) !== 'USDT'
              ? -1
              : extractQuote(a.name) !== 'USDT' &&
                extractQuote(b.name) === 'USDT'
              ? 1
              : 0;
          })
          .sort(function (a, b) {
            return extractBase(a.name) < extractBase(b.name)
              ? -1
              : extractBase(a.name) > extractBase(b.name)
              ? 1
              : 0;
          })
          .map(function (_a, i) {
            var address = _a.address,
              name = _a.name,
              deprecated = _a.deprecated;
            return react_1['default'].createElement(
              Option,
              {
                value: address.toBase58(),
                key: nanoid_1.nanoid(),
                name: name,
                style: {
                  padding: '10px',
                },
              },
              name,
              ' ',
              deprecated ? ' (Deprecated)' : null,
            );
          }),
      ),
    ),
  );
}
var DeprecatedMarketsPage = function (_a) {
  var switchToLiveMarkets = _a.switchToLiveMarkets;
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(
      antd_1.Row,
      null,
      react_1['default'].createElement(
        antd_1.Col,
        { flex: 'auto' },
        react_1['default'].createElement(
          DeprecatedMarketsInstructions_1['default'],
          { switchToLiveMarkets: switchToLiveMarkets },
        ),
      ),
    ),
  );
};
var RenderNormal = function (_a) {
  var onChangeOrderRef = _a.onChangeOrderRef,
    onPrice = _a.onPrice,
    onSize = _a.onSize;
  return react_1['default'].createElement(
    antd_1.Row,
    {
      style: {
        minHeight: '900px',
        flexWrap: 'nowrap',
      },
    },
    react_1['default'].createElement(
      antd_1.Col,
      { flex: 'auto', style: { paddingTop: '8px' } },
      react_1['default'].createElement(
        'div',
        { style: { height: '652px', width: '100%' } },
        react_1['default'].createElement(TradingView_1.TVChartContainer, null),
      ),
      react_1['default'].createElement(UserInfoTable_1['default'], {
        smallScreen: false,
      }),
    ),
    react_1['default'].createElement(
      antd_1.Col,
      { flex: '328px' },
      react_1['default'].createElement(Orderbook_1['default'], {
        smallScreen: false,
        onPrice: onPrice,
        onSize: onSize,
      }),
      react_1['default'].createElement(TradesTable_1['default'], {
        smallScreen: false,
      }),
    ),
    react_1['default'].createElement(
      antd_1.Col,
      {
        flex: '320px',
        style: {
          display: 'flex',
          flexDirection: 'column',
          background: 'rgba(#02101D,0.8)',
        },
      },
      react_1['default'].createElement(TradeForm_1['default'], {
        setChangeOrderRef: onChangeOrderRef,
      }),
      react_1['default'].createElement(StandaloneBalancesDisplay_1['default'], {
        smallScreen: false,
      }),
    ),
  );
};
var RenderSmall = function (_a) {
  var onChangeOrderRef = _a.onChangeOrderRef,
    onPrice = _a.onPrice,
    onSize = _a.onSize;
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(
      antd_1.Row,
      {
        style: {
          minHeight: '900px',
          flexWrap: 'nowrap',
        },
      },
      react_1['default'].createElement(
        antd_1.Col,
        { flex: 'auto', style: { height: '100%' } },
        react_1['default'].createElement(
          'div',
          { style: { display: 'flex' } },
          react_1['default'].createElement(
            'div',
            { style: { flex: 1, marginTop: '8px' } },
            react_1['default'].createElement(
              TradingView_1.TVChartContainer,
              null,
            ),
          ),
          react_1['default'].createElement(
            'div',
            { style: { width: '320px' } },
            react_1['default'].createElement(Orderbook_1['default'], {
              smallScreen: true,
              onPrice: onPrice,
              onSize: onSize,
              depth: 5,
            }),
            react_1['default'].createElement(TradesTable_1['default'], {
              smallScreen: true,
            }),
          ),
        ),
        react_1['default'].createElement(UserInfoTable_1['default'], {
          smallScreen: true,
        }),
      ),
      react_1['default'].createElement(
        antd_1.Col,
        {
          flex: '320px',
          style: { height: '100%', display: 'flex', flexDirection: 'column' },
        },
        react_1['default'].createElement(TradeForm_1['default'], {
          setChangeOrderRef: onChangeOrderRef,
        }),
        react_1['default'].createElement(
          StandaloneBalancesDisplay_1['default'],
          { smallScreen: true },
        ),
      ),
    ),
  );
};
var RenderSmaller = function (_a) {
  var onChangeOrderRef = _a.onChangeOrderRef,
    onPrice = _a.onPrice,
    onSize = _a.onSize;
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(
      antd_1.Row,
      null,
      react_1['default'].createElement(
        antd_1.Col,
        { xs: 24, sm: 12, style: { height: '100%', display: 'flex' } },
        react_1['default'].createElement(TradeForm_1['default'], {
          style: { flex: 1 },
          setChangeOrderRef: onChangeOrderRef,
        }),
      ),
      react_1['default'].createElement(
        antd_1.Col,
        { xs: 24, sm: 12 },
        react_1['default'].createElement(
          StandaloneBalancesDisplay_1['default'],
          { smallScreen: true },
        ),
      ),
    ),
    react_1['default'].createElement(
      antd_1.Row,
      {
        style: {
          height: 'auto',
        },
      },
      react_1['default'].createElement(
        antd_1.Col,
        { xs: 24, sm: 12, style: { height: '100%', display: 'flex' } },
        react_1['default'].createElement(TradingView_1.TVChartContainer, null),
      ),
      react_1['default'].createElement(
        antd_1.Col,
        { xs: 24, sm: 12, style: { height: '100%', display: 'flex' } },
        react_1['default'].createElement(Orderbook_1['default'], {
          smallScreen: true,
          onPrice: onPrice,
          onSize: onSize,
        }),
      ),
      react_1['default'].createElement(
        antd_1.Col,
        { xs: 24, sm: 12, style: { height: '300px', display: 'flex' } },
        react_1['default'].createElement(TradesTable_1['default'], {
          smallScreen: true,
        }),
      ),
    ),
    react_1['default'].createElement(
      antd_1.Row,
      { style: { width: 'calc(100vw - 16px)', overflow: 'hidden' } },
      react_1['default'].createElement(
        'div',
        { style: { width: '700px' } },
        react_1['default'].createElement(UserInfoTable_1['default'], {
          smallScreen: true,
        }),
      ),
    ),
  );
};
var templateObject_1;
