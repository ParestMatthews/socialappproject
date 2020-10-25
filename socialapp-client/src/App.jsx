import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

//compoonent
import Navbar from './components/Navbar';

//pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
