// Render React app
import React from 'react';
import Router from 'react-router';
import FluxComponent from 'flummox/component';
import Flux from '../shared/Flux';
import routes from '../shared/routes';
import performRouteHandlerStaticMethod from '../shared/utils/performRouteHandlerStaticMethod';
import DocumentTitle from 'react-document-title';


export default function(app) {
  app.use(function *() {
    const router = Router.create({
      routes: routes,
      location: this.url,
      onError: error => {
        throw error;
      }
    });

    const self = this;
    const flux = new Flux();
    flux.addListener('error', err => {
      /*self.status = err.status || 500;
      self.body = err.message;*/
      app.emit('error', err, this);
    });

    const { Handler, state } = yield new Promise((resolve, reject) => {
      router.run((_Handler, _state) =>
        resolve({ Handler: _Handler, state: _state })
      );
    });

    const routeHandlerInfo = { state, flux };

    yield performRouteHandlerStaticMethod(state.routes, 'routerWillRun', routeHandlerInfo);

    if( 500 != self.status ) {
      const appString = React.renderToString(
          <FluxComponent flux={flux}>
            <Handler {...state} />
          </FluxComponent>
      );

      /**
       * Cool library that lets us extract a title from the React component tree
       * so we can render it on the server, which is very important for SEO
       */
      let title = DocumentTitle.rewind();

      /**
       * Pass the initial render of the app to a EJS template
       */
      yield this.render('app', {
        title,
        appString,
        env: process.env
      });
    }
  });
}
