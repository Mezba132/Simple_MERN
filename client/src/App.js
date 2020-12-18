import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import User from './user/pages/User';
import Places from './places/pages/NewPlaces';
import MainNavigation from './shared/components/Navigation/MainNavigation';

const App = () => {
  return (
    <div className="App">
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            <Route path='/' exact={true}>
              <User />
            </Route>
            <Route path='/places/new' exact={true}>
              <Places />
            </Route>
            <Redirect to='/' />
          </Switch>
        </main>
      </Router>
    </div>
  );
}

export default App;
