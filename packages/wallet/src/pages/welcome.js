import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const Welcome = () => {
  if (ls.get('auth?')) {
    return <Redirect to="/wallets" />;
  }
  return (
    <div className="app_pageWrapper_2GcaG">
      <div className="container">
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2">
            <div className="welcome_container_HEDw8">
              <h2>Welcome to Siphtor Wallet</h2>
              <div className="welcome_columnsBlock_1iK2o">
                <div>
                  <p>Interact with lead blockchains easily. Start using your multi-currency Siphtor Wallet right now.</p>
                  <Link to="/signup" aria-current="false">
                    <button className="welcome_button_2cnhJ button_button_3sUWn button_blue_2oFPD">Create Wallet</button>
                  </Link>
                </div>
                <div>
                  <div className="welcome_orSeparator_3LbLS">Or</div>
                  <p>You can enter your already created wallet.</p>
                  <Link to="/signin" aria-current="false">
                    <button className="welcome_button_2cnhJ button_button_3sUWn button_blue_2oFPD">Sign In</button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
