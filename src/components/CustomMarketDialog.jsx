import React, { useEffect, useState } from 'react';
import { Col, Input, Modal, Row, Typography, Button } from 'antd';
import { notify } from '../utils/notifications';
import { isValidPublicKey } from '../utils/utils';
import { PublicKey } from '@solana/web3.js';
import { Market, MARKETS, TOKEN_MINTS } from '@project-serum/serum';
import { useAccountInfo, useConnection } from '../utils/connection';
import { LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;

export default function CustomMarketDialog({
  visible,
  onAddCustomMarket,
  onClose,
}) {
  const connection = useConnection();

  const [marketId, setMarketId] = useState('');

  const [marketLabel, setMarketLabel] = useState('');
  const [baseLabel, setBaseLabel] = useState('');
  const [quoteLabel, setQuoteLabel] = useState('');

  const [market, setMarket] = useState(null);
  const [loadingMarket, setLoadingMarket] = useState(false);

  const wellFormedMarketId = isValidPublicKey(marketId);

  const [marketAccountInfo] = useAccountInfo(
    wellFormedMarketId ? new PublicKey(marketId) : null,
  );
  const programId = marketAccountInfo
    ? marketAccountInfo.owner.toBase58()
    : MARKETS.find(({ deprecated }) => !deprecated).programId.toBase58();

  useEffect(() => {
    if (!wellFormedMarketId || !programId) {
      resetLabels();
      return;
    }
    setLoadingMarket(true);
    Market.load(
      connection,
      new PublicKey(marketId),
      {},
      new PublicKey(programId),
    )
      .then((market) => {
        setMarket(market);
      })
      .catch(() => {
        resetLabels();
        setMarket(null);
      })
      .finally(() => setLoadingMarket(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connection, marketId, programId]);

  const resetLabels = () => {
    setMarketLabel(null);
    setBaseLabel(null);
    setQuoteLabel(null);
  };

  const knownMarket = MARKETS.find(
    (m) =>
      m.address.toBase58() === marketId && m.programId.toBase58() === programId,
  );
  const knownProgram = MARKETS.find(
    (m) => m.programId.toBase58() === programId,
  );
  const knownBaseCurrency =
    market?.baseMintAddress &&
    TOKEN_MINTS.find((token) => token.address.equals(market.baseMintAddress))
      ?.name;

  const knownQuoteCurrency =
    market?.quoteMintAddress &&
    TOKEN_MINTS.find((token) => token.address.equals(market.quoteMintAddress))
      ?.name;

  const canSubmit =
    !loadingMarket &&
    !!market &&
    market.publicKey.toBase58() === marketId &&
    marketId &&
    programId &&
    marketLabel &&
    (knownBaseCurrency || baseLabel) &&
    (knownQuoteCurrency || quoteLabel) &&
    wellFormedMarketId;

  const onSubmit = () => {
    if (!canSubmit) {
      notify({
        message: 'Please fill in all fields with valid values',
        type: 'error',
      });
      return;
    }

    let params = {
      address: marketId,
      programId,
      name: marketLabel,
    };
    if (!knownBaseCurrency) {
      params.baseLabel = baseLabel;
    }
    if (!knownQuoteCurrency) {
      params.quoteLabel = quoteLabel;
    }
    onAddCustomMarket(params);
    onDoClose();
  };

  const onDoClose = () => {
    resetLabels();
    setMarket(null);
    setMarketId(null);
    onClose();
  };

  return (
    <Modal
      title={'Add custom market'}
      visible={visible}
      onOk={onSubmit}
      okText={'Add'}
      onCancel={onDoClose}
      className="deposit-dialog" //只是为了使用样式
      okButtonProps={{ disabled: !canSubmit }}
      width="500px"
      closeIcon={
        <svg className="icon modal-icon-close" aria-hidden="true">
          <use xlinkHref="#iconicon_close"></use>
        </svg>
      }
      footer={[
        <div className="disconnect-btn-box">
          <Button key="back" className="disconnect-btn" onClick={onClose}>
            Cancel
          </Button>
        </div>,
        <Button
          key="submit"
          className="switch-wallet-btn"
          type="primary"
          onClick={onSubmit}
        >
          OK
        </Button>,
      ]}
    >
      <div className="add-coustom-market">
        {wellFormedMarketId ? (
          <>
            {!market && !loadingMarket && (
              <Row style={{ marginBottom: 8 }}>
                <Text type="danger">Not a valid market</Text>
              </Row>
            )}
            {market && knownMarket && (
              <Row style={{ marginBottom: 8 }}>
                <Text type="warning">Market known: {knownMarket.name}</Text>
              </Row>
            )}
            {market && !knownProgram && (
              <Row style={{ marginBottom: 8 }}>
                <Text type="danger">Warning: unknown DEX program</Text>
              </Row>
            )}
            {market && knownProgram && knownProgram.deprecated && (
              <Row style={{ marginBottom: 8 }}>
                <Text type="warning">Warning: deprecated DEX program</Text>
              </Row>
            )}
          </>
        ) : (
          <>
            {marketId && !wellFormedMarketId && (
              <Row style={{ marginBottom: 8 }}>
                <Text type="danger">Invalid market ID</Text>
              </Row>
            )}
          </>
        )}
        <Row style={{ marginBottom: 8 }}>
          <Col span={24} style={{ height: '42px' }}>
            <div className="add-coustom-marke-item">
              <Input
                placeholder="Market Id"
                className="gradient-input-content"
                value={marketId}
                onChange={(e) => setMarketId(e.target.value)}
                suffix={loadingMarket ? <LoadingOutlined /> : null}
              />
            </div>
          </Col>
        </Row>

        <Row style={{ marginBottom: 8, marginTop: 20 }}>
          <div
            className={
              market
                ? 'add-coustom-marke-item'
                : 'add-coustom-marke-item-disabled'
            }
          >
            <Col span={24}>
              <Input
                placeholder="Market Label"
                className="gradient-input-content"
                disabled={!market}
                value={marketLabel}
                onChange={(e) => setMarketLabel(e.target.value)}
              />
            </Col>
          </div>
        </Row>
        <Row gutter={[8]} style={{ marginBottom: 8, marginTop: 20 }}>
          <Col span={12}>
            <div
              className={
                !market || knownBaseCurrency
                  ? 'add-coustom-marke-item-disabled'
                  : 'add-coustom-marke-item'
              }
            >
              <Input
                placeholder="Base label"
                className="gradient-input-content"
                disabled={!market || knownBaseCurrency}
                value={knownBaseCurrency || baseLabel}
                onChange={(e) => setBaseLabel(e.target.value)}
              />
            </div>
            {market && !knownBaseCurrency && (
              <div style={{ marginTop: 8 }}>
                <Text type="warning">Warning: unknown token</Text>
              </div>
            )}
          </Col>
          <Col span={12}>
            <div
              className={
                !market || knownBaseCurrency
                  ? 'add-coustom-marke-item-disabled'
                  : 'add-coustom-marke-item'
              }
            >
              <Input
                placeholder="Quote label"
                className="gradient-input-content"
                disabled={!market || knownQuoteCurrency}
                value={knownQuoteCurrency || quoteLabel}
                onChange={(e) => setQuoteLabel(e.target.value)}
              />
            </div>
            {market && !knownQuoteCurrency && (
              <div style={{ marginTop: 8 }}>
                <Text type="warning">Warning: unknown token</Text>
              </div>
            )}
          </Col>
        </Row>
      </div>
    </Modal>
  );
}
