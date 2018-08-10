import React from 'react';
import Checkout from '../../common/checkout';
import WalletsDropdown from '../../common/walletsDropdown';
import { Route, Switch, Link } from 'react-router-dom';


class TabReceive extends React.Component {
    constructor(props) {
      super(props);
      this.state = { amount: 0 }
    }

    onChangeAmount = (e) => {
        let disabled;
        if (e.target.value > 0) {
          disabled = false;
        }
        this.setState({
          amount: e.target.value,
          disabled: disabled
        });
    }

    render() {

      return (
        <div className="exchange_wrapper_1CzEv ">
            <div className="exchange_rightIconSection_21AFM app_rightIconSection_1PVQz"><img src="/public/images/1XJ6_CM.svg?1522250547189" alt=""/>
                <p>Built-in exchange to easily swap your coins.</p>
            </div>
            <div className="exchange_wrapperForm_3vrCY app_wrapperLeftBlock_382sa">
                <div className="exchange_labelForm_2GcLn app_labelForm_19xr3">Select currency</div>
                <WalletsDropdown limit={1}/>
                <div className="exchange_labelForm_2GcLn app_labelForm_19xr3">Amount</div>
                <div className="input-amount_wrapper_2dduI">
                    <input onChange={this.onChangeAmount} type="number" className="exchange_input_1ZRDT app_input_37biS input-amount_input_1WAAp input_input_32E4i" value={this.state.amount} placeholder="0" disabled=""/>
                </div>
                <div className="exchange_footerBlock_2mGbc app_footerBlock_1E4DW">
                    <div className="exchange_stepInfo_2gJBw app_stepInfo_8AxXd"></div>
                     <Checkout
                        name={'SPH Tokens'}
                        amount={this.state.amount}
                        disabled={this.state.disabled}
                      />
                </div>
            </div>
        </div>
      );
  }
}

export default TabReceive;
