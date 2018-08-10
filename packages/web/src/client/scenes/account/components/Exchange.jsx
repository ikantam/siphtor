import React from 'react';

class Exchange extends React.Component {
  render() {
    return (
      <div className="table-wrapper">
        <div className="right-transactions">
          <a className="" href="#">
            <img src="/public/images/left-page/double-arrows.svg" width="44px"/>
          </a>
          <img src="/public/images/left-page/line.svg" style={{margin: "0px 8px"}}/>
          <span className="right-transactions-text">EXCHANGE</span>
        </div>
      </div>
    );
  }
}

export default Exchange;
