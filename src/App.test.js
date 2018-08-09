import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import expect from 'expect';
import Login from "./components/Login";
import Jobs from "./components/Jobs";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

describe('Login',()=>{
  it('should exist',()=>{
    expect(Login).toBeTruthy();
  });
});


describe('Jobs',()=>{
  it('should exist',()=>{
    expect(Jobs).toBeTruthy();
  });
});