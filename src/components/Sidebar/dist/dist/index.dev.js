'use strict';

exports.__esModule = true;
exports.CustomSidebar = void 0;

var react_1 = require('react');

require('./index.less');

var LOGO_HYDRASWAP_svg_1 = require('../../assets/img/LOGO_HYDRASWAP.svg');

var LOGO_HYDRASWAP_h5_svg_1 = require('../../assets/img/LOGO_HYDRASWAP-h5.svg');

var icon_menuOpened_2x_png_1 = require('../../assets/img/icon_menuOpened@2x.png');

var icon_menuUp_2x_png_1 = require('../../assets/img/icon_menuUp@2x.png');

var tag_Preview_2x_png_1 = require('../../assets/img/tag-Preview@2x.png');

exports.CustomSidebar = function () {
  var _a = react_1.useState('close'),
    currentStatus = _a[0],
    setCurrentStatus = _a[1];

  var _b = react_1.useState(false),
    liquiditySubMenuIsShow = _b[0],
    setLiquiditySubMenuIsShow = _b[1];

  var _c = react_1.useState(false),
    farmsSubMenuIsShow = _c[0],
    setFarmsSubMenuIsShow = _c[1];

  var _d = react_1.useState(false),
    contactMenuShow = _d[0],
    setContactMenuShow = _d[1];

  var _e = react_1.useState(false),
    guidMenuShow = _e[0],
    setGuidMenuShow = _e[1];

  var _f = react_1.useState(false),
    testGuidMenuShow = _f[0],
    setTestGuidMenuShow = _f[1];

  function goUrl(url) {
    // window.location.href = `https://app.hydraswap.io/${url}`
    // let href = `https://app.hydraswap.io/${url}`
    var href = 'https://app.crema.finance/' + url; // let href = `https://www.hydratest.xyz/${url}`;

    var a = document.createElement('a');
    a.setAttribute('href', href);
    a.setAttribute('target', '_blank');
    a.click();
  }

  var imgIndex = null;

  function setHover(index) {
    console.log(index);
    imgIndex = index;
  }

  return react_1['default'].createElement(
    'div',
    {
      className: currentStatus === 'open' ? 'sidebar open' : 'sidebar close',
    },
    react_1['default'].createElement(
      'div',
      {
        className: 'logo',
      },
      react_1['default'].createElement('img', {
        className: 'open-logo',
        src: LOGO_HYDRASWAP_svg_1['default'],
      }),
      react_1['default'].createElement('img', {
        className: 'close-logo',
        src: LOGO_HYDRASWAP_h5_svg_1['default'],
      }),
    ),
    react_1['default'].createElement(
      'div',
      {
        className: 'toggle-btn',
      },
      currentStatus === 'close'
        ? react_1['default'].createElement('img', {
            className: 'toggle-btn',
            src: icon_menuUp_2x_png_1['default'],
            onClick: function onClick() {
              return setCurrentStatus('open');
            },
          })
        : react_1['default'].createElement('img', {
            className: 'toggle-btn',
            src: icon_menuOpened_2x_png_1['default'],
            onClick: function onClick() {
              return setCurrentStatus('close');
            },
          }),
    ),
    react_1['default'].createElement(
      'ul',
      {
        className: 'menu-list',
      },
      react_1['default'].createElement(
        'li',
        {
          className: 'active',
        },
        react_1['default'].createElement(
          'svg',
          {
            className: 'icon',
            'aria-hidden': 'true',
          },
          react_1['default'].createElement('use', {
            xlinkHref: '#iconicon-Trading',
          }),
        ),
        react_1['default'].createElement('span', null, 'Trading'),
      ),
      react_1['default'].createElement(
        'li',
        {
          onClick: function onClick() {
            return goUrl('swap');
          },
          className: 'swap-menu',
        },
        react_1['default'].createElement(
          'svg',
          {
            className: 'icon',
            'aria-hidden': 'true',
          },
          react_1['default'].createElement('use', {
            xlinkHref: '#iconicon-Swap',
          }),
        ),
        react_1['default'].createElement('span', null, 'Swap'),
      ),
      react_1['default'].createElement(
        'li',
        {
          className: 'have-sub-menu',
        },
        react_1['default'].createElement(
          'div',
          {
            className: 'title',
            onClick: function onClick() {
              return setLiquiditySubMenuIsShow(!liquiditySubMenuIsShow);
            },
          },
          react_1['default'].createElement(
            'svg',
            {
              className: 'icon',
              'aria-hidden': 'true',
            },
            react_1['default'].createElement('use', {
              xlinkHref: '#iconicon-Liquidity',
            }),
          ),
          react_1['default'].createElement(
            'div',
            {
              className: 'right',
            },
            react_1['default'].createElement('span', null, 'Liquidity'),
            react_1['default'].createElement(
              'svg',
              {
                className: liquiditySubMenuIsShow
                  ? 'open icon-down icon'
                  : 'close icon-down icon',
                'aria-hidden': 'true',
              },
              react_1['default'].createElement('use', {
                xlinkHref: '#icondown',
              }),
            ),
          ),
        ),
        react_1['default'].createElement(
          'ul',
          {
            className: liquiditySubMenuIsShow
              ? 'open sub-menu-list'
              : 'close sub-menu-list',
          },
          react_1['default'].createElement(
            'li',
            {
              onClick: function onClick() {
                return goUrl('liquidity');
              },
            },
            'Add Liquidity',
          ),
          react_1['default'].createElement(
            'li',
            {
              onClick: function onClick() {
                return goUrl('farming');
              },
            },
            'Add C-Liquidity',
            react_1['default'].createElement('img', {
              src: tag_Preview_2x_png_1['default'],
              alt: 'previewtag',
            }),
          ),
        ),
      ),
      react_1['default'].createElement(
        'li',
        {
          className: 'have-sub-menu',
        },
        react_1['default'].createElement(
          'div',
          {
            className: 'title',
            onClick: function onClick() {
              return setFarmsSubMenuIsShow(!farmsSubMenuIsShow);
            },
          },
          react_1['default'].createElement(
            'svg',
            {
              className: 'icon',
              'aria-hidden': 'true',
            },
            react_1['default'].createElement('use', {
              xlinkHref: '#iconicon-Farms',
            }),
          ),
          react_1['default'].createElement(
            'div',
            {
              className: 'right',
            },
            react_1['default'].createElement('span', null, 'Farms'),
            react_1['default'].createElement(
              'svg',
              {
                className: farmsSubMenuIsShow
                  ? 'open icon-down icon'
                  : 'close icon-down icon',
                'aria-hidden': 'true',
              },
              react_1['default'].createElement('use', {
                xlinkHref: '#icondown',
              }),
            ),
          ),
        ),
        react_1['default'].createElement(
          'ul',
          {
            className: farmsSubMenuIsShow
              ? 'open sub-menu-list'
              : 'close sub-menu-list',
          },
          react_1['default'].createElement(
            'li',
            {
              onClick: function onClick() {
                return goUrl('farming');
              },
            },
            'LP Farming',
          ),
          react_1['default'].createElement(
            'li',
            {
              onClick: function onClick() {
                return goUrl('staking');
              },
            },
            'Staking',
          ),
        ),
      ),
    ),
    react_1['default'].createElement(
      'div',
      {
        className: 'bottom',
      },
      react_1['default'].createElement(
        'div',
        {
          className: guidMenuShow ? 'active guide' : 'guide',
          onClick: function onClick() {
            return setGuidMenuShow(!guidMenuShow);
          },
        },
        react_1['default'].createElement(
          'svg',
          {
            className: 'icon',
            'aria-hidden': 'true',
          },
          react_1['default'].createElement('use', {
            xlinkHref: '#iconmenu',
          }),
        ),
      ),
      react_1['default'].createElement(
        'div',
        {
          className: contactMenuShow ? 'active contact-list' : 'contact-list',
          onClick: function onClick() {
            return setContactMenuShow(!contactMenuShow);
          },
        },
        currentStatus == 'close'
          ? react_1['default'].createElement(
              'a',
              null,
              react_1['default'].createElement(
                'svg',
                {
                  className: 'icon',
                  'aria-hidden': 'true',
                },
                react_1['default'].createElement('use', {
                  xlinkHref: '#iconicon_share',
                }),
              ),
            )
          : null,
        contactMenuShow,
        react_1['default'].createElement(
          'a',
          {
            href: 'https://t.me/cremafinance',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          react_1['default'].createElement(
            'svg',
            {
              className: 'icon',
              'aria-hidden': 'true',
            },
            react_1['default'].createElement('use', {
              xlinkHref: '#iconicon_twitter1',
            }),
          ),
        ),
        react_1['default'].createElement(
          'a',
          {
            href: 'https://t.me/hydraswap',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          react_1['default'].createElement(
            'svg',
            {
              className: 'icon',
              'aria-hidden': 'true',
            },
            react_1['default'].createElement('use', {
              xlinkHref: '#iconicon_TelegramGroup3',
            }),
          ),
        ),
        react_1['default'].createElement(
          'a',
          {
            href: 'https://t.me/hydraswap_ANN',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          react_1['default'].createElement(
            'svg',
            {
              className: 'icon',
              'aria-hidden': 'true',
            },
            react_1['default'].createElement('use', {
              xlinkHref: '#iconicon_TelegramChannel',
            }),
          ),
        ),
        react_1['default'].createElement(
          'a',
          {
            href: 'https://medium.com/@HydraSwap',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          react_1['default'].createElement(
            'svg',
            {
              className: 'icon',
              'aria-hidden': 'true',
            },
            react_1['default'].createElement('use', {
              xlinkHref: '#iconicon_Medium',
            }),
          ),
        ),
        react_1['default'].createElement(
          'a',
          {
            href: 'https://discord.gg/AA26dw6Hpm',
            target: '_blank',
            rel: 'noopener noreferrer',
          },
          react_1['default'].createElement(
            'svg',
            {
              className: 'icon',
              'aria-hidden': 'true',
            },
            react_1['default'].createElement('use', {
              xlinkHref: '#iconicon_Discord',
            }),
          ),
        ),
      ),
    ),
  );
};
