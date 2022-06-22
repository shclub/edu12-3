import React, { Component } from 'react';
import LoginApp from './components/LoginApp'
import './App.css';
import './bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
         <LoginApp/>
      </div>
    );
  }
}
export default App;