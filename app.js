var config = require('./config');

// get color and style in your node.js console
require('colors');
require('./middlewares/mongoose_log'); // 打印 mongodb 查询日志
require('./models'); // 加载models目录。先找package.json，没有则找index.js或index.node

// node.js自带path模块
const path = require('path') //
// Node静态资源加载器
, loader = require('loader') //
// Loader Koa是一个适配Koa的静态资源加载器，它基于静态文件的文件扩展名来对源文件进行编译
, loaderKoa = require('loader-koa') //
// https://github.com/koajs/static
, koastatic = require('koa-static')
// https://github.com/koajs/koa
, koa = require('koa') //
// https://github.com/koajs/session
, session = require('koa-session') //
// 第三方登录中间件
// https://github.com/rkusa/koa-passport
, passport = require('koa-passport')
// 第三方登录中间件 - github策略
// https://github.com/jaredhanson/passport-github
，GitHubStrategy = require('passport-github').Strategy //
,

, githubStrategyMiddleware = require('./middlewares/github_strategy') //
, webRouter = require('./web_router') //
, apiRouterV1 = require('./api_router_v1') //
, auth = require('./middlewares/auth') //
, errorPageMiddleware = require('./middlewares/error_page') //
, proxyMiddleware = require('./middlewares/proxy') //
;

const app = new koa();
// 模板引擎
// 请求日志记录
// hook 渲染时间
// hook 静态资源
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
// ? 中间件 lodash
// 中间件 CSRF
// 中间件 connect-busboy
// 路由 'apt/v1' cors
// 路由 '/'
// 中间件 hook 错误处理
// ### 需要console.log(module.parent)一下
