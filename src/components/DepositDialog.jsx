import React from 'react';
import { Modal, Button } from 'antd';
import {
  useSelectedBaseCurrencyAccount,
  useMarket,
  useSelectedQuoteCurrencyAccount,
} from '../utils/markets';
import { useWallet } from '../utils/wallet';
import Link from './Link';

export default function DepositDialog({ onClose, baseOrQuote }) {
  const { market, baseCurrency, quoteCurrency } = useMarket();

  const { providerName, providerUrl } = useWallet();
  const baseCurrencyAccount = useSelectedBaseCurrencyAccount();
  const quoteCurrencyAccount = useSelectedQuoteCurrencyAccount();
  let coinMint;
  let account;
  let depositCoin;
  if (baseOrQuote === 'base') {
    coinMint = market?.baseMintAddress;
    account = baseCurrencyAccount;
    depositCoin = baseCurrency;
  } else if (baseOrQuote === 'quote') {
    coinMint = market?.quoteMintAddress;
    account = quoteCurrencyAccount;
    depositCoin = quoteCurrency;
  } else {
    account = null;
  }
  if (!coinMint) {
    return null;
  }
  return (
    <Modal
      title={depositCoin}
      visible={!!coinMint}
      onOk={onClose}
      onCancel={onClose}
      className="deposit-dialog"
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
          onClick={onClose}
        >
          OK
        </Button>,
      ]}
    >
      <div style={{ paddingTop: '20px' }}>
        <p style={{ color: 'white', textAlign: 'center' }}>Mint address:</p>
        <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
          {coinMint.toBase58()}
        </p>
        <div>
          <p style={{ color: 'white', textAlign: 'center', marginTop: '30px' }}>
            SPL Deposit address:
          </p>
          <p style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center' }}>
            {account ? (
              account.pubkey.toBase58()
            ) : (
              <>
                Visit{' '}
                <Link external to={providerUrl}>
                  {providerName}
                </Link>{' '}
                to create an account for this mint
              </>
            )}
          </p>
        </div>
      </div>
    </Modal>
  );
}
