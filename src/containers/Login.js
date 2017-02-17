import React, { PropTypes as T } from 'react'
import AuthService from '../AuthService';

export class Login extends React.Component {
  static propTypes = {
    location: T.object,
  }

  render() {
    const auth = new AuthService();

    return (
      <div className="Login">
        <h2>Login</h2>
        <input type="button" onClick={auth.login.bind(this)} value="Login"/>
      </div>
    )
  }
}

export default Login;
