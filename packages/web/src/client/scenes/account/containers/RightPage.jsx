import React from 'react';
import RightNavigation from 'Scenes/account/containers/RightNavigation';
import RightPageRoutes from 'Scenes/account/containers/RightPageRoutes';

class RightPage extends React.Component {
  render() {
    return (
      <div id="right-page">
        <RightNavigation/>
        <RightPageRoutes leftPage={this.props.leftPage}/>

        <div style={{textAlign: "center", display: "none"}} className="bottom-line right">
            <a src="#">Siphtor Wallet Terms & Conditions</a>
            <span style={{color: "black"}}>|</span>
            <a src="#">About</a>
            <span style={{color: "black"}}>|</span>
            <a src="#">Privacy Policy</a>
            <span style={{color: "black"}}>|</span>
            <a src="#">Get in Touch</a>
        </div>
      </div>
    );
  }
}

export default RightPage;
