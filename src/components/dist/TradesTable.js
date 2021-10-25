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
exports.__esModule = true;
var antd_1 = require('antd');
var react_1 = require('react');
var styled_components_1 = require('styled-components');
var markets_1 = require('../utils/markets');
var utils_1 = require('../utils/utils');
var FloatingElement_1 = require('./layout/FloatingElement');
var utils_2 = require('../utils/utils');
var Title = styled_components_1['default'].div(
  templateObject_1 ||
    (templateObject_1 = __makeTemplateObject(
      [
        '\n  padding:0 12px 12px px;\n  line-height: 1.5715;\n  color: rgba(255, 255, 255, 1);\n',
      ],
      [
        '\n  padding:0 12px 12px px;\n  line-height: 1.5715;\n  color: rgba(255, 255, 255, 1);\n',
      ],
    )),
);
var SizeTitle = styled_components_1['default'](antd_1.Row)(
  templateObject_2 ||
    (templateObject_2 = __makeTemplateObject(
      ['\n  padding: 20px 0 14px;\n  color: #434a59;\n'],
      ['\n  padding: 20px 0 14px;\n  color: #434a59;\n'],
    )),
);
function PublicTrades(_a) {
  var smallScreen = _a.smallScreen;
  var _b = markets_1.useMarket(),
    baseCurrency = _b.baseCurrency,
    quoteCurrency = _b.quoteCurrency,
    market = _b.market;
  var _c = markets_1.useBonfidaTrades(),
    trades = _c[0],
    loaded = _c[1];
  return react_1['default'].createElement(
    FloatingElement_1['default'],
    {
      style: smallScreen
        ? { flex: 1 }
        : {
            marginTop: '10px',
            // minHeight: '320px',
            // maxHeight: 'calc(100vh - 736px)',
            // minHeight: '320px',
            maxHeight: 'calc(100% - 683px)',
            minHeight: '314px',
            overflow: 'hidden',
          },
    },
    react_1['default'].createElement(Title, null, 'Recent Market Trades'),
    react_1['default'].createElement(
      SizeTitle,
      null,
      react_1['default'].createElement(
        antd_1.Col,
        { span: 8 },
        'Price (',
        quoteCurrency,
        ') ',
      ),
      react_1['default'].createElement(
        antd_1.Col,
        { span: 8, style: { textAlign: 'right' } },
        'Size (',
        baseCurrency,
        ')',
      ),
      react_1['default'].createElement(
        antd_1.Col,
        { span: 8, style: { textAlign: 'right' } },
        'Time',
      ),
    ),
    !!trades &&
      loaded &&
      react_1['default'].createElement(
        'div',
        {
          style: {
            marginRight: '-20px',
            paddingRight: '5px',
            overflowY: 'scroll',
            background: 'rgba(255,255,255,0.03)',
            minHeight: '200px',
            maxHeight: 'calc(100vh - 881px)',
            // maxHeight: smallScreen
            //   ? '126px'
            //   : 'calc(100vh - 881px)',
          },
        },
        trades.map(function (trade, i) {
          return react_1['default'].createElement(
            antd_1.Row,
            { key: i, style: { marginBottom: 4 } },
            react_1['default'].createElement(
              antd_1.Col,
              {
                span: 8,
                style: {
                  color: trade.side === 'buy' ? '#1FB690' : '#C24E4F',
                },
              },
              (market === null || market === void 0
                ? void 0
                : market.tickSize) && !isNaN(trade.price)
                ? Number(trade.price).toFixed(
                    utils_1.getDecimalCount(market.tickSize),
                  )
                : trade.price,
            ),
            react_1['default'].createElement(
              antd_1.Col,
              { span: 8, style: { textAlign: 'right' } },
              (market === null || market === void 0
                ? void 0
                : market.minOrderSize) && !isNaN(trade.size)
                ? Number(trade.size).toFixed(
                    utils_1.getDecimalCount(market.minOrderSize),
                  )
                : trade.size,
            ),
            react_1['default'].createElement(
              antd_1.Col,
              { span: 8, style: { textAlign: 'right', color: '#434a59' } },
              utils_2.timeFormat(trade.time, 'HMS'),
            ),
          );
        }),
      ),
  );
}
exports['default'] = PublicTrades;
var templateObject_1, templateObject_2;
