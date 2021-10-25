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
var react_router_dom_1 = require('react-router-dom');
var styled_components_1 = require('styled-components');
var wallet_1 = require('../utils/wallet');
var connection_1 = require('../utils/connection');
var CustomClusterEndpointDialog_1 = require('./CustomClusterEndpointDialog');
var notifications_1 = require('../utils/notifications');
var web3_js_1 = require('@solana/web3.js');
var WalletConnect_1 = require('./WalletConnect');
var markets_1 = require('../utils/markets');
var Wrapper = styled_components_1['default'].div(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      [
        '\n  /* background-color: #0d1017; */\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  padding-right: 10px;\n  flex-wrap: wrap;\n',
      ],
      [
        '\n  /* background-color: #0d1017; */\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  padding-right: 10px;\n  flex-wrap: wrap;\n',
      ],
    )),
);
var LogoWrapper = styled_components_1['default'].div(
  templateObject_2 ||
    (templateObject_2 = __makeTemplateObject(
      [
        '\n  display: flex;\n  align-items: center;\n  color: #07ebad;\n  font-weight: bold;\n  cursor: pointer;\n  img {\n    height: 30px;\n    margin-right: 8px;\n  }\n',
      ],
      [
        '\n  display: flex;\n  align-items: center;\n  color: #07ebad;\n  font-weight: bold;\n  cursor: pointer;\n  img {\n    height: 30px;\n    margin-right: 8px;\n  }\n',
      ],
    )),
);
var EXTERNAL_LINKS = {
  '/learn': 'https://serum-academy.com/en/serum-dex/',
  '/add-market': 'https://serum-academy.com/en/add-market/',
  '/wallet-support': 'https://serum-academy.com/en/wallet-support',
  '/dex-list': 'https://serum-academy.com/en/dex-list/',
  '/developer-resources': 'https://serum-academy.com/en/developer-resources/',
  '/explorer': 'https://explorer.solana.com',
  '/srm-faq': 'https://projectserum.com/srm-faq',
  '/swap': 'https://swap.projectserum.com',
};
function TopBar() {
  var _a = wallet_1.useWallet(),
    connected = _a.connected,
    wallet = _a.wallet;
  var _b = connection_1.useConnectionConfig(),
    endpoint = _b.endpoint,
    endpointInfo = _b.endpointInfo,
    setEndpoint = _b.setEndpoint,
    availableEndpoints = _b.availableEndpoints,
    setCustomEndpoints = _b.setCustomEndpoints;
  var _c = react_1.useState(false),
    addEndpointVisible = _c[0],
    setAddEndpointVisible = _c[1];
  var _d = react_1.useState(false),
    testingConnection = _d[0],
    setTestingConnection = _d[1];
  var location = react_router_dom_1.useLocation();
  var history = react_router_dom_1.useHistory();
  var _e = react_1.useState(false),
    searchFocussed = _e[0],
    setSearchFocussed = _e[1];
  var handleClick = react_1.useCallback(
    function (e) {
      if (!(e.key in EXTERNAL_LINKS)) {
        history.push(e.key);
      }
    },
    [history],
  );
  var onAddCustomEndpoint = function (info) {
    var existingEndpoint = availableEndpoints.some(function (e) {
      return e.endpoint === info.endpoint;
    });
    if (existingEndpoint) {
      notifications_1.notify({
        message: 'An endpoint with the given url already exists',
        type: 'error',
      });
      return;
    }
    var handleError = function (e) {
      console.log('Connection to ' + info.endpoint + ' failed: ' + e);
      notifications_1.notify({
        message: 'Failed to connect to ' + info.endpoint,
        type: 'error',
      });
    };
    try {
      var connection = new web3_js_1.Connection(info.endpoint, 'recent');
      connection
        .getEpochInfo()
        .then(function (result) {
          setTestingConnection(true);
          console.log('testing connection to ' + info.endpoint);
          var newCustomEndpoints = __spreadArrays(
            availableEndpoints.filter(function (e) {
              return e.custom;
            }),
            [info],
          );
          setEndpoint(info.endpoint);
          setCustomEndpoints(newCustomEndpoints);
        })
        ['catch'](handleError);
    } catch (e) {
      handleError(e);
    } finally {
      setTestingConnection(false);
    }
  };
  var endpointInfoCustom = endpointInfo && endpointInfo.custom;
  react_1.useEffect(
    function () {
      var handler = function () {
        if (endpointInfoCustom) {
          setEndpoint(connection_1.ENDPOINTS[0].endpoint);
        }
      };
      window.addEventListener('beforeunload', handler);
      return function () {
        return window.removeEventListener('beforeunload', handler);
      };
    },
    [endpointInfoCustom, setEndpoint],
  );
  var tradePageUrl = location.pathname.startsWith('/market/')
    ? location.pathname
    : markets_1.getTradePageUrl();
  return react_1['default'].createElement(
    react_1['default'].Fragment,
    null,
    react_1['default'].createElement(CustomClusterEndpointDialog_1['default'], {
      visible: addEndpointVisible,
      testingConnection: testingConnection,
      onAddCustomEndpoint: onAddCustomEndpoint,
      onClose: function () {
        return setAddEndpointVisible(false);
      },
    }),
    react_1['default'].createElement(
      Wrapper,
      null,
      react_1['default'].createElement(WalletConnect_1['default'], null),
    ),
  );
}
exports['default'] = TopBar;
var templateObject_1, templateObject_2;
