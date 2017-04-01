'use strict'
const config = require('config-lite');
const app = require('koa')();
const logger = require('koa-logger');
const bodyparser = require('koa-bodyparser');
const staticCache = require('koa-static-cache');
const errorhandler = require('koa-errorhandler');
const session = require('koa-generic-session');
const MongoStore = require('koa-generic-session-mongo');
const flash = require('koa-flash');
const gzip = require('koa-gzip');
const scheme = require('koa-scheme');
const router = require('koa-frouter');
const routerCache = require('koa-router-cache');
const render = require('co-ejs');

const renderConf = require(config.renderConf);
require('merge-descriptors')(renderConf.locals || {}, require('./lib/core'), false);

app.keys = [renderConf.locals.$app.name];

app.use(errorhandler());
app.use(bodyparser());
app.use(logger());
app.use(staticCache(config.staticCacheConf));
app.use(session({
  store : new MongoStore(config.mongodb)
}));
app.use(flash());
app.use(scheme(config.schemeConf));
app.use(routerCache(app, config.routerCacheConf));
app.use(gzip());
app.use(render(app, renderConf));
app.use(router(app, config.routerConf));

if(module.parent){
  module.exports = app.callback();
}else{
  app.listen(config.port, () => {
    console.log('Server listening on:', config.port);
  });
}
