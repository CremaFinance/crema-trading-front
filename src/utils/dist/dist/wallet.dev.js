'use strict';

exports.__esModule = true;
exports.useWallet = exports.WalletProvider = exports.WALLET_PROVIDERS = void 0;

var react_1 = require('react');

var sol_wallet_adapter_1 = require('@project-serum/sol-wallet-adapter');

var notifications_1 = require('./notifications');

var connection_1 = require('./connection');

var utils_1 = require('./utils');

var antd_1 = require('antd');

var wallet_adapters_1 = require('../wallet-adapters');

var ASSET_URL =
  'https://cdn.jsdelivr.net/gh/solana-labs/oyster@main/assets/wallets';
exports.WALLET_PROVIDERS = [
  {
    name: 'sollet.io',
    url: 'https://www.sollet.io',
    icon: ASSET_URL + '/sollet.svg',
    iconName: 'Sollet',
  },
  {
    name: 'Sollet Extension',
    url: 'https://www.sollet.io/extension',
    icon: ASSET_URL + '/sollet.svg',
    adapter: wallet_adapters_1.SolletExtensionAdapter,
    iconName: 'Sollet Extension',
  },
  {
    name: 'Ledger',
    url: 'https://www.ledger.com',
    icon: ASSET_URL + '/ledger.svg',
    adapter: wallet_adapters_1.LedgerWalletAdapter,
    iconName: 'Ledger',
  },
  {
    name: 'Solong',
    url: 'https://www.solong.com',
    icon: ASSET_URL + '/solong.png',
    adapter: wallet_adapters_1.SolongWalletAdapter,
    iconName: 'Solong',
  },
  {
    name: 'Phantom',
    url: 'https://www.phantom.app',
    icon: 'https://www.phantom.app/img/logo.png',
    adapter: wallet_adapters_1.PhantomWalletAdapter,
    iconName: 'Phantom',
  },
  {
    name: 'MathWallet',
    url: 'https://www.mathwallet.org',
    icon: ASSET_URL + '/mathwallet.svg',
    adapter: wallet_adapters_1.MathWalletAdapter,
    iconName: 'MathWallet',
  }, // {
  //   name: 'Blocto',
  //   url: 'https://www.mathwallet.org',
  //   icon: ASSET_URL + '/mathwallet.svg',
  //   adapter: wallet_adapters_1.MathWalletAdapter,
  //   iconName: 'MathWallet',
  // },
  // {
  //   name: 'Bonfida',
  //   url: 'https://www.mathwallet.org',
  //   icon: ASSET_URL + '/mathwallet.svg',
  //   adapter: wallet_adapters_1.MathWalletAdapter,
  //   iconName: 'MathWallet',
  // },
];
var WalletContext = react_1['default'].createContext(null);

function WalletProvider(_a) {
  var _b, _c;

  var children = _a.children;
  var endpoint = connection_1.useConnectionConfig().endpoint;

  var _d = react_1.useState(false),
    autoConnect = _d[0],
    setAutoConnect = _d[1];

  var _e = utils_1.useLocalStorageState('walletProvider'),
    providerUrl = _e[0],
    setProviderUrl = _e[1];

  var provider = react_1.useMemo(
    function () {
      return exports.WALLET_PROVIDERS.find(function (_a) {
        var url = _a.url;
        return url === providerUrl;
      });
    },
    [providerUrl],
  );

  var _f = react_1.useState(undefined),
    wallet = _f[0],
    setWallet = _f[1];

  react_1.useEffect(
    function () {
      if (provider) {
        var updateWallet_1 = function updateWallet_1() {
          // hack to also update wallet synchronously in case it disconnects
          // eslint-disable-next-line react-hooks/exhaustive-deps
          wallet = new (provider.adapter || sol_wallet_adapter_1['default'])(
            providerUrl,
            endpoint,
          );
          setWallet(wallet);
        };

        if (document.readyState !== 'complete') {
          // wait to ensure that browser extensions are loaded
          var listener_1 = function listener_1() {
            updateWallet_1();
            window.removeEventListener('load', listener_1);
          };

          window.addEventListener('load', listener_1);
          return function () {
            return window.removeEventListener('load', listener_1);
          };
        } else {
          updateWallet_1();
        }
      }
    },
    [provider, providerUrl, endpoint],
  );

  var _g = react_1.useState(false),
    connected = _g[0],
    setConnected = _g[1];

  react_1.useEffect(
    function () {
      if (wallet) {
        wallet.on('connect', function () {
          console.log('useEffect####wallet####', wallet);

          if (
            wallet === null || wallet === void 0 ? void 0 : wallet.publicKey
          ) {
            console.log('connected');
            localStorage.removeItem('feeDiscountKey');
            setConnected(true);
            var walletPublicKey = wallet.publicKey.toBase58();
            var keyToDisplay =
              walletPublicKey.length > 20
                ? walletPublicKey.substring(0, 7) +
                  '.....' +
                  walletPublicKey.substring(
                    walletPublicKey.length - 7,
                    walletPublicKey.length,
                  )
                : walletPublicKey;
            notifications_1.notify({
              message: 'Wallet update',
              description: 'Connected to wallet ' + keyToDisplay,
            });
          }
        });
        wallet.on('disconnect', function () {
          setConnected(false);
          notifications_1.notify({
            message: 'Wallet update',
            description: 'Disconnected from wallet',
          });
          localStorage.removeItem('feeDiscountKey');
        });
      }

      return function () {
        setConnected(false);

        if (wallet && wallet.connected) {
          wallet.disconnect();
          setConnected(false);
        }
      };
    },
    [wallet],
  );
  react_1.useEffect(
    function () {
      if (wallet && autoConnect) {
        wallet.connect();
        setAutoConnect(false);
      }

      return function () {};
    },
    [wallet, autoConnect],
  );

  var _h = react_1.useState(false),
    isModalVisible = _h[0],
    setIsModalVisible = _h[1];

  var select = react_1.useCallback(function () {
    return setIsModalVisible(true);
  }, []);
  var close = react_1.useCallback(function () {
    return setIsModalVisible(false);
  }, []);
  return react_1['default'].createElement(
    WalletContext.Provider,
    {
      value: {
        wallet: wallet,
        connected: connected,
        select: select,
        providerUrl: providerUrl,
        setProviderUrl: setProviderUrl,
        providerName:
          (_c =
            (_b = exports.WALLET_PROVIDERS.find(function (_a) {
              var url = _a.url;
              return url === providerUrl;
            })) === null || _b === void 0
              ? void 0
              : _b.name) !== null && _c !== void 0
            ? _c
            : providerUrl,
      },
    },
    children,
    react_1['default'].createElement(
      antd_1.Modal, // title="Select Wallet"
      {
        // title="Select Wallet"
        title: react_1['default'].createElement(
          'div',
          null,
          react_1['default'].createElement(
            'h3',
            {
              className: 'wallet-title',
            },
            'Connect a Wallet',
          ),
          react_1['default'].createElement(
            'p',
            {
              className: 'wallet-sub-title',
            },
            'Please select a wallet to connect to this dapp:',
          ),
        ),
        okText: 'Connect',
        visible: isModalVisible,
        okButtonProps: {
          style: {
            display: 'none',
          },
        },
        onCancel: close,
        width: 430,
        footer: null,
        closeIcon: react_1['default'].createElement(
          'svg',
          {
            className: 'icon modal-icon-close',
            'aria-hidden': 'true',
          },
          react_1['default'].createElement('use', {
            xlinkHref: '#iconicon_close',
          }),
        ),
      },
      react_1['default'].createElement(
        'ul',
        {
          className: 'select-wallet',
        },
        exports.WALLET_PROVIDERS.map(function (provider) {
          var onClick = function onClick() {
            setProviderUrl(provider.url);
            setAutoConnect(true);
            close();
          };

          return (
            // <Button
            //   size="large"
            //   type={providerUrl === provider.url ? 'primary' : 'ghost'}
            //   onClick={onClick}
            //   icon={
            //     <img
            //       alt={`${provider.name}`}
            //       width={20}
            //       height={20}
            //       src={provider.icon}
            //       style={{ marginRight: 8 }}
            //     />
            //   }
            //   style={{
            //     display: 'block',
            //     width: '100%',
            //     textAlign: 'left',
            //     marginBottom: 8,
            //   }}
            // >
            //   {provider.name}
            // </Button>
            react_1['default'].createElement(
              'li',
              {
                className: 'wallet-item',
                onClick: onClick,
                key: provider.name,
              },
              react_1['default'].createElement(
                'div',
                null,
                react_1['default'].createElement('img', {
                  alt: '' + provider.name,
                  width: 20,
                  height: 20,
                  // src={provider.icon}
                  src: require('../assets/img/wallets/' +
                    provider.iconName.replace(' ', '-').toLowerCase() +
                    '.png'),
                  style: {
                    marginRight: 8,
                  },
                }),
                react_1['default'].createElement('span', null, provider.name),
              ),
            )
          );
        }),
      ),
    ),
  );
}

exports.WalletProvider = WalletProvider;

function useWallet() {
  var context = react_1.useContext(WalletContext);

  if (!context) {
    throw new Error('Missing wallet context');
  }

  var wallet = context.wallet;
  return {
    connected: context.connected,
    wallet: wallet,
    providerUrl: context.providerUrl,
    setProvider: context.setProviderUrl,
    providerName: context.providerName,
    select: context.select,
    connect: function connect() {
      wallet ? wallet.connect() : context.select();
    },
    disconnect: function disconnect() {
      wallet === null || wallet === void 0 ? void 0 : wallet.disconnect();
    },
  };
}

exports.useWallet = useWallet;
