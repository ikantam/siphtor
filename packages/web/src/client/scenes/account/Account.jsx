import React from 'react';
import Header from 'Scenes/account/containers/Header';
import LeftPage from 'Scenes/account/containers/LeftPage';
import RightPage from 'Scenes/account/containers/RightPage';
import SecureLS from 'secure-ls';
import axios from 'axios';

class Account extends React.Component {
  componentDidMount() {
    this.forceUpdate();
  }

  componentDidUpdate() {
    axios.get('/api/session')
    .then((response) => {
      window.ls = new SecureLS();
      ls.set('user', response.data.user);
    });
  }

  setLeftPageRef = (el) => {
    this.leftPage = el;
  }

  updateLeftPage = () => {
    this.leftPage.forceUpdate();
  }

  render() {
    return (
      <div className="container" style={{width: "100%", maxWidth: "1200px"}}>
        <div className="row">
          <div className="col">
            <Header/>
            <section style={{top: "-5px", position: "relative"}}>
              <div className="row">
                <div className="col-sm-6 left gap-between-pages">
                  <LeftPage ref={this.setLeftPageRef}/>
                </div>
                <div className="col-sm-6 right" style={{padding: "0 25px", marginBottom: "30px"}}>
                  <RightPage leftPage={this.updateLeftPage}/>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default Account;
