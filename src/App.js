import React, {Component} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from './views/Login/Login';
import Home from './views/Home/Home';
import ImagePoint from './views/ImagePoint/ImagePoint';

class App extends Component {
  render () {
    return (
      <div className="wrapper">
        <BrowserRouter>
          <div className="container">
            <Routes>
              <Route path="/login" element={ <Login />} />
              <Route path="/" element={ <Home />} />
              <Route path="/image/point" element={ <ImagePoint />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;