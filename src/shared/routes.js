import React from 'react';
import { Route, DefaultRoute } from 'react-router';
import AppHandler from './components/AppHandler';
import StargazerGridHandler from './components/StargazerGridHandler';
import HomeHandler from './components/Home';

let Routes = (
  <Route name="app" path="/" handler={AppHandler}>
    <DefaultRoute name="home" handler={HomeHandler}/>
    <Route name="stargazerGrid" path="/stargazers/:owner/:repo" handler={StargazerGridHandler}/>
  </Route>
);

export default Routes;
