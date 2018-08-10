import React from 'react';
import WalletsDropdown from '../../common/walletsDropdown';

class TabReceive extends React.Component {
    constructor(props) {
      super(props);
      this.state = { index: 0 }
    }

    onChange = (i) => {
      this.state.index = i;
      this.forceUpdate();
    }

    render() {
      let url, balance;
      if (this.state.index == '0') {
        url = ls.get('data').wallet_sph_url
        balance = `${parseFloat(ls.get('data')['balance:sph'])} SPH`
      } else {
        url = ls.get('data').wallet_usd_url
        balance = `${parseFloat(ls.get('data')['balance:usd'])} USD`
      }
      return (
        <div>
          <div className="main_wrapperWallets_UaBHp">
              <h4>Your wallet</h4>
              <WalletsDropdown onChangeRef={this.onChange}/>
              <h4>Information</h4>
          </div>
          <div className="main_wrapperBlocks_Vgf_d">
              <img style={{height: '154px', width: '154px !important', border: '1px solid #455a64'}} src={url}/>
              <div className="main_wallerWrapper_KxoGB">
                  <div className=""><span className="main_titleBlock_2NsMq">Wallet balance {ls.get('data').email}:</span>
                      <div className="main_contentBlock_AJyFJ">{balance}</div>
                  </div>
              </div>
          </div>
        </div>
      );
  }
}

export default TabReceive;
