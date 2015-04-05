import React from 'react';
import { State } from 'react-router';
import Immutable from 'immutable';
import DocumentTitle from 'react-document-title';
import FluxComponent from 'flummox/component';

import StargazerGridView from './StargazerGridView';

export default class StargazerGrid extends React.Component {

  static async routerWillRun({state, flux}) {
    let { owner, repo } = state.params;
    let stargazerActions = flux.getActions('stargazers');

    return await stargazerActions.getStargazersByRepo(owner, repo);
  }

  render() {
    let { owner, repo } = this.props.params;

    return (
      <DocumentTitle title='Isomorphic Flummox App - Stargazers'>
        <FluxComponent connectToStores={{
          stargazers: store => ({
            stargazers: store.getStargazersByRepo(owner, repo)
          })
        }}>
          <StargazerGridView />
        </FluxComponent>
      </DocumentTitle>
    );
  }

}
