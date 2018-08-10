import React from 'react';
import 'react';

class Transactions extends React.Component {
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
        <div className="">
          <table className="tr-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>TX ID</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>27/03/2018</td>
                <td>0100000000dfjlksjflkdj09090390293jlkdjflsjsldfk</td>
                <td>2.00 SPH</td>
              </tr>
              <tr>
                <td>27/03/2018</td>
                <td>0100000000dfjlksjflkdj09090390293jlkdjflsjsldfk</td>
                <td>2.00 SPH</td>
              </tr>
              <tr>
                <td>27/03/2018</td>
                <td>0100000000dfjlksjflkdj09090390293jlkdjflsjsldfk</td>
                <td>2.00 SPH</td>
              </tr>
              <tr>
                <td>27/03/2018</td>
                <td>0100000000dfjlksjflkdj09090390293jlkdjflsjsldfk</td>
                <td>2.00 SPH</td>
              </tr>
              <tr>
                <td>27/03/2018</td>
                <td>0100000000dfjlksjflkdj09090390293jlkdjflsjsldfk</td>
                <td>2.00 SPH</td>
              </tr>
              <tr>
                <td>27/03/2018</td>
                <td>0100000000dfjlksjflkdj09090390293jlkdjflsjsldfk</td>
                <td>2.00 SPH</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Transactions;
