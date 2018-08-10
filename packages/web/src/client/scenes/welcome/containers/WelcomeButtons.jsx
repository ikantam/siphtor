import React from 'react';
import { Link } from 'react-router-dom';

class WelcomeButtons extends React.Component {
  render() {
    return (
      <div className="btn-welcome">
        <Link to="/signup"><button className="btn left">Create Wallet</button></Link>
        <Link to="/signin"><button className="btn">Sign in</button></Link>
      </div>
    );
  }
}

export default WelcomeButtons;

