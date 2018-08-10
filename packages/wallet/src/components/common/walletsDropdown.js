import React from 'react';;
import PropTypes from 'prop-types';

class WalletsDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: [
            { amount: parseFloat(ls.get('data')['balance:sph']), id: 'SPH', title: 'SPH wallet', iconClass: 'sph fa fa-circle-o'},
            { amount: parseFloat(ls.get('data')['balance:usd']), id: 'USD', title: 'USD wallet', iconClass: 'sph fa fa-usd'},
            ]};
        this.state.open = false;
        this.state.index = props.index || 0;
    }

    toggleMenu = () => {
        this.setState((prevState) => {
            return {open: !prevState.open};
        });
    }

    onItemClick = (index) => {
        this.props.onChangeRef(index);
        this.setState({ index: index, open: false });
    }

    render() {
        let currenciesList = [];
        this.state.currencies.forEach((currency, index) => {
            currenciesList.push(
              <div key={index} onClick={() => this.onItemClick(index) } className="input-wallets_currencyBlock_1bmBO inputs_currencyBlock_3m2bh">
                  <div className={` ${currency.iconClass}`}></div>
                  <div className="input-wallets_currencyInfo_3LqR5 inputs_currencyInfo_3vulL"><span>{currency.title}</span>
                      <div>{`${currency.amount} ${currency.id}`}</div>
                  </div>
              </div>
            );
        });
        if (this.props.limit) {
          currenciesList = currenciesList.slice(0, this.props.limit);
        }
        const renderedList = (<div className="input-wallets_wrapperList_2r5oL" >
          { currenciesList }
        </div>);

        const item = this.state.currencies[this.state.index];
        return (
<div className="input-wallets_wrapper_2xA5b inputs_wrapper_24u4z" tabIndex="0" role="button">
    <div onClick={this.toggleMenu} className="input-wallets_inputWrapper__vpP- inputs_inputWrapper_1HL5k">
        <div className="input-wallets_currencyBlock_1bmBO inputs_currencyBlock_3m2bh input-wallets_selectedItem_3EKcl">
            <div className={` ${item.iconClass}`}></div>
            <div className="input-wallets_currencyInfo_3LqR5 inputs_currencyInfo_3vulL"><span>{item.title}</span>
                <div>{`${item.amount} ${item.id}`}</div>
            </div>
        </div>
        <div  className="input-wallets_iconArrow_1duBe inputs_iconArrow_ClpVp">
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                <path transform="rotate(-45 1.792 -.672)" d="M0 10h-1v1h1v-1zm10-1H0v2h10V9zm-9 1V0h-2v10h2z"></path>
            </svg>
        </div>
    </div>
    { this.state.open && renderedList }
</div>
    );
    }
}

WalletsDropdown.propTypes = {
    index: PropTypes.number
};

export  default WalletsDropdown;
