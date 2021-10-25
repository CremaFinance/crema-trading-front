'use strict';
exports.__esModule = true;
exports.H5Header = void 0;
var react_1 = require('react');
require('./index.less');
var logo_2x_2x_png_1 = require('../../assets/img/crema/logo@2x@2x.png');
var icon_Trading_2x_png_1 = require('../../assets/img/crema/icon-Trading@2x.png');
// import MenuOpenedIcon from '../../assets/img/icon_menuOpened@2x.png';
// import MenuUpIcon from '../../assets/img/icon_menuUp@2x.png';
// import { createDecipheriv } from 'crypto';
exports.H5Header = function () {
  var _a = react_1.useState(false),
    showMenu = _a[0],
    setShowMenu = _a[1];
  var _b = react_1.useState(false),
    liquiditySubMenuIsShow = _b[0],
    setLiquiditySubMenuIsShow = _b[1];
  function goUrl(url) {
    // window.location.href = `https://app.hydraswap.io/${url}`
    var href = 'https://app.crema.finance/' + url;
    // let href = `https://www.hydratest.xyz/${url}`;
    var a = document.createElement('a');
    a.setAttribute('href', href);
    a.setAttribute('target', '_blank');
    a.click();
  }
  return react_1['default'].createElement(
    'div',
    { className: 'h5-head-container' },
    react_1['default'].createElement(
      'div',
      { className: 'top' },
      react_1['default'].createElement(
        'div',
        { className: 'left' },
        react_1['default'].createElement('img', {
          src: logo_2x_2x_png_1['default'],
        }),
      ),
      react_1['default'].createElement(
        'div',
        { className: 'right' },
        !showMenu
          ? react_1['default'].createElement(
              'svg',
              {
                className: 'icon',
                'aria-hidden': 'true',
                onClick: function () {
                  return setShowMenu(!showMenu);
                },
              },
              react_1['default'].createElement('use', {
                xlinkHref: '#iconicon_Menu',
              }),
            )
          : react_1['default'].createElement(
              'svg',
              {
                className: 'icon',
                'aria-hidden': 'true',
                onClick: function () {
                  return setShowMenu(!showMenu);
                },
              },
              react_1['default'].createElement('use', {
                xlinkHref: '#iconicon_Menu1',
              }),
            ),
      ),
    ),
    showMenu
      ? react_1['default'].createElement(
          'div',
          { className: 'menu-list-box' },
          react_1['default'].createElement(
            'ul',
            { className: 'menu-list' },
            react_1['default'].createElement(
              'li',
              null,
              react_1['default'].createElement('img', {
                src: icon_Trading_2x_png_1['default'],
              }),
              react_1['default'].createElement('span', null, 'Trading'),
            ),
            react_1['default'].createElement(
              'li',
              {
                className: 'have-sub-menu',
                onClick: function () {
                  return goUrl('pool');
                },
              },
              react_1['default'].createElement(
                'div',
                {
                  className: 'title',
                  onClick: function () {
                    return setLiquiditySubMenuIsShow(!liquiditySubMenuIsShow);
                  },
                },
                react_1['default'].createElement('i', null),
                react_1['default'].createElement('span', null, 'Pools'),
              ),
            ),
          ),
          react_1['default'].createElement(
            'div',
            { className: 'contact-list' },
            react_1['default'].createElement(
              'a',
              {
                href: 'https://t.me/cremafinance',
                rel: 'noopener noreferrer',
                target: '_blank',
              },
              react_1['default'].createElement(
                'svg',
                { className: 'icon', 'aria-hidden': 'true' },
                react_1['default'].createElement('use', {
                  xlinkHref: '#iconicon_twitter1',
                }),
              ),
            ),
            react_1['default'].createElement(
              'a',
              { href: 'https://t.me/cremaofficial', target: '_blank' },
              react_1['default'].createElement(
                'svg',
                { className: 'icon', 'aria-hidden': 'true' },
                react_1['default'].createElement('use', {
                  xlinkHref: '#iconicon_TelegramGroup3',
                }),
              ),
            ),
            react_1['default'].createElement(
              'a',
              { href: 'https://medium.com/@hello_9645', target: '_blank' },
              react_1['default'].createElement(
                'svg',
                { className: 'icon', 'aria-hidden': 'true' },
                react_1['default'].createElement('use', {
                  xlinkHref: '#iconicon_Medium',
                }),
              ),
            ),
            react_1['default'].createElement(
              'a',
              {
                href: 'https://discord.com/invite/5bVg7frrkr',
                target: '_blank',
              },
              react_1['default'].createElement(
                'svg',
                { className: 'icon', 'aria-hidden': 'true' },
                react_1['default'].createElement('use', {
                  xlinkHref: '#iconicon_Discord',
                }),
              ),
            ),
          ),
        )
      : null,
  );
};
