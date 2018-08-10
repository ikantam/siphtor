import React from 'react';

class TabHistory extends React.Component {
  from(value, currency) {
    return (
      <div className="transaction-item_txAmount_3xxwd transaction-item_isPending_FKbi9">
        <div className="transaction-item_tooltip_2Gqk5 tooltip_wrapper_2pDFm tooltip_oneLine_3SnMh"> - {value} {currency}</div>
      </div>);
  }

  to(value, currency) {
    return (
      <div className="transaction-item_txAmount_3xxwd transaction-item_isIncoming_3qcqj">
        <div className="transaction-item_tooltip_2Gqk5 tooltip_wrapper_2pDFm tooltip_oneLine_3SnMh">+ {value} {currency}</div>
      </div>
    );
  }

  render() {
    const to1 = ls.get('data').to.map((x) => { x.to = true; return x; });
    const from1 = ls.get('data').from.map((x) => { x.to = false; return x; });

    const result = to1.concat(from1);
    console.log(result);
    let ordered = result.sort((a, b) => new Date(parseInt(b.date)) - new Date(parseInt(a.date)));

    ordered = ordered.map((x) => {
      if (x.currency) {
        x.currency = x.currency.toUpperCase();
      }
      return x;
    });
    ordered = ordered.slice(0, 20);

    const list = [];

    for (let i = 0; i < ordered.length; ++i) {
      const tr = ordered[i];
      list.push(<div key={i} className="transaction-item_txBlock_3dS-Y">
        <div className="transaction-item_txLine_1iH92">
          <div style={{ flexBasis: `${30}%` }} className="transaction-item_txDate_3feFa">{ new Date(parseInt(tr.date)).toLocaleString('en-US')}</div>
          <div className="transaction-item_txInfo_1T9aI">{ tr.hash }
            <a target="_blank" href="https://etherscan.io/tx/0x4f855c700e0aa9f8ea4fd7e87d4c9e1eed0108f9cd9af8d134721d9e7f27359c"><img src="/public/images/3GkmLOd.svg?1522250547189" alt="" /></a>
          </div>
          { tr.to ? this.to(tr.value, tr.currency) : this.from(tr.value, tr.currency) }
        </div>
                </div>);
    }

    return (
      <div className="history_wrapper_lngRF app_wrapperBlock_21Xa4">
        {list}
        { list.length == 0 && (
          <div className="transaction-item_txBlock_3dS-Y">
            <div style={{ textAlign: 'center' }} className="">
              <div style={{ textAlign: 'center', paddingTop: '10px' }} className=""><p>No transactions were found</p></div>
            </div>
          </div>)}
      </div>
    );
  }
}

export default TabHistory;
