import React from 'react';
import { Route, Switch } from 'react-router-dom';

import SendStep1 from '../send/sendStep1';
import SendStep2 from '../send/sendStep2';
import SendStep3 from '../send/sendStep3';

export default function TabSend() {
  return (
    <div className="send_wrapper_3BEfO ">
      <Switch>
        <Route path="/wallets/send/step2" component={SendStep2} />
        <Route path="/wallets/send/step3" component={SendStep3} />
        <Route component={SendStep1} />
      </Switch>
    </div>
  );
}
