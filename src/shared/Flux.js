import { Flummox } from 'flummox';
import StargazerActions from './actions/StargazerActions';
import StargazerStore from './stores/StargazerStore';

export default class Flux extends Flummox {
  constructor() {
    super();

    const stargazerActions = this.createActions('stargazers', StargazerActions);
    this.createStore('stargazers', StargazerStore, { stargazerActions });
  }
}
