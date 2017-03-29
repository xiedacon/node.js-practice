var config = require('./config');

// node.js自带path模块
const path = require('path') //
// https://github.com/koajs/koa
, koa = require('koa') //
// 静态资源加载
, koastatic = require('koa-static') //
// 路由中间件
// https://github.com/alexmingoia/koa-router
, router = require('koa-router') //
// session中间件
// https://github.com/koajs/session
, session = require('koa-session') //
// redis存取中间件
// https://github.com/NodeRedis/node_redis
, redis = require('redis') //
// 第三方登录中间件
// https://github.com/rkusa/koa-passport
, passport = require('koa-passport')
// 第三方登录中间件 - github策略
// https://github.com/jaredhanson/passport-github
，GitHubStrategy = require('passport-github').Strategy //
, _ = require('lodash') //
// csrf攻击防护中间件
// https://github.com/koajs/csrf
, csrf = require('koa-csrf') //
// 压缩中间件
// https://github.com/koajs/compress
, compress = require('koa-compress') //
// body解析中间件
// https://github.com/koajs/bodyparser
, bodyParser = require('koa-bodyparser') //
// 上传文件转data
// https://github.com/mscdex/connect-busboy
, busboy = require('connect-busboy') //可重写
// 错误处理中间件
// https://github.com/nswbmw/koa-errorhandler
, errorhandler = require('koa-errorhandler') //
// cors跨域中间件
// https://github.com/koajs/cors
, cors = require('kcors') //
// 设置响应头中间件
// https://github.com/venables/koa-helmet
, helmet = require('helmet') //
// 数字转字节大小中间件
// https://github.com/visionmedia/bytes.js
, bytes = require('bytes') //
// ejs模板引擎
// https://github.com/koajs/ejs
, ejs = require('koa-ejs')
, githubStrategyMiddleware = require('./middlewares/github_strategy') //
, webRouter = require('./web_router') //
, apiRouterV1 = require('./api_router_v1') //
, auth = require('./middlewares/auth') //
, errorPageMiddleware = require('./middlewares/error_page') //
, proxyMiddleware = require('./middlewares/proxy') //
, requestLog = require('./middlewares/request_log') //
, renderMiddleware = require('./middlewares/render') //
, logger = require('./common/logger') //
;

if (!config.debug && config.oneapm_key) {
  require('oneapm');
}

// get color and style in your node.js console
// https://github.com/Marak/colors.js
require('colors');
require('./middlewares/mongoose_log'); // 打印 mongodb 查询日志
require('./models'); // 加载models目录。先找package.json，没有则找index.js或index.node

// 获得静态文件的绝对目录
const staticDir = path.join(__dirname, 'public') //
, assets = {} //
, app = new koa() //
;

// 请求日志记录
app.use(requestLog);
// hook 渲染时间
if (config.debug) {
  app.use(renderMiddleware.render);
}
// hook 静态资源
if (config.debug) {
  app.use(koastatic.less(__dirname));
}
// 路由 '/public'
// 路由 '/agent'
// 中间件 'response-time'
// 中间件 helmet.frameguard('sameorigin') 这真没看懂
// 中间件 请求体解析
// 中间件 url编码
// 中间件 require('method-override')()
// 中间件 cookie解析
// 中间件 压缩响应数据 由于compression模块采用的包装res，所以随便放在哪
// 中间件 session，包含redis存储
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
ejs(app, {
  root :  path.join(__dirname, 'views'),
  layout : 'layout.html',
  viewExt : 'html'
});
app.use((ctx) => {
  ctx.render(ctx.path, ?);
});

// hook 一些启动提示信息

module.exports = app;
