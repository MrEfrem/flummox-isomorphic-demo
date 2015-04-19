require('../shared/init');

import React from 'react';
import Router from 'react-router';
import FluxComponent from 'flummox/component';
import Flux from '../shared/Flux';
import routes from '../shared/routes';
import performRouteHandlerStaticMethod from '../shared/utils/performRouteHandlerStaticMethod';
import url from 'url';

// Initialize flux
const flux = new Flux();

const router = Router.create({
  routes: routes,
  location: Router.HistoryLocation
});

const routerCallback = async (Handler, state) => {
  const routeHandlerInfo = { state, flux, router };

  try {
    await performRouteHandlerStaticMethod(state.routes, 'routerWillRun', routeHandlerInfo);
  } catch( err ){
    if( err.name === 'ErrorRedirect' ) {
      router.transitionTo(err.message);
      return;
    } else {
      throw err;
    }
  }

  React.render(
      <FluxComponent flux={flux}>
        <Handler {...state} />
      </FluxComponent>,
      document.getElementById('app')
  );
};

// Render app
router.run(routerCallback);
