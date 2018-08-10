import React from 'react';
import {connect} from 'react-redux';
import {notify} from 'reapop';

class TabSubWallets extends React.Component {
  _onClick = () => {
    this.modal.openModal();
  }

  componentWillMount() {
    axios.get('/api/get-accounts').then((response) => {
      ls.set('accounts', response.data.data);
      this.forceUpdate();
    });
  }

  _onDelete = (name) => {
    axios.delete(`/api/delete-subwallet/${name}`).then((response) => {
      ls.set('accounts', response.data.data);
      this.forceUpdate();
    });
  }

  _onView = (name) => {
    axios.put(`/api/switch-subwallet/${name}`).then((response) => {
      ls.set('data', response.data.data);
      this.forceUpdate();
    });
  }

  render() {
    let list = [];
    let email = ls.get('data').email
    let key = 'subwallets_' + email
    key = 'accounts';
    let ordered = ls.get(key);

    console.log(ordered)

    ordered = ordered.map((x) =>{
      return {name: x.name, balance: `USD ${x.usd} / SPH ${x.sph}`}
    });

    for (let i = 0; i < ordered.length; ++i) {
      let tr = ordered[i];

      let viewButton;
      var isOk = ls.get('data').email != tr.name;
        viewButton = (<button disabled={!isOk} onClick={() => this._onView(tr.name)} type="button" className={(isOk ? "btn btn-sm btn-outline-primary" : "btn btn-sm btn-outline-secondary") }>View</button>);

      let deleteButton;
      isOk = ls.get('data').email != tr.name && ls.get('data').parent != tr.name;
        deleteButton = (<button disabled={!isOk} onClick={() => this._onDelete(tr.name)} type="button" className={isOk ? "btn btn-sm btn-outline-danger" : "btn btn-sm btn-outline-secondary"}>Delete</button>);
      list.push(
        <div key={i} className="transaction-item_txBlock_3dS-Y">
          <div className="transaction-item_txLine_1iH92">
              <div style={{flexBasis: '30%', 'color': 'black', 'textAlign': 'center'}} className="">{tr.name}</div>
              <div style={{flexBasis: '30%', 'color': 'black', 'textAlign': 'center'}} className="">{ tr.balance } </div>
              <div style={{flexBasis: '30%', 'color': 'black', 'alignItems': 'center', 'justifyContent': 'center'}} className="transaction-item_txInfo_1T9aI"> { viewButton}&nbsp;{ deleteButton }</div>
          </div>
        </div>)
    }
    return (
      <div className="history_wrapper_lngRF app_wrapperBlock_21Xa4">
        { list.length > 0 && (
        <div style={{'fontSize': '15px', 'fontWeight': 'bold', 'textAlign': 'center'}} className="transaction-item_txBlock_3dS-Y">
          <div className="transaction-item_txLine_1iH92">
              <div style={{flexBasis: 30 +'%', 'color': 'black'}} className="">Identifier</div>
              <div style={{flexBasis: 30 +'%', 'color': 'black'}} className="">Balance</div>
              <div style={{flexBasis: 30 +'%', 'color': 'black'}} className="">Action</div>
          </div>
        </div>)}
        {list}
        { list.length == 0 && (
          <div className="transaction-item_txBlock_3dS-Y asd">
            <div style={{textAlign: 'center'}} className="">
                <div style={{textAlign: 'center'}} className=""><p>{ 'Sub-Wallets were not found' }</p></div>
            </div>
          </div>)}
      </div>
    );
  }
}

export default TabSubWallets;
