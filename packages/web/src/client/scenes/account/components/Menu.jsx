import React from 'react';
import { Link } from 'react-router-dom';

class Menu extends React.Component {
  render() {
    return (
      <div className="table-wrapper menu">
        <div className="right-transactions">
          <Link className="" to="/account/transactions">
            <img src="/public/images/left-page/shebang.svg" width="44px"/>
            <img src="/public/images/left-page/line.svg" style={{margin: "0px 8px"}}/>
            <span className="right-transactions-text">TRANSACTIONS</span>
          </Link>
        </div>

        <div className="right-transactions">
          <Link className="" to="/account/receive">
            <img src="/public/images/left-page/arrow-down-orange.svg" width="44px"/>
            <img src="/public/images/left-page/line.svg" style={{margin: "0px 8px"}}/>
            <span className="right-transactions-text">RECEIVE</span>
          </Link>
        </div>

        <div className="right-transactions">
          <Link className="" to="/account/buy">
            <img src="/public/images/left-page/logo.svg" width="44px"/>
            <img src="/public/images/left-page/line.svg" style={{margin: "0px 8px"}}/>
            <span className="right-transactions-text">BUY</span>
          </Link>
        </div>

        <div className="right-transactions">
          <Link className="" to="/account/send">
            <img src="/public/images/left-page/arrow-left.svg" width="44px"/>
            <img src="/public/images/left-page/line.svg" style={{margin: "0px 8px"}}/>
            <span className="right-transactions-text">SEND</span>
          </Link>
        </div>

        <div className="right-transactions">
          <Link className="" to="/account/exchange">
            <img src="/public/images/left-page/double-arrows.svg" width="44px"/>
            <img src="/public/images/left-page/line.svg" style={{margin: "0px 8px"}}/>
            <span className="right-transactions-text">EXCHANGE</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Menu;
