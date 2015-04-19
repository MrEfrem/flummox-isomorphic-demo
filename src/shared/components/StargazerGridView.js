import React from 'react';
import Immutable from 'immutable';

export default class StargazerGridView extends React.Component {

  render() {
    if (!Immutable.List.isList(this.props.stargazers)){
      return <div>No stargazers found</div>;
    }

    let items = this.props.stargazers
      .toArray()
      .map(stargazer => <StargazerItem key={stargazer.get('id')} stargazer={stargazer} />);

    return <div>{items}</div>;
  }

}

StargazerGridView.defaultProps = {
  stargazers: Immutable.List()
};

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

