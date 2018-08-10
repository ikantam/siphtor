import React from 'react';
import WelcomeRoutes from 'Scenes/welcome/containers/WelcomeRoutes';

class Welcome extends React.Component {
  render() {
    return (
      <div className="container" style={{ width: '100%', maxWidth: '1200px' }}>
        <div className="row">
          <div className="page">
            <div className="welcome-page">
              <div className="big-logo">
                <img src="public/images/left-page/siphtor-wallet-logo-big.svg" width="250px" alt=""/>
              </div>
              <div className="welcome-text">
                <div className="welcome-name">
                  Welcome to Siphtor Wallet
                </div>
                <div className="welcome-description">
                  A blockchain wallet service anyone can use. <br/>
                  Start using your multicurrency <span className="black">siphtor</span>
                  <span className="orange">Wallet</span> now.
                </div>
              </div>
              <WelcomeRoutes/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Welcome;

