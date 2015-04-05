require('../shared/init');

// Only in development
import sourceMapSupport from 'source-map-support';
sourceMapSupport.install();

import koa from 'koa';
const app = koa();
export default app;

// Serve static assets from `public` directory
import serve from 'koa-static';
app.use(serve('public'));

// Add ejs rendering
import views from 'koa-views';
import path from 'path';
app.use(views(path.join(process.cwd(), 'views'), {
    cache: true,
    default: 'ejs'
}));

import appView from './appView';
appView(app);

// Start listening
const port = process.env.PORT || 3000;
app.listen(port);
console.log(`App started listening on port ${port}`);