import React from 'react';
import { Route, Switch } from 'react-router-dom';

import ExchangeStep1 from '../exchange/exchangeStep1';
import ExchangeStep2 from '../exchange/exchangeStep2';
import ExchangeStep3 from '../exchange/exchangeStep3';

export default function TabExchange() {
  return (
    <div className="send_wrapper_3BEfO ">
      <Switch>
        <Route path="/wallets/exchange/step2" component={ExchangeStep2} />
        <Route path="/wallets/exchange/step3" component={ExchangeStep3} />
        <Route component={ExchangeStep1} />
      </Switch>
    </div>
  );
}
