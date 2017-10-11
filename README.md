# run.js

## 获取节点集合
### RUN(selector)
返回节点数组，如：  
var elArr = RUN('#id');  
var aArr = RUN('#id a');  
  
## 加载完成  
### RUN(callback)  
~~~ javascript
RUN(function () {  
  RUN.scope('list', function () {  
    // TODO  
  });  
});  
~~~
  
## 代码组织  
### RUN.Scope(params)  
~~~ javascript
var App = RUN.Scope({  
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
~~~
// 加载完成
~~~ javascript
RUN(function () {  
  // 实例化  
  new App();  
});  
~~~ javascript
  
### RUN.scope
在RUN.Scope基础上进行了封装，直接实例化  
~~~ javascript
RUN.scope('list', {  
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
~~~
实例对象将自动保存于RUN.scope['list']。也可不带第一个参数，将不保存此实例数据，如:  
~~~ javascript
RUN.scope({  
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
~~~
  
## 路由
### RUN.router
#### 整体配置  
~~~ javascript
RUN.router({  
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
~~~
#### 单条配置
~~~ javascript
RUN.router('update', function () {  
  new RUN.Scope({  
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
~~~
或直接设置Scope对象：  
~~~ javascript
RUN.router('update', {  
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
~~~
  
