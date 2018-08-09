import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';

import { getToken } from '../api/api'
import ErrorMessage from './ErrorMessage';
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      ErrorShow: false
    }
    this.login = this.login.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  login(e) {
    e.preventDefault();

    const login = e.target.elements.login.value;
    const password = e.target.elements.password.value;

    getToken(login, password).then((res) => {
      var { access_token } = res;
      this.props.getAccess(access_token);
      this.setState({ redirectToReferrer: true })
    }).catch((e) => {
      console.log('error');
      this.setState({ ErrorShow: true })
    });

  }

  handleCancel() {
    this.setState({ ErrorShow: false });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return (
        <Redirect to={from} />
      )
    }

    return (

      <div className="row justify-content-md-left">
        <div className="col-12 col-md-4">
          <form onSubmit={this.login}>
            <div className="form-group">
              <label>Login</label>
              <input type="text" className="form-control" name="login" placeholder="Enter Username" required="required"/>
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="password" placeholder="Password" required="required"/>
            </div>
            <button value="Submit">Log in</button>
          </form>
          <ErrorMessage show={this.state.ErrorShow} onHide={this.handleCancel} />
        </div>
      </div>
    )
  }
}

export default Login