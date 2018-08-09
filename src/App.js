import React, { Component } from 'react';
import { Redirect, Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from "./components/Login";
import Error from "./components/Error";
import './App.css';

import Jobs from './components/Jobs';

const PrivateRoute = ({ component: Component, access_token, clearToken, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        access_token.length > 0 ? (
          <Component {...props} access_token={access_token} clearToken={clearToken} />
        ) : (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          )}
    />
  );
};


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      access_token: ''
    };
    this.getAccess = this.getAccess.bind(this);
    this.clearToken = this.clearToken.bind(this);
  }

  getAccess(access_token) {
    this.setState({
      access_token: access_token
    });
  }

  clearToken() {
    this.setState({
      access_token: ''
    });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <header className="App-header">
            <h1>GEOOP</h1>
          </header>
          <div className="App">
            <div className="container">
              <Switch>
                <Route path="/login" render={(props) => <Login {...props} getAccess={this.getAccess} />} />
                <PrivateRoute access_token={this.state.access_token} path='/' clearToken={this.clearToken} component={Jobs} />
                <Route component={Error} />
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
