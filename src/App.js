import React, {Component} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './views/Login/Login';
import Home from './views/Home/Home';

class App extends Component {
  render () {
    return (
      <div className="wrapper">
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/login" element={ <Login />} />
              <Route path="/" element={ <Home />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;