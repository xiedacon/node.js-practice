'use strict'
const Topic = require('../models').Topic;
const redis = require('config-lite').redis;
const cache = require('co-cache')({
  host: redis.host,
  port: redis.port,
  expire: 10000
});

module.exports = {
  addTopic(data) {
    return Topic.create(data);
  },
  getTopicById(id) {
    return Topic.findByIdAndUpdate(id, {$inc: {pv: 1}}).exec();
  },
  getTopicsByTab : cache((tab, p) => {
    let query = {};
    if(tab){
      query.tab = tab;
    }
    return Topic.find(query).skip((p-1)*10).sort('updated_at').limit(10).exec();
  }, {
    key: function(tab, p) {
      tab = tab || 'all';
      return `${this.name}:${tab}:${p}`;
    }
  }),
  getTopicsByName(name) {
    return Topic.find({'user.name': name}).sort('update_at').exec();
  },
  incCommentById(id) {
    return Topic.findByIdAndUpdate(id, {$inc: {comment: 1}}).exec();
  },
  getNoReplyTopics : cache(function getNoReplyTopics() {
    return Topic.find({comment: 0}).sort('updated_at').limit(5).select('title').exec();
  }),
  getTopicsCount : cache((tab) => {
    let query = {};
    if(tab){
      query.tab = tab;
    }
    return Topic.count(query).exec();
  },{
    key: function(tab){
      tab = tab || 'all';
      return `${this.name}:${tab}`;
    }
  })
};
