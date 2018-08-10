import React from 'react';
import axios from 'axios';
import 'react';
import SecureLS from 'secure-ls';

class Transactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {a: []};
    window.ls = new SecureLS();
  }

  componentWillMount() {
    const userId = ls.get('user').userId;
    const p1 = axios.get(`/api/transaction/buy/${userId}`);
    const p2 = axios.get(`/api/transaction/transfer/${userId}`);

    const promises = [p1, p2];

    let a = [];
    Promise.all(promises).then((responses) => {
      responses.map((response) => {
        response.data.payload.forEach((el) => {
          console.log(el);
          let type = 'buy';
          if (el['$class'] === 'com.siphtor.network.Transfer') {
            type = 'transfer';
            if (el['sender'].includes(ls.get('user').userId)) {
              el.amount = -el.amount;
            }
          }
          a.push({
            date: new Date(el.timestamp).toLocaleString("en-US"),
            type: type,
            txId: el.transactionId.substring(0, 25),
            amount: `${el.amount} ${el.symbol.toUpperCase()}`
          });
        });
      });
      this.setState({a});
    });
  }

  render() {
    return (
      <div className="table-wrapper transactions-wrapper">
        <div className="right-transactions">
          <a className="" href="#">
            <img src="/public/images/left-page/shebang.svg" width="44px"/>
          </a>
          <img src="/public/images/left-page/line.svg" style={{margin: "0px 8px"}}/>
          <span className="right-transactions-text">TRANSACTIONS</span>
        </div>
        <div>
          <table className="tr-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>TX ID</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {
                this.state.a.map((item, index) => {
                  return (
                    <tr key={index.toString()}>
                      <td> {item.date}</td>
                      <td> {item.type}</td>
                      <td> {item.txId}</td>
                      <td> {item.amount}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
          { this.state.a.length == 0 &&
           (
              <p style={{paddingTop: "15px", textAlign:"center", verticalAlign:"middle"}}>
                Transactions not found
              </p>
            )
          }
        </div>
      </div>
    );
  }
}

export default Transactions;
