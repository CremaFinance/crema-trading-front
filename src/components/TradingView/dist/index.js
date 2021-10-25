'use strict';
exports.__esModule = true;
exports.TVChartContainer = void 0;
var React = require('react');
require('./index.css');
var charting_library_1 = require('../../charting_library'); // Make sure to follow step 1 of the README
var markets_1 = require('../../utils/markets');
var bonfidaConnector_1 = require('../../utils/bonfidaConnector');
var tradingview_1 = require('../../utils/tradingview');
exports.TVChartContainer = function () {
  // @ts-ignore
  var defaultProps = {
    symbol: 'BTC/USDC',
    interval: '60',
    theme: 'Dark',
    containerId: 'tv_chart_container',
    datafeedUrl: bonfidaConnector_1.BONFIDA_DATA_FEED,
    libraryPath: '/charting_library/',
    fullscreen: false,
    autosize: true,
    studiesOverrides: {
      'volume.volume.color.1': '#1FB690',
      'volume.volume.color.0': '#C24E4F',
    },
  };
  var tvWidgetRef = React.useRef(null);
  var market = markets_1.useMarket().market;
  React.useEffect(
    function () {
      var widgetOptions = {
        symbol: tradingview_1.findTVMarketFromAddress(
          (market === null || market === void 0
            ? void 0
            : market.address.toBase58()) || '',
        ),
        // BEWARE: no trailing slash is expected in feed URL
        // tslint:disable-next-line:no-any
        datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
          defaultProps.datafeedUrl,
        ),
        interval: defaultProps.interval,
        container_id: defaultProps.containerId,
        library_path: defaultProps.libraryPath,
        locale: 'en',
        disabled_features: ['use_localstorage_for_settings'],
        enabled_features: ['study_templates'],
        load_last_chart: true,
        client_id: defaultProps.clientId,
        user_id: defaultProps.userId,
        fullscreen: defaultProps.fullscreen,
        autosize: defaultProps.autosize,
        studies_overrides: defaultProps.studiesOverrides,
        theme: 'Dark',
        overrides: {
          'paneProperties.background': '#171b20',
          'paneProperties.vertGridProperties.color': '#1D1D1D',
          'paneProperties.horzGridProperties.color': '#1D1D1D',
          'paneProperties.crossHairProperties.color': '#767988',
          'scalesProperties.lineColor': 'rgba(255, 255, 255, 0.1)',
          'scalesProperties.textColor': '#7d7d7d',
          'mainSeriesProperties.candleStyle.wickUpColor': '#1FB690',
          'mainSeriesProperties.candleStyle.wickDownColor': '#C24E4F',
          'mainSeriesProperties.candleStyle.borderUpColor': '#1FB690',
          'mainSeriesProperties.candleStyle.borderDownColor': '#C24E4F',
          'mainSeriesProperties.candleStyle.upColor': '#1FB690',
          'mainSeriesProperties.candleStyle.downColor': '#C24E4F',
          'scalesProperties.backgroundColor': '#1B2023',
          'mainSeriesProperties.hollowCandleStyle.upColor': '#1FB690',
          'mainSeriesProperties.hollowCandleStyle.downColor': '#C24E4F',
          'mainSeriesProperties.haStyle.upColor': '#1FB690',
          'mainSeriesProperties.haStyle.downColor': '#C24E4F',
          'mainSeriesProperties.barStyle.upColor': '#1FB690',
          'mainSeriesProperties.barStyle.downColor': '#C24E4F',
        },
      };
      var tvWidget = new charting_library_1.widget(widgetOptions);
      tvWidgetRef.current = tvWidget;
      tvWidget.onChartReady(function () {
        tvWidget.headerReady().then(function () {
          var button = tvWidget.createButton();
          button.setAttribute('title', 'Click to show a notification popup');
          button.classList.add('apply-common-tooltip');
          button.addEventListener('click', function () {
            return tvWidget.showNoticeDialog({
              title: 'Notification',
              body: 'TradingView Charting Library API works correctly',
              callback: function () {
                console.log('It works!!');
              },
            });
          });
          button.innerHTML = 'Check API';
        });
      });
    },
    [market],
  );
  return React.createElement('div', {
    id: defaultProps.containerId,
    className: 'tradingview-chart',
  });
};
