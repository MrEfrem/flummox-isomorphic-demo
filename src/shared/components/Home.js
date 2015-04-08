import React from 'react';
import {ErrorRedirect} from '../utils/errorClasses';

export default class Home extends React.Component {

  static routerWillRun({state, flux, router}) {
    throw new ErrorRedirect(router.makePath('stargazerGrid', {owner: 'zurb', repo: 'foundation'}));
  }

  render() {
    return <div>Home location</div>;
  }

}

