import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import User from './user/pages/User';
import Places from './places/pages/NewPlaces';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact={true}>
            <User />
          </Route>
          <Route path='/places/new' exact={true}>
            <Places />
          </Route>
          <Redirect to='/' />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
