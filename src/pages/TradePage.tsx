import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, Col, Popover, Row, Select, Typography } from 'antd';
import styled from 'styled-components';
import Orderbook from '../components/Orderbook';
import UserInfoTable from '../components/UserInfoTable';
import StandaloneBalancesDisplay from '../components/StandaloneBalancesDisplay';
import {
  getMarketInfos,
  getTradePageUrl,
  MarketProvider,
  useMarket,
  useMarketsList,
  useUnmigratedDeprecatedMarkets,
} from '../utils/markets';
import TradeForm from '../components/TradeForm';
import TradesTable from '../components/TradesTable';
import LinkAddress from '../components/LinkAddress';
import { TVChartContainer } from '../components/TradingView';
import TopBar from '../components/TopBar';
import DeprecatedMarketsInstructions from '../components/DeprecatedMarketsInstructions';
import {
  DeleteOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import CustomMarketDialog from '../components/CustomMarketDialog';
import { notify } from '../utils/notifications';
import { useHistory, useParams } from 'react-router-dom';
import { nanoid } from 'nanoid';
import '../assets/css/tradePage/index.less';
import TradeIcon from '../assets/img/crema/icon-Trading@2x.png'
import SwapIcon from '../assets/img/crema/icon-Swap@2x.png'
import PoolsIcon from '../assets/img/crema/icon-Pools@2x.png'
import FarmingIcon from '../assets/img/crema/icon-Farming@2x.png'

import StakingIcon from '../assets/img/crema/icon-Staking@2x.png'
import SRMICon from '../assets/img/crema/SRM.png'
import USDTIcon from '../assets/img/crema/icon_coin_usdt@2x.png'
import SOLICon from '../assets/img/crema/icon_SOL@2x.png'
import USDCIcon from '../assets/img/crema/icon_USDC.png'
import mainNetLogo from '../assets/img/crema/tag-Mainnet.png'

const { Option, OptGroup } = Select;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 8px 8px;
  .borderNone .ant-select-selector {
    border: none !important;
  }
`;

const marketIcon = {
  'HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1':{
    beforeCoin:SOLICon,
    afterCoin:USDTIcon,
  },
  '9wFFyRfZBsuAha4YcuxcXLKwMxJR43S7fPfQLusDBzvT':{
    beforeCoin:SOLICon,
    afterCoin:USDCIcon,
  },
  'AtNnsY1AyRERWJ8xCskfz38YdvruWVJQUVXgScC1iPb':{
    beforeCoin:SRMICon,
    afterCoin:USDTIcon,
  },
  'ByRys5tuUWDgL73G8JBAEfkdFf8JWBzPBDHsBVQ5vbQA':{
    beforeCoin:SRMICon,
    afterCoin:USDCIcon,
  },
  'jyei9Fpj2GtHLDDGgcuhDacxYLLiSyxU4TY7KxB2xai':{
    beforeCoin:SRMICon,
    afterCoin:SOLICon,
  },
}
export default function TradePage() {
  const { marketAddress } = useParams();
  useEffect(() => {
    if (marketAddress) {
      localStorage.setItem('marketAddress', JSON.stringify(marketAddress));
    }
  }, [marketAddress]);
  const history = useHistory();
  function setMarketAddress(address) {
    history.push(getTradePageUrl(address));
  }

  return (
    <MarketProvider
      marketAddress={marketAddress}
      setMarketAddress={setMarketAddress}
    >
      <TradePageInner />
    </MarketProvider>
  );
}

function TradePageInner() {
  const {
    market,
    marketName,
    customMarkets,
    setCustomMarkets,
    setMarketAddress,
  } = useMarket();
  const markets = useMarketsList();
  const [handleDeprecated, setHandleDeprecated] = useState(false);
  const [addMarketVisible, setAddMarketVisible] = useState(false);
  const deprecatedMarkets = useUnmigratedDeprecatedMarkets();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    document.title = marketName ? `${marketName} — Crema Finance | A Powerful Concentrated Liquidity Protocol` : 'Crema Finance | A Powerful Concentrated Liquidity Protocol';
  }, [marketName]);

  const changeOrderRef = useRef<
    ({ size, price }: { size?: number; price?: number }) => void
  >();

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const width = dimensions?.width;
  const componentProps = {
    onChangeOrderRef: (ref) => (changeOrderRef.current = ref),
    onPrice: useCallback(
      (price) => changeOrderRef.current && changeOrderRef.current({ price }),
      [],
    ),
    onSize: useCallback(
      (size) => changeOrderRef.current && changeOrderRef.current({ size }),
      [],
    ),
  };
  const component = (() => {
    if (handleDeprecated) {
      return (
        <DeprecatedMarketsPage
          switchToLiveMarkets={() => setHandleDeprecated(false)}
        />
      );
    } else if (width < 1000) {
      return <RenderSmaller {...componentProps} />;
    } else if (width < 1450) {
      return <RenderSmall {...componentProps} />;
      // return <RenderNormal {...componentProps} />;
    } else {
      return <RenderNormal {...componentProps} />;
    }
  })();

  const onAddCustomMarket = (customMarket) => {
    const marketInfo = getMarketInfos(customMarkets).some(
      (m) => m.address.toBase58() === customMarket.address,
    );
    if (marketInfo) {
      notify({
        message: `A market with the given ID already exists`,
        type: 'error',
      });
      return;
    }
    const newCustomMarkets = [...customMarkets, customMarket];
    setCustomMarkets(newCustomMarkets);
    setMarketAddress(customMarket.address);
  };

  const onDeleteCustomMarket = (address) => {
    const newCustomMarkets = customMarkets.filter((m) => m.address !== address);
    setCustomMarkets(newCustomMarkets);
  };

  return (
    <>
      <CustomMarketDialog
        visible={addMarketVisible}
        onClose={() => setAddMarketVisible(false)}
        onAddCustomMarket={onAddCustomMarket}
      />
      <Wrapper>

        <Row
        className="pc-menu"
          align="middle"
          style={{ paddingLeft: 10, paddingRight: 5, background: 'rgba(255,255,255,0.03)', height: '76px', marginLeft: '0px' }}
          gutter={16}
        >
          <Col style={{display: 'flex',alignItems:'center'}}>
            <div className="logo"></div>
            {/* <img style={{height:'16px',marginRight:'10px'}} src={mainNetLogo} alt="" /> */}
          </Col>
          <Col style={{ padding: '2px', borderRadius: '8px', marginRight: '28px', background: 'linear-gradient(214deg, #59BDAD 0%, #6676F5 61%, #9A89F9 76%, #EBA7FF 100%)' }}>
            <div className="menu-item-active">
              <img className='page-icon' src={TradeIcon} alt="" />
              <span>Trading</span>
            </div>
          </Col>
          <Col style={{ padding: '8px 17px', marginRight: '7px', color: 'rgba(255,255,255,0.5)' }}>
            <div className="menu-item" onClick={() => goUrl('jupswap')}>
              <img className='page-icon' src={SwapIcon} alt="" />
              <span>Swap</span>
            </div>
          </Col>
          <Col style={{ padding: '8px 17px', marginRight: '7px', color: 'rgba(255,255,255,0.5)' }}>
            <div className="menu-item" onClick={() => goUrl('pool')}>
              <img className='page-icon' src={PoolsIcon} alt="" />
              <span>Pools</span>
            </div>
          </Col>
          {/* <Col style={{ padding: '8px 17px', marginRight: '7px', color: 'rgba(255,255,255,0.5)' }}>
            <div className="menu-item" onClick={() => goUrl('farming')}>
              <img className='page-icon' src={FarmingIcon} alt="" />
              <span>Farming</span>
            </div>
          </Col> */}
          {/* <Col style={{ padding: '8px 17px', color: 'rgba(255,255,255,0.5)' }}>
            <div className="menu-item">
              <img className='page-icon' src={StakingIcon} alt="" />
              <span>Staking</span>
            </div>
          </Col> */}

          <Col style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <TopBar />
          </Col>
        </Row>
        <Row
        className='h5-head'
          align="middle"
          style={{ paddingLeft: 5, paddingRight: 5, background: 'rgba(255,255,255,0.03)', height: '76px', marginLeft: '0px', marginTop: '10px' }}
          gutter={16}
        >
          <Col style={{ paddingLeft: '10px' }}>
            <MarketSelector
              markets={markets}
              setHandleDeprecated={setHandleDeprecated}
              placeholder={'Select market'}
              customMarkets={customMarkets}
              onDeleteCustomMarket={onDeleteCustomMarket}
            />
          </Col>

          {market ? (
            <Col>
              <span style={{ marginRight: '8px', marginLeft: '60px' }}>Market Address</span>
              <Popover
                content={<LinkAddress address={market.publicKey.toBase58()} />}
                placement="bottomRight"
                title="Market address"
                trigger="click"
                overlayClassName='ant-popover-address'
              >
                <InfoCircleOutlined style={{ color: '#07ebad' }} />
              </Popover>
            </Col>
          ) : null}

          <Col>
            <span style={{ marginRight: '8px', marginLeft: '60px' }}>Add Custom Market</span>
            <PlusCircleOutlined
              style={{ color: '#07ebad' }}
              onClick={() => setAddMarketVisible(true)}
            />
          </Col>

        </Row>
        {component}
      </Wrapper>
    </>
  );
}

function goUrl(url) {
  // window.location.href = `https://app.hydraswap.io/${url}`
  // let href = `https://app.hydraswap.io/${url}`
  let href = `https://app.crema.finance/#/${url}`;
  // let href = `https://www.hydratest.xyz/${url}`;
  let a = document.createElement('a');
  a.setAttribute('href', href);
  a.setAttribute('target', '_blank');
  a.click();
}

function MarketSelector({
  markets,
  placeholder,
  setHandleDeprecated,
  customMarkets,
  onDeleteCustomMarket,
}) {
  const { market, setMarketAddress } = useMarket();

  const onSetMarketAddress = (marketAddress) => {
    setHandleDeprecated(false);
    setMarketAddress(marketAddress);
  };

  const extractBase = (a) => a.split('/')[0];
  const extractQuote = (a) => a.split('/')[1];
  const selectedMarket = getMarketInfos(customMarkets)
    .find(
      (proposedMarket) =>
        market?.address && proposedMarket.address.equals(market.address),
    )
    ?.address?.toBase58();
    useEffect(() => {
      console.log(selectedMarket,'selectedMarket##')
    },[selectedMarket])
  return (
    <div className="select-box">
      {
        selectedMarket?
        <>
        <img src={marketIcon[selectedMarket].beforeCoin} className='coin-icon-before' alt="" />
      <img src={marketIcon[selectedMarket].afterCoin} className='coin-icon-after' alt="" /></>:null
      }
      
      <Select
        showSearch
        size={'large'}
        // style={{ width: 200 }}
        placeholder={placeholder || 'Select a market'}
        optionFilterProp="name"
        bordered={false}
        onSelect={onSetMarketAddress}
        listHeight={400}
        value={selectedMarket}
        filterOption={(input, option) =>
          option?.name?.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }

        suffixIcon={<svg className="icon modal-icon-close" fill='rgba(255, 255, 255, 0.5)' aria-hidden="true">
          <use xlinkHref="#icondown"></use>
        </svg>}
      >

        {customMarkets && customMarkets.length > 0 && (
          <OptGroup label="Custom">
            {customMarkets.map(({ address, name }, i) => (
              <Option
                value={address}
                key={nanoid()}
                name={name}
                style={{
                  padding: '10px',
                  // @ts-ignore
                  // backgroundColor: i % 2 === 0 ? 'rgb(39, 44, 61)' : null,
                }}
              >
                <Row>
                  <Col flex="auto">{name}</Col>
                  {selectedMarket !== address && (
                    <Col>
                      <DeleteOutlined
                        onClick={(e) => {
                          e.stopPropagation();
                          e.nativeEvent.stopImmediatePropagation();
                          onDeleteCustomMarket && onDeleteCustomMarket(address);
                        }}
                      />
                    </Col>
                  )}
                </Row>
              </Option>
            ))}
          </OptGroup>
        )}
        <OptGroup label="Markets">
          {markets
            .sort((a, b) =>
              extractQuote(a.name) === 'USDT' && extractQuote(b.name) !== 'USDT'
                ? -1
                : extractQuote(a.name) !== 'USDT' &&
                  extractQuote(b.name) === 'USDT'
                  ? 1
                  : 0,
            )
            .sort((a, b) =>
              extractBase(a.name) < extractBase(b.name)
                ? -1
                : extractBase(a.name) > extractBase(b.name)
                  ? 1
                  : 0,
            )
            .map(({ address, name, deprecated }, i) => (
              <Option
                value={address.toBase58()}
                key={nanoid()}
                name={name}

                style={{
                  padding: '10px',
                  // @ts-ignore
                  // backgroundColor: i % 2 === 0 ? 'rgb(39, 44, 61)' : null,
                }}
              >
                {name} {deprecated ? ' (Deprecated)' : null}
              </Option>
            ))}
        </OptGroup>
      </Select>
    </div>
  );
}


const DeprecatedMarketsPage = ({ switchToLiveMarkets }) => {
  return (
    <>
      <Row>
        <Col flex="auto">
          <DeprecatedMarketsInstructions
            switchToLiveMarkets={switchToLiveMarkets}
          />
        </Col>
      </Row>
    </>
  );
};

const RenderNormal = ({ onChangeOrderRef, onPrice, onSize }) => {
  return (
    <Row
      style={{
        minHeight: '900px',
        flexWrap: 'nowrap'
      }}
    >
      <Col flex="auto" style={{ paddingTop: '8px' }}>
        <div style={{ height: '652px', width: '100%' }}>
          <TVChartContainer />
        </div>
        <UserInfoTable smallScreen={false} />
      </Col>
      <Col flex={'328px'}>
        <Orderbook smallScreen={false} onPrice={onPrice} onSize={onSize} />
        <TradesTable smallScreen={false} />
      </Col>
      <Col
        flex="320px"
        style={{
          display: 'flex', flexDirection: 'column', background: 'rgba(#02101D,0.8)',
        }}
      >
        <TradeForm setChangeOrderRef={onChangeOrderRef} />
        <StandaloneBalancesDisplay smallScreen={false} />
      </Col>
    </Row>
  );
};

const RenderSmall = ({ onChangeOrderRef, onPrice, onSize }) => {
  return (
    <>
      {/* <Row
        style={{
          height: '900px',
        }}
      >
        <Col flex="auto" style={{ height: '100%', display: 'flex' }}>
          <Orderbook
            smallScreen={true}
            depth={13}
            onPrice={onPrice}
            onSize={onSize}
          />
        </Col>
        <Col flex="auto" style={{ height: '100%', display: 'flex' }}>
          <TradesTable smallScreen={true} />
        </Col>
        <Col
          flex="320px"
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <TradeForm setChangeOrderRef={onChangeOrderRef} />
          <StandaloneBalancesDisplay />
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <UserInfoTable />
        </Col>
      </Row> */}
      <Row
        style={{
          minHeight: '900px',
          flexWrap: 'nowrap',
        }}
      >
        <Col flex="auto" style={{ height: '100%' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, marginTop: '8px' }}>
              <TVChartContainer />
            </div>
            <div style={{ width: '320px' }}>
              <Orderbook smallScreen={true} onPrice={onPrice} onSize={onSize} depth={5} />
              <TradesTable smallScreen={true} />
            </div>
          </div>
          <UserInfoTable smallScreen={true} />
        </Col>
        <Col
          flex="320px"
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <TradeForm setChangeOrderRef={onChangeOrderRef} />
          <StandaloneBalancesDisplay smallScreen={true} />
        </Col>
      </Row>
    </>
  );
};

const RenderSmaller = ({ onChangeOrderRef, onPrice, onSize }) => {
  return (
    <>
      <Row>
        <Col xs={24} sm={12} style={{ height: '100%', display: 'flex' }}>
          <TradeForm style={{ flex: 1 }} setChangeOrderRef={onChangeOrderRef} />
        </Col>
        <Col xs={24} sm={12}>
          <StandaloneBalancesDisplay smallScreen={true} />
        </Col>
      </Row>
      <Row
        style={{
          height: 'auto',
        }}
      >
        <Col xs={24} sm={12} style={{ height: '100%', display: 'flex' }}>
          <TVChartContainer />
        </Col>
        <Col xs={24} sm={12} style={{ height: '100%', display: 'flex' }}>
          <Orderbook smallScreen={true} onPrice={onPrice} onSize={onSize} />
        </Col>
        <Col xs={24} sm={12} style={{ height: '300px', display: 'flex' }}>
          <TradesTable smallScreen={true} />
        </Col>
      </Row>
      <Row style={{ width: 'calc(100vw - 16px)', overflow: 'hidden' }}>
        <div style={{ width: '700px' }}>
          <UserInfoTable smallScreen={true} />
        </div>
      </Row>
    </>
  );
};
