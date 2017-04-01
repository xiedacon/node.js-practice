const path = require('path');
const cache = require('koa-router-cache');
const MemoryCache = cache.MemoryCache;

module.exports = {
  port : process.env.PORT || 3000,
  mongodb : {
    url : 'mongodb://192.168.199.182:27017'
  },
  redis : {
    host : '192.168.199.182',
    port : '6379'
  },
  schemeConf : require('./default.scheme.js'),
  staticCacheConf : path.join(__dirname, '../theme/publices'),
  renderConf : path.join(__dirname, '../theme/config'),
  routerConf : {
    root : 'routes',
    wildcard : '_'
  },
  routerCacheConf : {
    'GET /' : {
      key : 'cache:index',
      expire : 10 * 1000,
      get : MemoryCache.get,
      set : MemoryCache.set,
      destroy : MemoryCache.destroy,
      passthrough : function* passthrough(_cache){
        // 游客
        if(!this.session || !this.session.user){
          if(_cache == null){
            return {
              shouldCache : true,
              shouldPass : true
            }
          }
          this.type = 'text/html; charset=utf-8';
          this.set('content-encoding', 'gzip');
          this.body = _cache;
          return {
            shouldCache : true,
            shouldPass : false
          };
        }

        // 已登陆用户
        return {
          shouldCache : false,
          shouldPass : true
        };
      }
    }
  }
};
