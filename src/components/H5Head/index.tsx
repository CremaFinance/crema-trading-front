import React, { useState } from 'react';
import './index.less';

import LogoImg from '../../assets/img/crema/logo@2x@2x.png';

import LiquidityIcon from '../../assets/img/leftbar_liquidity@2x.png';
import MinningIcon from '../../assets/img/leftbar_minning_selected@2x.png';
import SwapIcon from '../../assets/img/leftbar_swap_selected@2x.png';
import TradingIcon from '../../assets/img/crema/icon-Trading@2x.png';
import mainNetLogo from '../../assets/img/crema/tag-Mainnet.png'

// import MenuOpenedIcon from '../../assets/img/icon_menuOpened@2x.png';
// import MenuUpIcon from '../../assets/img/icon_menuUp@2x.png';
// import { createDecipheriv } from 'crypto';

export const H5Header = () => {

    const [showMenu, setShowMenu] = useState(false)
    const [liquiditySubMenuIsShow, setLiquiditySubMenuIsShow] = useState(false)

    function goUrl(url) {

        // window.location.href = `https://app.hydraswap.io/${url}`
        let href = `https://app.crema.finance/${url}`
        // let href = `https://www.hydratest.xyz/${url}`;
        let a = document.createElement('a');
        a.setAttribute('href', href);
        a.setAttribute('target', '_blank');
        a.click();
    }

    return (
      <div className="h5-head-container">
        <div className="top">
          <div className="left">
            <img src={LogoImg} />
            <img style={{height:'16px',marginLeft:'10px'}} src={mainNetLogo} alt="" />
          </div>
          <div className="right">
            {!showMenu ? (
              <svg
                className="icon"
                aria-hidden="true"
                onClick={() => setShowMenu(!showMenu)}
              >
                <use xlinkHref="#iconicon_Menu"></use>
              </svg>
            ) : (
              <svg
                className="icon"
                aria-hidden="true"
                onClick={() => setShowMenu(!showMenu)}
              >
                <use xlinkHref="#iconicon_Menu1"></use>
              </svg>
            )}
          </div>
        </div>
        {showMenu ? (
          <div className="menu-list-box">
            <ul className="menu-list">
              <li>
                <img src={TradingIcon} />
                <span>Trading</span>
              </li>
              <li onClick={() => goUrl('swap')} className="swap-menu">
                <i></i>
                <span>Swap</span>
              </li>
              <li className="have-sub-menu" onClick={() => goUrl('pool')}>
                <div
                  className="title"
                  onClick={() =>
                    setLiquiditySubMenuIsShow(!liquiditySubMenuIsShow)
                  }
                >
                  {/* <img className="menu-icon" src={imgIndex==2?LiquidityIconHover:LiquidityIcon} /> */}
                  <i></i>
                  <span>Pools</span>
                  {/* <svg
                    className={
                      liquiditySubMenuIsShow ? 'open icon' : 'close icon'
                    }
                    aria-hidden="true"
                  >
                    <use xlinkHref="#icondown"></use>
                  </svg> */}
                </div>
                {/* <ul
                  className={
                    liquiditySubMenuIsShow
                      ? 'open sub-menu-list'
                      : 'close sub-menu-list'
                  }
                >
                  <li onClick={() => goUrl('liquidity')}>Add Liquidity</li>
                  <li onClick={() => goUrl('farming')}>LP Farming</li>
                </ul> */}
              </li>
              <li onClick={() => goUrl('farming')} className="farming-menu">
                <i></i>
                <span>Farming</span>
              </li>
              {/* <li onClick={() => goUrl('staking')} className="staking-menu">
                <i></i>
                <span>Staking</span>
              </li> */}
            </ul>
            {/* <a
              className="paper-guide"
              href="https://hydraswap.gitbook.io/hydra-beta-testing-guide"
              rel="noopener noreferrer"
              target="_blank"
            >
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#icona-icon-TestGuide"></use>
              </svg>
              <span>Test Guide</span>
            </a> */}
            {/* <a
              className="paper-guide"

            >
              <svg className="icon" aria-hidden="true">
                <use xlinkHref="#iconmenu"></use>
              </svg>
              <span>Docs</span>
            </a> */}

            <div className="contact-list">
              <a
                href="https://t.me/cremafinance"
                rel="noopener noreferrer"
                target="_blank"
              >
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#iconicon_twitter1"></use>
                </svg>
              </a>
              <a href="https://t.me/cremaofficial" target="_blank">
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#iconicon_TelegramGroup3"></use>
                </svg>
              </a>
              {/* <a href="https://t.me/hydraswap_ANN" target="_blank">
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#iconicon_TelegramChannel"></use>
                </svg>
              </a> */}
              <a href="https://medium.com/@hello_9645" target="_blank">
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#iconicon_Medium"></use>
                </svg>
              </a>
              <a href="https://discord.com/invite/5bVg7frrkr" target="_blank">
                <svg className="icon" aria-hidden="true">
                  <use xlinkHref="#iconicon_Discord"></use>
                </svg>
              </a>
            </div>
          </div>
        ) : null}
      </div>
    );
}