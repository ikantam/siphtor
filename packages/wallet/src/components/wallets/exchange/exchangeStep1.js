import React from 'react';
import WalletsDropdown from '../../common/walletsDropdown';
import { Link } from 'react-router-dom';

export default class ExchangeStep1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = { amount: 11.13 };
        localStorage.setItem('amountE', '11.13');
    }

    onChangeAmount = (e) => {
        this.setState({amount: e.target.value});
        localStorage.setItem('amountE', e.target.value);
    }

    render() {
        return (
    <div className="exchange_wrapper_1CzEv ">
        <div className="exchange_rightIconSection_21AFM app_rightIconSection_1PVQz"><img src="/public/images/3Y0CWAx.svg?1522250547189" alt=""/>
            <p>Built-in exchange to easily swap your coins.</p>
        </div>
        <div className="exchange_wrapperForm_3vrCY app_wrapperLeftBlock_382sa">
            <div className="exchange_labelForm_2GcLn app_labelForm_19xr3">From</div>
            <WalletsDropdown/>
            <div className="exchange_labelForm_2GcLn app_labelForm_19xr3">To</div>
            <WalletsDropdown key="2" index={1}/>
            <div className="exchange_labelForm_2GcLn app_labelForm_19xr3">Amount</div>
            <div className="input-amount_wrapper_2dduI">
                <input onChange={this.onChangeAmount} type="number" className="exchange_input_1ZRDT app_input_37biS input-amount_input_1WAAp input_input_32E4i" value={this.state.amount} placeholder="0" disabled=""/>
            </div>
            <div className="exchange_separator_2Ud01"></div>
            <div className="exchange_footerBlock_2mGbc app_footerBlock_1E4DW">
                <div className="exchange_stepInfo_2gJBw app_stepInfo_8AxXd">Step 1 of 3</div>
                <Link to="/wallets/exchange/step2">
                <button className="button_button_3sUWn button_blue_2oFPD button_big_2vavs" disabled="">Next</button>              </Link>
            </div>
        </div>
    </div>
        );
    }
}
