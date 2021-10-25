"use strict";
exports.__esModule = true;
var react_1 = require("react");
var antd_1 = require("antd");
var wallet_1 = require("../utils/wallet");
var copy_to_clipboard_1 = require("copy-to-clipboard");
var notifications_1 = require("../utils/notifications");
function copyAddress(address) {
    // this.setState({
    //   snackbarMessage: 'coop success',
    //   snackbarType: 'Info'
    // });
    // copy(this.state.currentAddress);
    copy_to_clipboard_1["default"](address);
    notifications_1.notify({
        message: 'Success',
        description: 'Copy Success',
        type: 'success'
    });
    // const snackbarObj = { snackbarMessage: 'copy success', snackbarType: 'Error' }
    // this.setState(snackbarObj);
}
function WalletConnect() {
    var _a;
    var _b = wallet_1.useWallet(), providerName = _b.providerName, connected = _b.connected, wallet = _b.wallet, select = _b.select, connect = _b.connect, disconnect = _b.disconnect;
    var publicKey = (connected && ((_a = wallet === null || wallet === void 0 ? void 0 : wallet.publicKey) === null || _a === void 0 ? void 0 : _a.toBase58())) || '';
    var _c = react_1.useState(false), showAccountModal = _c[0], setShowAccountModal = _c[1];
    // const menu = (
    //   <Menu>
    //     {connected && <LinkAddress shorten={true} address={publicKey} />}
    //     <Menu.Item key="3" onClick={select}>
    //       Change Wallet
    //     </Menu.Item>
    //   </Menu>
    // );
    // return (
    //   <Dropdown.Button onClick={connected ? disconnect : connect} overlay={menu}>
    //     {connected ? 'Disconnect' : 'Connect'}
    //   </Dropdown.Button>
    // );
    // console.log(publicKey,'publicKey##')
    return (react_1["default"].createElement("div", { className: "connect-wallet-box" },
        !connected ?
            react_1["default"].createElement("div", { className: "connect-wallet-btn", onClick: select, style: { padding: '0 30px' } },
                react_1["default"].createElement("svg", { className: "icon", "aria-hidden": "true" },
                    react_1["default"].createElement("use", { xlinkHref: "#iconicon_wallet" })),
                react_1["default"].createElement("span", { className: "connect-text" }, "Connect"))
            :
                react_1["default"].createElement("div", { className: "connect-wallet-btn", onClick: function () { return setShowAccountModal(true); } },
                    react_1["default"].createElement("div", { className: "wallet-info" },
                        providerName ?
                            react_1["default"].createElement("img", { className: "wallet-icon", src: require("../assets/img/wallets/" + providerName.replace(' ', '-').toLowerCase() + ".png") })
                            : null,
                        react_1["default"].createElement("span", { className: "platform" }, providerName)),
                    react_1["default"].createElement("span", { className: "address" },
                        publicKey.substr(0, 4),
                        "...",
                        publicKey.substr(publicKey.length - 4, 4))),
        react_1["default"].createElement("div", { className: "wallet-more" },
            react_1["default"].createElement("p", null),
            react_1["default"].createElement("p", null),
            react_1["default"].createElement("p", null),
            react_1["default"].createElement("ul", { className: "wallet-slider-menu" },
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement("a", { href: "https://t.me/cremafinance", target: "_blank", rel: "noopener noreferrer" },
                        react_1["default"].createElement("svg", { className: "icon", "aria-hidden": "true" },
                            react_1["default"].createElement("use", { xlinkHref: "#icontwitter" })),
                        "Twitter")),
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement("a", { href: "https://t.me/cremaofficial", target: "_blank", rel: "noopener noreferrer" },
                        react_1["default"].createElement("svg", { className: "icon", "aria-hidden": "true" },
                            react_1["default"].createElement("use", { xlinkHref: "#icontelegram" })),
                        "Telegram")),
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement("a", { href: "https://medium.com/@hello_9645", target: "_blank", rel: "noopener noreferrer" },
                        react_1["default"].createElement("svg", { className: "icon", "aria-hidden": "true" },
                            react_1["default"].createElement("use", { xlinkHref: "#iconmedium" })),
                        "Medium")),
                react_1["default"].createElement("li", null,
                    react_1["default"].createElement("a", { href: "https://discord.com/invite/5bVg7frrkr", target: "_blank", rel: "noopener noreferrer" },
                        react_1["default"].createElement("svg", { className: "icon", "aria-hidden": "true" },
                            react_1["default"].createElement("use", { xlinkHref: "#icondiscord" })),
                        "Discord")))),
        react_1["default"].createElement(antd_1.Modal, { title: "Account", okText: "Connect", visible: showAccountModal, okButtonProps: { style: { display: 'none' } }, onCancel: function () { return setShowAccountModal(false); }, width: 430, footer: null, closeIcon: react_1["default"].createElement("svg", { className: "icon modal-icon-close", "aria-hidden": "true" },
                react_1["default"].createElement("use", { xlinkHref: "#iconicon_close" })) },
            react_1["default"].createElement("div", { className: "wallet-info" },
                react_1["default"].createElement("div", { className: "platform" },
                    "Connected with ",
                    providerName),
                react_1["default"].createElement("p", { className: "address" },
                    publicKey.substr(0, 7),
                    "...",
                    publicKey.substr(publicKey.length - 4, 4)),
                react_1["default"].createElement("div", { className: "copy-and-view" },
                    react_1["default"].createElement("a", { className: "copy", onClick: function () { return copyAddress(publicKey); } },
                        react_1["default"].createElement("svg", { className: "icon", "aria-hidden": "true" },
                            react_1["default"].createElement("use", { xlinkHref: "#iconicon_copy" })),
                        react_1["default"].createElement("span", null, "Copy Address")),
                    react_1["default"].createElement("a", { className: "view", target: "_blank", href: "https://explorer.solana.com//address/" + publicKey },
                        react_1["default"].createElement("svg", { className: "icon", "aria-hidden": "true" },
                            react_1["default"].createElement("use", { xlinkHref: "#iconicon_The_top_right" })),
                        react_1["default"].createElement("span", null, "View on explorer"))),
                react_1["default"].createElement("div", { className: "btn-box" },
                    react_1["default"].createElement("div", { className: "disconnect-btn-box" },
                        react_1["default"].createElement(antd_1.Button, { className: "disconnect-btn", onClick: function () {
                                disconnect();
                                setShowAccountModal(false);
                            } }, " Disconnect")),
                    react_1["default"].createElement(antd_1.Button, { className: "switch-wallet-btn", onClick: function () {
                            disconnect();
                            setShowAccountModal(false);
                            select();
                        } }, " Switch Wallet "))))));
}
exports["default"] = WalletConnect;
