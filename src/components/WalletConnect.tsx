import React, { useState } from 'react';
import { Dropdown, Menu, Modal, Button } from 'antd';
import { useWallet } from '../utils/wallet';
import LinkAddress from './LinkAddress';
import copy from 'copy-to-clipboard';
import { notify } from '../utils/notifications';
import solana from '../assets/img/crema/icon_SOL@2x.png'
function copyAddress(address) {
  // this.setState({
  //   snackbarMessage: 'coop success',
  //   snackbarType: 'Info'
  // });
  // copy(this.state.currentAddress);
  copy(address);
  notify({
    message: 'Success',
    description: 'Copy Success',
    type: 'success',
  });
  // const snackbarObj = { snackbarMessage: 'copy success', snackbarType: 'Error' }
  // this.setState(snackbarObj);
}
export default function WalletConnect() {
  const { providerName, connected, wallet, select, connect, disconnect } = useWallet();
  const publicKey = (connected && wallet?.publicKey?.toBase58()) || '';
  const [showAccountModal, setShowAccountModal] = useState(false);
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


  return (
    <div className="connect-wallet-box">
      {!connected ?
        <div className="connect-wallet-btn" onClick={select} style={{padding:'0 30px'}}>
          <svg className="icon" aria-hidden="true">
            <use xlinkHref="#iconicon_wallet"></use>
          </svg>
          <span className="connect-text">Connect</span>
        </div>
        :
          <div className="connect-wallet-btn" onClick={() => setShowAccountModal(true)}>
            <div className="wallet-info">
              {/* <img className="wallet-icon" src={solana} alt="" /> */}
              {
                providerName?
                <img className="wallet-icon" src={require(`../assets/img/wallets/${providerName.replace(' ', '-').toLowerCase()}.png`)} />
                :null
              }
              <span className="platform">{providerName}</span>
            </div>
            <span className="address">
              {publicKey.substr(0, 4)}
          ...
          {publicKey.substr(publicKey.length - 4, 4)}
            </span>
            {/* <svg className="icon icon-down" aria-hidden="true">
          <use xlinkHref="#icondown"></use>
        </svg> */}
          </div>
      }
      <div className="wallet-more">
            <p></p>
            <p></p>
            <p></p>
            <ul className="wallet-slider-menu">
              {/* <li>
                <a href="">
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#icondocs"></use>
                </svg>
                  Docs
                  </a>
              </li> */}
              <li>
                <a href="https://t.me/cremafinance" target="_blank" rel="noopener noreferrer"> 
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icontwitter"></use>
                  </svg>
                Twitter
                </a>
              </li>
              <li>
                <a href="https://t.me/cremaofficial" target="_blank" rel="noopener noreferrer">
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icontelegram"></use>
                  </svg>
                Telegram
                </a>
              </li>
              <li>
                <a href="https://medium.com/@hello_9645" target="_blank" rel="noopener noreferrer">
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#iconmedium"></use>
                  </svg>
                Medium
                </a>
              </li>
              <li>
                <a href="https://discord.com/invite/5bVg7frrkr" target="_blank" rel="noopener noreferrer">
                  <svg className="icon" aria-hidden="true">
                    <use xlinkHref="#icondiscord"></use>
                  </svg>
                Discord
                </a>
              </li>
            </ul>
          </div>
      <Modal
        title="Account"
        okText="Connect"
        visible={showAccountModal}
        okButtonProps={{ style: { display: 'none' } }}
        onCancel={() => setShowAccountModal(false)}
        width={430}
        footer={null}
        closeIcon={
          <svg className="icon modal-icon-close" aria-hidden="true">
            <use xlinkHref="#iconicon_close"></use>
          </svg>
        }
      >
        <div className="wallet-info">
          <div className="platform">Connected with {providerName}</div>
          <p className="address">
            {publicKey.substr(0, 7)}
               ...
               {publicKey.substr(publicKey.length - 4, 4)}
          </p>
          <div className="copy-and-view">
            <a className="copy" onClick={() => copyAddress(publicKey)}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#iconicon_copy"></use>
              </svg>
              <span>Copy Address</span>
            </a>
            <a className="view" target="_blank" href={`https://explorer.solana.com//address/${publicKey}`}>
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#iconicon_The_top_right"></use>
              </svg>
              <span>View on explorer</span>
            </a>
          </div>
          <div className="btn-box">
            <div className="disconnect-btn-box">
              <Button className="disconnect-btn" onClick={()=>{
                disconnect()
                setShowAccountModal(false)
              }}> Disconnect</Button>
            </div>
            <Button className="switch-wallet-btn" onClick={()=>{
                disconnect()
                setShowAccountModal(false)
                select()
              }}> Switch Wallet </Button>
          </div>
        </div>
      </Modal>

    </div>
  )
}
