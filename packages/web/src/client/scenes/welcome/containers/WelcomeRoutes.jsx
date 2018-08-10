import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom'

import WelcomeButtons from 'Scenes/welcome/containers/WelcomeButtons';
import SignIn from 'Scenes/welcome/forms/SignIn';
import SignUp from 'Scenes/welcome/forms/SignUp';
import SignUpNew from 'Scenes/welcome/forms/SignUpNew';
import SignInNew from 'Scenes/welcome/forms/SignInNew';

const imaginaryUser = {
  email: '',
  username: '',
  imaginaryThingId: null,
};

class WelcomeRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/signin" component={SignInNew} />
        <Route exact path="/signup" component={SignUpNew} />
        <Route component={WelcomeButtons} />
      </Switch>
    );
  }
}

export default WelcomeRoutes;
