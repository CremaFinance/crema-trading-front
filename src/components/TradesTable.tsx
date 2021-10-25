import { Col, Row } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { useMarket, useBonfidaTrades } from '../utils/markets';
import { getDecimalCount } from '../utils/utils';
import FloatingElement from './layout/FloatingElement';
import { BonfidaTrade } from '../utils/types';
import { timeFormat } from '../utils/utils';

const Title = styled.div`
  padding:0 12px 12px px;
  line-height: 1.5715;
  color: rgba(255, 255, 255, 1);
`;
const SizeTitle = styled(Row)`
  padding: 20px 0 14px;
  color: #434a59;
`;

export default function PublicTrades({ smallScreen }) {
  const { baseCurrency, quoteCurrency, market } = useMarket();
  const [trades, loaded] = useBonfidaTrades();

  return (
    <FloatingElement
      style={
        smallScreen
          ? { flex: 1 }
          : {
              marginTop: '10px',
              // minHeight: '320px',
              // maxHeight: 'calc(100vh - 736px)',
              // minHeight: '320px',
              maxHeight: 'calc(100% - 683px)',
              minHeight: '314px',

              overflow: 'hidden'
            }
      }
    >
      <Title>Recent Market Trades</Title>
      <SizeTitle>
        <Col span={8}>Price ({quoteCurrency}) </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          Size ({baseCurrency})
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          Time
        </Col>
      </SizeTitle>
      {!!trades && loaded && (
        <div
          style={{
            marginRight: '-20px',
            paddingRight: '5px',
            overflowY: 'scroll',
            background: 'rgba(255,255,255,0.03)',
            minHeight: '200px',
            maxHeight: 'calc(100vh - 881px)'
            // maxHeight: smallScreen
            //   ? '126px'
            //   : 'calc(100vh - 881px)',
          }}
        >
          {trades.map((trade: BonfidaTrade, i: number) => (
            <Row key={i} style={{ marginBottom: 4 }}>
              <Col
                span={8}
                style={{
                  color: trade.side === 'buy' ? '#1FB690' : '#C24E4F',
                }}
              >
                {market?.tickSize && !isNaN(trade.price)
                  ? Number(trade.price).toFixed(
                      getDecimalCount(market.tickSize),
                    )
                  : trade.price}
              </Col>
              <Col span={8} style={{ textAlign: 'right' }}>
                {market?.minOrderSize && !isNaN(trade.size)
                  ? Number(trade.size).toFixed(
                      getDecimalCount(market.minOrderSize),
                    )
                  : trade.size}
              </Col>
              <Col span={8} style={{ textAlign: 'right', color: '#434a59' }}>
                {/* {trade.time && new Date(trade.time).toLocaleTimeString()} */}
                {timeFormat(trade.time, 'HMS')}
              </Col>
            </Row>
          ))}
        </div>
      )}
    </FloatingElement>
  );
}
