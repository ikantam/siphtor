import React from 'react';

class Sidebar extends React.Component {
  render() {
    const usd = parseFloat(ls.get('data')['balance:usd']);
    const sph = parseFloat(ls.get('data')['balance:sph']);
    const coeff = 0.7;
    const total = usd + sph * coeff;

    return (
      <div className="dashboard-wallets_wrapper_38uII app_wrapperBlock_21Xa4">
        <div className="dashboard-wallets_totalBalanceTitle_1s11X">Total Balance:</div>
        <div className="dashboard-wallets_totalBalance_30lIk">{total}
          <div className="fiat-toggle_fiatType_1miED">USD</div>
        </div>
        <div className="dashboard-wallets_walletList_3KuFA">

          <div className="wallet-item_walletBlock_2-EKl">
            <div className="sph fa fa-circle-o wallet-item_iconCurrency_1KhE_" />
            <div className="wallet-item_walletInfo_b3Myj">
              <div className="wallet-item_titleWallet_3uQZ6">SPH wallet</div>
            </div>
            <div className="wallet-item_balanceBlock_1ImlN"><span className="wallet-item_ctyptoBalance_1D5rk">{parseFloat(ls.get('data')['balance:sph'])} SPH</span>
              <div className="wallet-item_fiatBalance_18alw">{ parseFloat(ls.get('data')['balance:sph']) * 0.7} USD</div>
            </div>
          </div>
          <div className="wallet-item_walletBlock_2-EKl">
            <div className="sph fa fa-usd wallet-item_iconCurrency_1KhE_" />
            <div className="wallet-item_walletInfo_b3Myj">
              <div className="wallet-item_titleWallet_3uQZ6">USD wallet</div>
            </div>
            <div className="wallet-item_balanceBlock_1ImlN"><span className="wallet-item_ctyptoBalance_1D5rk">{parseFloat(ls.get('data')['balance:usd'])} USD</span>
              <div className="wallet-item_fiatBalance_18alw">{parseFloat(ls.get('data')['balance:usd'])} USD</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Sidebar;

