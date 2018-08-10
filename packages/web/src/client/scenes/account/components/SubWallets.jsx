import React from 'react';
import { connect } from 'react-redux';
import { notify } from 'reapop';
import SecureLS from 'secure-ls';
import SubWalletForm from 'Scenes/account/forms/SubWalletForm';

class SubWallets extends React.Component {
  static contextTypes = {
    router: () => true
  }

  constructor(props) {
    super(props);
    this.state = {
      subWalletName: '',
      subwallets: [],
    }
  }

  loadSubwalletsData = () => {
    axios.get('/api/subwallets')
    .then((response) => {
      window.ls = new SecureLS();
      ls.set('subwallets', response.data.payload);
      this.renderSubwallets();
    });
  }

  renderSubwallets = () => {
    let a = ls.get('subwallets');
    a = a.map(function(item, i, array) {
      return { walletId: item.walletId, sph: item.sph, usd: item.usd }
    });
    let a1 = a;
    let a2 = this.state.subwallets;
    let result = a1.length === a2.length;
    if (!result) {
      this.setState({ subwallets: a });
    }
  }

  componentDidUpdate = () => {
    this.loadSubwalletsData();
  }

  componentWillMount = () => {
    this.loadSubwalletsData();
  }

  onAdd = (e, walletId) => {
    e.preventDefault();
    const { notify } = this.props;
    axios.post(`/api/subwallet/${this.state.subWalletName}`)
    .then((response) => {
      // notify({
      //   title: 'Success',
      //   message: 'Subwallet was successfully added',
      //   status: 'success'
      // });
      this.forceUpdate();
    })
    .catch((error) => {
      // notify({
      //   title: 'Error',
      //   status: 'error',
      //   message: e.response.data.message
      // });
    });
  }

  onDelete = (e, walletId) => {
    e.preventDefault();
    const { notify } = this.props;
    axios.delete(`/api/subwallet/${walletId}`)
    .then((response) => {
      // notify({
      //   title: 'Success',
      //   message: 'Subwallet was successfully deleted',
      //   status: 'success'
      // });
      this.forceUpdate();
    })
    .catch((error) => {
      console.log(error);
      // notify({
      //   title: 'Error',
      //   status: 'error',
      //   message: e.response.data.message
      // });
    });
  }

  onChange = (e) => {
    this.setState({ subWalletName: e.target.value });
  }

  onView = (e, item) => {
    const subwallet = ls.get('subwallet');
    if (subwallet) {
      if (subwallet.walletId === item.walletId) {
        ls.set('subwallet', undefined);
      }
    } else {
      ls.set('subwallet', item);
    }
    this.props.leftPage();
    this.forceUpdate();
  }

  render() {
    const subwallet = ls.get('subwallet');
    return (
      <div className="table-wrapper">
          <div className="right-transactions">
            <img src="/public/images/left-page/dollar.svg" width="44px"/>
            <img src="/public/images/left-page/line.svg" style={{margin: "0px 8px"}}/>
              <span className="right-transactions-text long">SUB WALLETS</span>
          </div>
          <div className="right-content sub-wallet two-element">
            <div className="right-align">
                {
                this.state.subwallets.length == 0 &&
                (
                    <p style={{paddingTop: "15px", textAlign:"center", verticalAlign:"middle"}}>
                      Subwallets not found
                    </p>
                  )
                }
                <div className="in-table" style={{display: this.state.subwallets.length == 0 ? 'none' : 'flex'}}>
                          <div className="cub email">
                            <div className="top">Identifer</div>
                            {
                              this.state.subwallets.map(function(item, index, array) {
                                return (
                                  <div key={`walletId:${index}`} className="bottom">{ item.walletId }</div>
                                );
                              })
                            }
                          </div>
                          <div className="cub many">
                            <div className="top">Balance</div>
                            {
                              this.state.subwallets.map(function(item, index, array) {
                                return (
                                  <div key={`balance:${index}`} className="bottom">USD {item.usd} / SPH {item.sph}</div>
                                );
                              })
                            }
                          </div>
                          <div className="cub buttons">
                            <div className="top">Action</div>
                            {
                              this.state.subwallets.map(function(item, index, array) {
                                let style = {};
                                if (subwallet && subwallet.walletId == item.walletId) {
                                  style = { color: "red" };
                                }

                                return (
                                  <div key={`buttons:${index}`} className="bottom">
                                    <div className="mid">
                                      <button style={style}
                                        onClick={(e) => { this.onView(e, item) } } className="btn min">VIEW</button>
                                      <button onClick={(e) => { this.onDelete(e, item.walletId)} } className="btn min">DELETE</button>
                                    </div>
                                  </div>
                                );
                              }, this)
                            }
                          </div>
                  </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <SubWalletForm forceUpdateParent={() => this.forceUpdate()}/>
          </div>
      </div>
    );
  }
}

export default connect(null, {notify})(SubWallets);
