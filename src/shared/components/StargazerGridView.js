import React from 'react';
import Immutable from 'immutable';

export default class StargazerGridView extends React.Component {

  getDefaultProps() {
    return {
      stargazers: Immutable.List()
    };
  }

  render() {
    if (!Immutable.List.isList(this.props.stargazers)) return 'No stargazers found';

    let items = this.props.stargazers
      .toArray()
      .map(stargazer => <StargazerItem key={stargazer.get('id')} stargazer={stargazer} />);

    return (
      <div>
        {items}
      </div>
    );
  }

}

class StargazerItem extends React.Component {

  render() {
    let { stargazer } = this.props;

    return (
      <article>
        <h1>
          <a href={stargazer.get('url')}>
            <img src={stargazer.get('avatar_url')} height="50" width="50" />
            {stargazer.get('login')}
          </a>
        </h1>
      </article>
    );
  }

}

