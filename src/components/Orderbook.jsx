import { Col, Row } from 'antd';
import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useMarket, useOrderbook, useMarkPrice } from '../utils/markets';
import { isEqual, getDecimalCount } from '../utils/utils';
import { useInterval } from '../utils/useInterval';
import FloatingElement from './layout/FloatingElement';
import usePrevious from '../utils/usePrevious';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import HongLvIcon from '../assets/img/crema/honglv.svg';
import HongLvSelIcon from '../assets/img/crema/honglv-sel.svg';
import HongIcon from '../assets/img/crema/hong.svg';
import HongSelIcon from '../assets/img/crema/hong-sel.svg';
import LvIcon from '../assets/img/crema/lv.svg';
import LvSelIcon from '../assets/img/crema/lv-sel.svg';

const Title = styled.div`
  color: rgba(255, 255, 255, 1);
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    cursor: pointer;
    margin-left: 12px;
  }
`;

const SizeTitle = styled(Row)`
  padding: 20px 0 14px;
  color: #434a59;
`;

const MarkPriceTitle = styled(Row)`
  padding: 17px 0 14px;
  font-weight: 700;
`;

const Line = styled.div`
  text-align: right;
  float: right;
  height: 100%;
  ${(props) =>
    props['data-width'] &&
    css`
      width: ${props['data-width']};
    `}
  ${(props) =>
    props['data-bgcolor'] &&
    css`
      background-color: ${props['data-bgcolor']};
    `}
`;

const Price = styled.div`
  position: absolute;
  right: 5px;
  color: white;
`;

/* export default function Orderbook({ smallScreen, depth = 7, onPrice, onSize }) { */
export default function Orderbook({
  smallScreen,
  depth = 11,
  onPrice,
  onSize,
}) {
  const markPrice = useMarkPrice();
  const [orderbook] = useOrderbook();
  const { baseCurrency, quoteCurrency } = useMarket();

  const currentOrderbookData = useRef(null);
  const lastOrderbookData = useRef(null);

  const [orderbookData, setOrderbookData] = useState(null);
  /* all, buy, sell */
  const [displayTab, setDisplayTab] = useState('all');

  /* console.log('test####') */

  function updateOrderBookData() {
    if (
      !currentOrderbookData.current ||
      JSON.stringify(currentOrderbookData.current) !==
        JSON.stringify(lastOrderbookData.current)
    ) {
      let bids = orderbook?.bids || [];
      let asks = orderbook?.asks || [];

      depth =
        displayTab === 'all' ? (smallScreen ? 5 : 11) : smallScreen ? 10 : 22;

      let sum = (total, [, size], index) =>
        index < depth ? total + size : total;
      let totalSize = bids.reduce(sum, 0) + asks.reduce(sum, 0);

      let bidsToDisplay = getCumulativeOrderbookSide(bids, totalSize, false);
      let asksToDisplay = getCumulativeOrderbookSide(asks, totalSize, true);

      currentOrderbookData.current = {
        bids: orderbook?.bids,
        asks: orderbook?.asks,
      };

      setOrderbookData({ bids: bidsToDisplay, asks: asksToDisplay });
    }
  }

  useInterval(() => {
    updateOrderBookData();
  }, 250);

  useEffect(() => {
    lastOrderbookData.current = {
      bids: orderbook?.bids,
      asks: orderbook?.asks,
    };
  }, [orderbook]);

  useEffect(() => {
    updateOrderBookData();
  }, [displayTab]);

  function getCumulativeOrderbookSide(orders, totalSize, backwards = false) {
    depth =
      displayTab === 'all' ? (smallScreen ? 5 : 11) : smallScreen ? 10 : 22;

    let cumulative = orders
      .slice(0, depth)
      .reduce((cumulative, [price, size], i) => {
        const cumulativeSize = (cumulative[i - 1]?.cumulativeSize || 0) + size;
        cumulative.push({
          price,
          size,
          cumulativeSize,
          sizePercent: Math.round((cumulativeSize / (totalSize || 1)) * 100),
        });
        return cumulative;
      }, []);
    if (backwards) {
      cumulative = cumulative.reverse();
    }
    return cumulative;
  }

  return (
    <FloatingElement
      style={
        smallScreen
          ? { flex: 1, paddingBottom: '4px' }
          : {
              height: '652px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }
      }
    >
      <Title>
        <span>Orderbook</span>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img
            src={displayTab === 'all' ? HongLvSelIcon : HongLvIcon}
            onClick={() => setDisplayTab('all')}
          />
          <img
            src={displayTab === 'buy' ? LvSelIcon : LvIcon}
            onClick={() => setDisplayTab('buy')}
          />
          <img
            src={displayTab === 'sell' ? HongSelIcon : HongIcon}
            onClick={() => setDisplayTab('sell')}
          />
        </div>
      </Title>
      <SizeTitle>
        <Col span={12} style={{ textAlign: 'left' }}>
          Size ({baseCurrency})
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          Price ({quoteCurrency})
        </Col>
      </SizeTitle>
      {displayTab === 'all' || displayTab === 'sell' ? (
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {orderbookData?.asks.map(({ price, size, sizePercent }) => (
            <OrderbookRow
              key={price + ''}
              price={price}
              size={size}
              side={'sell'}
              sizePercent={sizePercent}
              onPriceClick={() => onPrice(price)}
              onSizeClick={() => onSize(size)}
            />
          ))}
        </div>
      ) : null}
      <MarkPriceComponent markPrice={markPrice} smallScreen={smallScreen} />
      {displayTab === 'all' || displayTab === 'buy' ? (
        <div style={{ flex: 1, overflow: 'hidden' }}>
          {orderbookData?.bids.map(({ price, size, sizePercent }) => (
            <OrderbookRow
              key={price + ''}
              price={price}
              size={size}
              side={'buy'}
              sizePercent={sizePercent}
              onPriceClick={() => onPrice(price)}
              onSizeClick={() => onSize(size)}
            />
          ))}
        </div>
      ) : null}
    </FloatingElement>
  );
}

const OrderbookRow = React.memo(
  ({ side, price, size, sizePercent, onSizeClick, onPriceClick }) => {
    const element = useRef();

    const { market } = useMarket();

    useEffect(() => {
      if (side === 'buy') {
        // eslint-disable-next-line
        !element.current?.classList.contains('flash') &&
          element.current?.classList.add('flash');
        const id = setTimeout(
          () =>
            element.current?.classList.contains('flash') &&
            element.current?.classList.remove('flash'),
          250,
        );
        return () => clearTimeout(id);
      } else {
        // eslint-disable-next-line
        !element.current?.classList.contains('flash2') &&
          element.current?.classList.add('flash2');
        const id = setTimeout(
          () =>
            element.current?.classList.contains('flash2') &&
            element.current?.classList.remove('flash2'),
          250,
        );
        return () => clearTimeout(id);
      }
    }, [price, size]);

    let formattedSize =
      market?.minOrderSize && !isNaN(size)
        ? Number(size).toFixed(getDecimalCount(market.minOrderSize) + 1)
        : size;

    let formattedPrice =
      market?.tickSize && !isNaN(price)
        ? Number(price).toFixed(getDecimalCount(market.tickSize) + 1)
        : price;

    return (
      <Row ref={element} style={{ marginBottom: 1 }} onClick={onSizeClick}>
        <Col span={12} style={{ textAlign: 'left' }}>
          {formattedSize}
        </Col>
        <Col span={12} style={{ textAlign: 'right' }}>
          <Line
            data-width={sizePercent + '%'}
            data-bgcolor={side === 'buy' ? '#1FB690' : '#C24E4F'}
          />
          <Price onClick={onPriceClick}>{formattedPrice}</Price>
        </Col>
      </Row>
    );
  },
  (prevProps, nextProps) =>
    isEqual(prevProps, nextProps, ['price', 'size', 'sizePercent']),
);

const MarkPriceComponent = React.memo(
  ({ markPrice, smallScreen }) => {
    const { market } = useMarket();
    const previousMarkPrice = usePrevious(markPrice);

    let markPriceColor =
      markPrice > previousMarkPrice
        ? '#1FB690'
        : markPrice < previousMarkPrice
        ? 'rgba(255, 62, 62,0.52)'
        : 'white';

    let formattedMarkPrice =
      markPrice &&
      market?.tickSize &&
      markPrice.toFixed(getDecimalCount(market.tickSize));

    return (
      <MarkPriceTitle
        justify="center"
        style={smallScreen ? { padding: '0px' } : { padding: '17px 0 14px' }}
      >
        <Col style={{ color: markPriceColor }}>
          {markPrice > previousMarkPrice && (
            <ArrowUpOutlined style={{ marginRight: 5 }} />
          )}
          {markPrice < previousMarkPrice && (
            <ArrowDownOutlined style={{ marginRight: 5 }} />
          )}
          {formattedMarkPrice || '----'}
        </Col>
      </MarkPriceTitle>
    );
  },
  (prevProps, nextProps) => isEqual(prevProps, nextProps, ['markPrice']),
);
