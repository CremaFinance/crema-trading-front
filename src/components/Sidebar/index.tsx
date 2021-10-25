import React, { useEffect, useState } from 'react';
import './index.less';
import LogoOpen from '../../assets/img/LOGO_HYDRASWAP.svg';
import LogoClose from '../../assets/img/LOGO_HYDRASWAP-h5.svg';

import LiquidityIcon from '../../assets/img/leftbar_liquidity@2xnormal.png';
import MinningIcon from '../../assets/img/leftbar_minning_selected@2xnormal.png';
import SwapIcon from '../../assets/img/leftbar_swap_selected@2xnormal.png';
import TradingIcon from '../../assets/img/leftbar_Trading_selected@2x.png';
import MenuOpenedIcon from '../../assets/img/icon_menuOpened@2x.png';
import MenuUpIcon from '../../assets/img/icon_menuUp@2x.png';
import PreviewTag from '../../assets/img/tag-Preview@2x.png';


import LiquidityIconHover from '../../assets/img/leftbar_liquidity@2x.png';
import MinningIconHover from '../../assets/img/leftbar_Trading_selected@2x.png';
import SwapIconHover from '../../assets/img/leftbar_swap_selected@2x.png';
import TradingIconHover from '../../assets/img/leftbar_Trading_selected@2x.png';
export const CustomSidebar = () => {
    const [currentStatus, setCurrentStatus] = useState('close');
    const [liquiditySubMenuIsShow, setLiquiditySubMenuIsShow] = useState(false);
    const [farmsSubMenuIsShow, setFarmsSubMenuIsShow] = useState(false);
    const [contactMenuShow, setContactMenuShow] = useState(false);
    const [guidMenuShow, setGuidMenuShow] = useState(false);
    const [testGuidMenuShow, setTestGuidMenuShow] = useState(false);

    function goUrl(url) {
        // window.location.href = `https://app.hydraswap.io/${url}`
        // let href = `https://app.hydraswap.io/${url}`
        let href = `https://app.crema.finance/${url}`;
        // let href = `https://www.hydratest.xyz/${url}`;
        let a = document.createElement('a');
        a.setAttribute('href', href);
        a.setAttribute('target', '_blank');
        a.click();
    }

    let imgIndex = null;
    function setHover(index) {
        console.log(index);
        imgIndex = index;
    }

    return (
      <div
        className={currentStatus === 'open' ? 'sidebar open' : 'sidebar close'}
      >
        <div className="logo">
          <img className="open-logo" src={LogoOpen} />
          <img className="close-logo" src={LogoClose} />
        </div>
        <div className="toggle-btn">
          {currentStatus === 'close' ? (
            <img
              className="toggle-btn"
              src={MenuUpIcon}
              onClick={() => setCurrentStatus('open')}
            />
          ) : (
            <img
              className="toggle-btn"
              src={MenuOpenedIcon}
              onClick={() => setCurrentStatus('close')}
            />
          )}
        </div>
        <ul className="menu-list">
          <li className="active">
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#iconicon-Trading"></use>
            </svg>
            <span>Trading</span>
          </li>
          <li onClick={() => goUrl('swap')} className="swap-menu">
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#iconicon-Swap"></use>
            </svg>
            <span>Swap</span>
          </li>
          <li className="have-sub-menu">
            <div
              className="title"
              onClick={() => setLiquiditySubMenuIsShow(!liquiditySubMenuIsShow)}
            >
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#iconicon-Liquidity"></use>
              </svg>
              <div className="right">
                <span>Liquidity</span>
                <svg
                  className={
                    liquiditySubMenuIsShow
                      ? 'open icon-down icon'
                      : 'close icon-down icon'
                  }
                  aria-hidden="true"
                >
                  <use xlinkHref="#icondown"></use>
                </svg>
              </div>
            </div>
            <ul
              className={
                liquiditySubMenuIsShow
                  ? 'open sub-menu-list'
                  : 'close sub-menu-list'
              }
            >
              <li onClick={() => goUrl('liquidity')}>Add Liquidity</li>
              <li onClick={() => goUrl('farming')}>
                Add C-Liquidity
                <img src={PreviewTag} alt="previewtag" />
              </li>
            </ul>
          </li>
          <li className="have-sub-menu">
            <div
              className="title"
              onClick={() => setFarmsSubMenuIsShow(!farmsSubMenuIsShow)}
            >
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#iconicon-Farms"></use>
              </svg>
              <div className="right">
                <span>Farms</span>
                <svg
                  className={
                    farmsSubMenuIsShow
                      ? 'open icon-down icon'
                      : 'close icon-down icon'
                  }
                  aria-hidden="true"
                >
                  <use xlinkHref="#icondown"></use>
                </svg>
              </div>
            </div>
            <ul
              className={
                farmsSubMenuIsShow
                  ? 'open sub-menu-list'
                  : 'close sub-menu-list'
              }
            >
              <li onClick={() => goUrl('farming')}>LP Farming</li>
              <li onClick={() => goUrl('staking')}>Staking</li>
            </ul>
          </li>
        </ul>

        <div className="bottom">
          {/* <div
            className={
              testGuidMenuShow ? 'active guide test-guide' : 'guide test-guide'
            }
            onClick={() => setTestGuidMenuShow(!testGuidMenuShow)}
          >
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#icona-icon-TestGuide"></use>
            </svg>
            <a
              href="https://hydraswap.gitbook.io/hydra-beta-testing-guide"
              target="_blank"
              rel="noopener noreferrer"
            >
              Test Guide
            </a>
          </div> */}
          <div
            className={guidMenuShow ? 'active guide' : 'guide'}
            onClick={() => setGuidMenuShow(!guidMenuShow)}
          >
            <svg className="icon" aria-hidden="true">
              <use xlinkHref="#iconmenu"></use>
            </svg>
            {/* <a
              href="https://hydraswap.gitbook.io/hydraswap-gitbook/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs
            </a> */}
          </div>
          <div
            className={contactMenuShow ? 'active contact-list' : 'contact-list'}
            onClick={() => setContactMenuShow(!contactMenuShow)}
          >
            {currentStatus == 'close' ? (
              <a>
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#iconicon_share"></use>
                </svg>
              </a>
            ) : null}
            {contactMenuShow}
            <a
              href="https://t.me/cremafinance"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#iconicon_twitter1"></use>
              </svg>
            </a>
            <a
              href="https://t.me/hydraswap"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#iconicon_TelegramGroup3"></use>
              </svg>
            </a>
            <a
              href="https://t.me/hydraswap_ANN"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#iconicon_TelegramChannel"></use>
              </svg>
            </a>
            <a
              href="https://medium.com/@HydraSwap"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#iconicon_Medium"></use>
              </svg>
            </a>
            <a
              href="https://discord.gg/AA26dw6Hpm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#iconicon_Discord"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
    );
}