import { Button } from 'antd';
import React from 'react';
import {
  useTokenAccounts,
  getSelectedTokenAccountForMint,
} from '../../utils/markets';
import DataTable from '../layout/DataTable';
import { useSendConnection } from '../../utils/connection';
import { useWallet } from '../../utils/wallet';
import { settleFunds } from '../../utils/send';
import { notify } from '../../utils/notifications';
import { useReferrer } from '../../utils/referrer';

export default function BalancesTable({
  balances,
  showMarket,
  hideWalletBalance,
  onSettleSuccess,
}) {
  const [accounts] = useTokenAccounts();
  const connection = useSendConnection();
  const { wallet } = useWallet();
  const { usdcRef, usdtRef } = useReferrer();

  async function onSettleFunds(market, openOrders) {
    try {
      // console.log(market,'market##')
      // console.log(openOrders,'openOrders##')
      // console.log(connection,'connection##')
      // console.log(wallet,'wallet##')
      // console.log(getSelectedTokenAccountForMint(
      //   accounts,
      //   market?.baseMintAddress,
      // ))
      // console.log(getSelectedTokenAccountForMint(
      //   accounts,
      //   market?.quoteMintAddress,
      // ))
      // console.log(usdcRef,'usdcRef##')
      // console.log(usdtRef,'usdtRef##')
      await settleFunds({
        market,
        openOrders,
        connection,
        wallet,
        baseCurrencyAccount: getSelectedTokenAccountForMint(
          accounts,
          market?.baseMintAddress,
        ),
        quoteCurrencyAccount: getSelectedTokenAccountForMint(
          accounts,
          market?.quoteMintAddress,
        ),
        usdcRef,
        usdtRef,
      });
    } catch (e) {
      notify({
        message: 'Error settling funds',
        description: e.message,
        type: 'error',
      });
      return;
    }
    onSettleSuccess && onSettleSuccess();
  }

  const columns = [
    showMarket
      ? {
          title: 'Market',
          dataIndex: 'marketName',
          key: 'marketName',
        }
      : null,
    {
      title: 'Coin',
      dataIndex: 'coin',
      key: 'coin',
    },
    hideWalletBalance
      ? null
      : {
          title: 'Wallet Balance',
          dataIndex: 'wallet',
          key: 'wallet',
        },
    {
      title: 'Orders',
      dataIndex: 'orders',
      key: 'orders',
    },
    {
      title: 'Unsettled',
      dataIndex: 'unsettled',
      key: 'unsettled',
    },
    {
      key: 'action',
      render: ({ market, openOrders, marketName }) => (
        <div
          style={{ textAlign: 'right', display: 'flex', justifyContent: 'end' }}
        >
          <div className="disconnect-btn-box" style={{ width: '75px' }}>
            <Button
              ghost
              style={{ marginRight: 12 }}
              onClick={() => onSettleFunds(market, openOrders)}
            >
              Settle {marketName}
            </Button>
          </div>
        </div>
      ),
    },
  ].filter((x) => x);
  return (
    <DataTable
      emptyLabel="No balances"
      dataSource={balances}
      columns={columns}
      pagination={false}
    />
  );
}
