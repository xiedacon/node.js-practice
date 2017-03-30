var config = require('./config');

// node.js自带path模块
const path = require('path');
// https://github.com/koajs/koa
const koa = require('koa');
// 静态资源加载
// https://github.com/koajs/static
const koastatic = require('koa-static');
// session中间件
// https://github.com/koajs/session
const session = require('koa-session');
// redis存取中间件
// https://github.com/NodeRedis/node_redis
const redis = require('redis');
// 第三方登录中间件
// https://github.com/rkusa/koa-passport
const passport = require('koa-passport');
// 第三方登录中间件 - github策略
// https://github.com/jaredhanson/passport-github
const GitHubStrategy = require('passport-github').Strategy;
const _ = require('lodash');
// csrf攻击防护中间件
// https://github.com/koajs/csrf
const csrf = require('koa-csrf');
// 压缩中间件
// https://github.com/koajs/compress
const compress = require('koa-compress');
// body解析中间件
// https://github.com/koajs/bodyparser
const bodyParser = require('koa-bodyparser');
// 上传文件转data
// https://github.com/mscdex/connect-busboy
const busboy = require('connect-busboy'); //可重写
// 错误处理中间件
// https://github.com/nswbmw/koa-errorhandler
const errorhandler = require('koa-errorhandler');
// cors跨域中间件
// https://github.com/koajs/cors
const cors = require('kcors');
// 设置响应头中间件
// https://github.com/venables/koa-helmet
const helmet = require('helmet');
// 数字转字节大小中间件
// https://github.com/visionmedia/bytes.js
const bytes = require('bytes');
// ejs模板引擎
// https://github.com/koajs/ejs
const render = require('koa-ejs');
// 挂载中间件，可将app或middlewares挂载到指定目录下
// https://github.com/koajs/mount
const mount = require('koa-mount');
// less中间件
// https://github.com/chosecz/koa-less
const less = require('koa-less');
const router = require('./router.js');
const githubStrategyMiddleware = require('./middlewares/github_strategy');
const webRouter = require('./web_router');
const apiRouterV1 = require('./api_router_v1');
const auth = require('./middlewares/auth');
const errorPageMiddleware = require('./middlewares/error_page');
const requestLog = require('./middlewares/request_log');
const renderMiddleware = require('./middlewares/render');
const logger = require('./common/logger');
const proxyMiddleware = require('./middlewares/proxy');

if (!config.debug && config.oneapm_key) {
  require('oneapm');
}

// get color and style in your node.js console
// https://github.com/Marak/colors.js
require('colors');
require('./middlewares/mongoose_log'); // 打印 mongodb 查询日志
require('./models'); // 加载models目录。先找package.json，没有则找index.js或index.node

// 获得静态文件的绝对目录
const staticDir = path.join(__dirname, 'public');
const assets = {};

const app = new koa();

// 请求日志记录
app.use(requestLog);
if (config.debug) {
  // 渲染时间
  app.use(renderMiddleware.render);
  // less
  app.use(less(__dirname));
}

// 静态资源
app.use(mount('/public', koastatic(staticDir)));
app.use(mount('/agent', proxyMiddleware.proxy));

// 通用中间件
app.use(require('response-time')());
app.use(helmet.frameguard('sameorigin'));
// 请求体解析
app.use(bodyParser({
  jsonLimit : '1mb',
  formLimit : '1mb'
}));
// HTTP method支持
app.use(require('koa-methodoverride'));
// 中间件 cookie解析
app.use(require('cookie-parser')(config.session_secret));
// 中间件 压缩响应数据
app.use(compress());
// 中间件 session，包含redis存储
app.use(session({
  
}))
// 中间件 oauth
// hook something with CSRF
// 中间件 错误页面
// 中间件 lodash
// 中间件 CSRF
// 中间件 connect-busboy
// 路由 'apt/v1' cors
// 路由 '/'
// 中间件 hook 错误处理

// 模板引擎
render(app, {
  root :  path.join(__dirname, 'views'),
  layout : 'layout.html',
  viewExt : 'html'
});

app.use(ejs);
app.use(router.routes());
app.use(router.allowedMethods());

// hook 一些启动提示信息

module.exports = app;
