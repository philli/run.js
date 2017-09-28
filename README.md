# run.js

## 获取节点集合
### BNC(selector)
返回节点数组，如：
var elArr = BNC('#id');
var aArr = BNC('#id a');

## 加载完成
### BNC(callback)
BNC(function () {
  BNC.scope('list', function () {
    // TODO
  });
});

## 代码组织
### BNC.Scope(params)
var App = BNC.Scope({
  el: '#id',
  init: function () {
    // 初始化
  },
  events: {
    'click #wrap a': 'clickWrapA',
    'click .name': 'editName'
  },
  clickWrapA: function (e) {

  },
  editName: function (e) {

  }
});
// 加载完成
BNC(function () {
  // 实例化
  new App();
});

### BNC.scope
在BNC.Scope基础上进行了封装，直接实例化
BNC.scope('list', {
  el: '#id',
  init: function () {
    // 初始化
  },
  events: {
    'click #wrap a': 'clickWrapA',
    'click .name': 'editName'
  },
  clickWrapA: function (e) {

  },
  editName: function (e) {

  }
});
实例对象将自动保存于BNC.scope['list']。也可不带第一个参数，将不保存此实例数据，如:
BNC.scope({
  el: '#id',
  init: function () {
    // 初始化
  },
  events: {
    'click #wrap a': 'clickWrapA',
    'click .name': 'editName'
  },
  clickWrapA: function (e) {

  },
  editName: function (e) {

  }
});

## 路由
### BNC.router
#### 整体配置
BNC.router({
  before: function () {
    // 前置任务
  },
  routes: {
    'list': function () {
      console.log('list');
    },
    'default': function () {
      console.log('default');
    }
  },
  after: function () {
    // 后置任务
  }
});
#### 单条配置
BNC.router('update', function () {
  new BNC.Scope({
    el: '#id',
    init: function () {
      // 初始化
    },
    events: {
      'click #wrap a': 'clickWrapA',
      'click .name': 'editName'
    },
    clickWrapA: function (e) {
      
    },
    editName: function (e) {
      
    }
  });
});
或直接设置Scope对象：
BNC.router('update', {
  el: '#id',
  init: function () {
    // 初始化
  },
  events: {
    'click #wrap a': 'clickWrapA',
    'click .name': 'editName'
  },
  clickWrapA: function (e) {

  },
  editName: function (e) {

  }
});
