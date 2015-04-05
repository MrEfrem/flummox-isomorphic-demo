import React from 'react';
import { RouteHandler, Link } from 'react-router';
import DocumentTitle from 'react-document-title';
import FluxComponent from 'flummox/component';

export default class AppHandler extends React.Component {

  render() {
    let linkFound;
    if( !this.props.params.owner ){
      linkFound = <Link to="stargazerGrid" params={{owner: 'zurb', repo: 'foundation'}}>Example</Link>;
    }
    return (
      <div>
        <header>
          <h1>Isomorphic Flummox App</h1>
          <p>
            This is an simple app demonstrating how to use Flummox and
            react-router to create isomorphic React applications.
          </p>
          <p>
            It's a work in progress. Right now, it shows the first 50 stargazers
            for a given GitHub repo. Pretty bare-bones, as you can see, but it
            gets the basic idea across.
          </p>
          <p>
            Check out the page source to see that HTML is being rendered on the
            server.
          </p>
        </header>
        {linkFound}
        <div>
            <DocumentTitle title='Isomorphic Flummox App'>
              <FluxComponent {...this.props} key={this.props.pathname}>
                <RouteHandler />
              </FluxComponent>
            </DocumentTitle>
        </div>
      </div>
    );
  }

}
