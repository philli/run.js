/**
 * 【run.js】 v1.0.0
 * @author philli <zixulee@163.com>
 */

(function (window, undefined) {

    var document = window.document;
    var body = document.body;
    var lt = window.location;
    var _readyList = [];
    var _bindReady;
    var _getReady = function () {
        return document.readyState === 'complete';
    };
    var _getHash = function () {
        return lt.hash.substr(1).replace(/\?.*/g, '');
    };
    var _arr = [];
    var _indexOf = _arr.indexOf;
    var _obj = {};
    var _hasOwn = _obj.hasOwnProperty;
    var _fn = function () {
    };
    var _tmplLabel = {start: '{%', end: '%}'};
    var _extend = function () {
        var src, copyIsArray, copy, name, options, clone,
            self = arguments.callee,
            primary = arguments[0] || {},
            i = 1,
            len = arguments.length,
            deep = false;
        if (typeof primary === 'boolean') {
            deep = primary;
            primary = arguments[1] || {};
            i = 2;
        }
        if (typeof primary !== 'object' && !_isFunction(primary)) {
            primary = {};
        }
        if (len === i) {
            primary = this;
            --i;
        }
        for (; i < len; i++) {
            if ((options = arguments[i]) != null) {
                for (name in options) {
                    src = primary[name];
                    copy = options[name];
                    if (primary === copy) {
                        continue;
                    }
                    if (deep && copy && (_isPlainObject(copy) || (copyIsArray = _isArray(copy)))) {
                        if (copyIsArray) {
                            copyIsArray = false;
                            clone = src && _isArray(src) ? src : [];

                        } else {
                            clone = src && _isPlainObject(src) ? src : {};
                        }
                        primary[name] = self(deep, clone, copy);
                    } else if (copy !== undefined) {
                        primary[name] = copy;
                    }
                }
            }
        }
        return primary;
    };
    var _arrEach = function (arr, callback) {
        var len = arr.length;
        if (len && _isFunction(callback)) {
            for (var i = 0; i < len; i++) {
                var item = arr[i];
                if (callback.call(item, item, i, arr) === false) break;
            }
        }
    };
    var _objEach = function (obj, callback) {
        for (var k in obj) {
            var item = obj[k];
            if (callback.call(item, item, k, obj) === false) break;
        }
    };
    var _each = function (params, callback) {
        var each = _isArray(params) ? _arrEach : _isObject(params) ? _objEach : _fn;
        return each(params, callback);
    };
    var _trim = (function () {
        var trim = String.prototype.trim;
        return trim && !trim.call('\uFEFF\xA0') ? function (str) {
            return str == null ? '' : trim.call(str).replace(/^(%20)+|(%20)+$/g, '');
        } : function (str) {
            return str == null ? '' : (str + '').replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '').replace(/^(%20)+|(%20)+$/g, '');
        };
    })();
    var _inArray = function (item, arr, i) {
        if (arr) {
            if (_indexOf) return _indexOf.call(arr, item, i);
            var len = arr.length;
            i = i ? i < 0 ? Math.max(0, len + i) : i : 0;
            for (; i < len; i++) {
                if (i in arr && arr[i] === item) {
                    return i;
                }
            }
        }
        return -1;
    };
    var _isArray = Array.isArray || function (arr) {
            return typeof arr === 'object' && (arr instanceof Array);
        };
    var _isFunction = function (fn) {
        return typeof fn === 'function';
    };
    var _isString = function (str) {
        return typeof str === 'string';
    };
    var _isObject = function (obj) {
        return obj && typeof obj === 'object';
    };
    var _isPlainObject = function (obj) {
        try {
            // obj.nodeType报了错：【Error: Permission denied to access property "nodeType"】,暂放如try内
            if (!obj || typeof obj !== 'object' || obj.nodeType || obj === window) return false;
            if (obj.constructor && !_hasOwn.call(obj, 'constructor') && !_hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')) return false;
        } catch (e) {
            return false;
        }
        for (var key in obj) {
        }
        return key === undefined || _hasOwn.call(obj, key);
    };
    var _isEmptyObject = function (obj) {
        var name;
        for (name in obj) {
            return false;
        }
        return true;
    };
    var _getElement = function (el) {
        var els = [];
        if (_isString(el)) {
            var elArr = el.replace(/\s+/g, ' ').split(' ');
            var firstElStr = elArr.shift();
            if (firstElStr && _inArray(firstElStr, ['window', 'document', 'body']) > -1) {
                firstElStr = elArr.shift();
            }
            var self;
            (self = function (el, subElStr) {
                var subEls = el.querySelectorAll(subElStr);
                var nextElStr = elArr.length && elArr.shift();
                _arrEach(subEls, function (subEl, i) {
                    nextElStr ? self(subEl, nextElStr) : _inArray(subEl, els) < 0 && els.push(subEl);
                });
            })(document, firstElStr);
        }
        return els;
    };
    var _addEvent = function (el, type, fn) {
        if (el && type && fn) {
            if (_isObject(el)) {
                if (el.addEventListener) {
                    el.addEventListener(type, fn, false);
                } else if (el.attachEvent) {
                    el.attachEvent('on' + type, fn);
                } else {
                    el['on' + type] = fn;
                }
            } else if (_isString(el)) {
                var elArr = el.replace(/\s+/g, ' ').split(' ');
                var len = elArr.length;
                if (len) {
                    var firstElStr = elArr.shift();
                    if (firstElStr) {
                        var firstEls = document.querySelectorAll(firstElStr);
                        if (firstEls) {
                            if (len === 1) {
                                _arrEach(firstEls, function (el, i) {
                                    _addEvent(el, type, fn);
                                });
                            } else if (len > 1) {
                                _arrEach(firstEls, function (el, i) {
                                    _addEvent(el, type, function (event) {
                                        event.target || (event.target = event.srcElement);
                                        var subElStr;
                                        var subEls;
                                        var self;
                                        var elemArr = elArr.concat();
                                        (self = function (el) {
                                            if (elemArr.length) {
                                                subElStr = elemArr.shift();
                                                subEls = (el === body || el === window ? document : el).querySelectorAll(subElStr);
                                                _arrEach(subEls, function (subel, i) {
                                                    self(subel);
                                                });
                                            } else {
                                                if (el === event.target) {
                                                    fn.call(el, event) === false && event.preventDefault();
                                                    event.stopPropagation();
                                                }
                                            }
                                        })(el);
                                    });
                                });
                            }
                        }
                    }
                }
            }
        }
    };
    var _ready = function (fn) {
        _isFunction(fn) && _readyList.push(fn);
        var doReady = function () {
            while (_readyList.length) {
                _readyList.shift()();
            }
            if (_bindReady) {
                if (document.addEventListener) {
                    document.removeEventListener('DOMContentLoaded', ready, false);
                    window.removeEventListener('load', ready, false);
                } else {
                    document.detachEvent('onreadystatechange', ready);
                    window.detachEvent('onload', ready);
                }
            }
        };
        if (_getReady()) {
            doReady();
        } else {
            if (!_bindReady) {
                var ready = function () {
                    _getReady() && doReady();
                };
                if (document.addEventListener) {
                    document.addEventListener('DOMContentLoaded', ready, false);
                    window.addEventListener('load', ready, false);
                } else {
                    document.attachEvent('onreadystatechange', ready);
                    window.attachEvent('onload', ready);
                }
                _bindReady = 1;
            }
        }
    };

    var RUN = function (param) {
        if (_isFunction(param)) {
            _ready(param);
        } else if (_isString(param)) {
            return _getElement(param);
        }
    };

    _extend(RUN, {
        version: '1.0.0',
        ready: _ready,
        extend: _extend,
        each: _each,
        trim: _trim,
        inArray: _inArray,
        isArray: _isArray,
        isFunction: _isFunction,
        isString: _isString,
        isPlainObject: _isPlainObject,
        addEvent: _addEvent
    });

    RUN.Scope = function (object) {
        var self = RUN.Scope;
        var pt = self.prototype;
        self.events = {};
        if (!(this instanceof self)) return new self(object);
        !pt._init && (pt._init = function () {
            var that = this;
            !that.el && (this.el = 'body');
            var el = that.el;
            var events = that.events;

            if (events && _isPlainObject(events)) {
                for (var key in events) {
                    var handler = events[key];
                    (function (key, handler) {
                        if (!handler) return;
                        setTimeout(function () {
                            var evtArr = _trim(key = key.replace(/\s+/g, ' ')).split(' ');
                            // 取出事件名
                            var evts = evtArr.shift();
                            if (!evts || !evtArr.length) return;
                            // 事件节点
                            _inArray('window', evtArr) < 0 && _inArray('document', evtArr) < 0 && _inArray('body', evtArr) < 0 && evtArr.unshift('body', el);
                            var selector = evtArr.join(' ');
                            var handlerName = '';
                            typeof handler === 'string' && (handlerName = handler);
                            _each(evts.split(','), function (evt, i) {
                                if (handlerName) {
                                    var fullEventName = evt + '|' + selector.replace(/\s+/g, '~') + '|' + handlerName;
                                    if (!self.events[fullEventName]) {
                                        var isSameOne;
                                        for (var existOne in self.events) {
                                            var existArr = existOne.split('|');
                                            if (existArr.length < 3) continue;
                                            var existEvt = existArr[0];
                                            var existSelector = existArr[1].replace(/~/, ' ');
                                            var existHandlerName = existArr[2];
                                            if (evt === existEvt && selector === existSelector && handlerName === existHandlerName) {
                                                isSameOne = true;
                                                break;
                                            }
                                        }
                                        if (!isSameOne) {
                                            _each(evt.split(','), function (e, i) {
                                                _addEvent(selector, e, function (event) {
                                                    handlerName ? (_isFunction(that[handler]) && that[handler].apply(that, arguments)) : (handler && handler.apply(that, arguments));
                                                });
                                            });
                                            self.events[fullEventName] = true;
                                        }
                                    }
                                } else {
                                    _each(evt.split(','), function (e, i) {
                                        _addEvent(selector, e, function (event) {
                                            handlerName ? (_isFunction(that[handler]) && that[handler].apply(that, arguments)) : (handler && handler.apply(that, arguments));
                                        });
                                    });
                                }
                            });
                        });
                    })(key, handler);
                }
            }

            var init = this.init;
            init && init.apply(this, arguments);

        });
        var F = function () {
            var self = arguments.callee;
            if (!(this instanceof self)) return new self(arguments);
            this._init.apply(this, arguments);
        };
        _extend(F.prototype, pt, object);
        return F;
    };

    RUN.scope = function (name, object) {
        var inst;
        if (name) {
            if (_isPlainObject(name)) {
                object = name;
                name = '';
            }
        }
        if (object && _isPlainObject(object)) {
            if (name) {
                inst = RUN.scope[name] = RUN.Scope[name] ? new RUN.Scope[name](name) : new (RUN.Scope[name] = new RUN.Scope(object))(name);
            } else {
                inst = new (new RUN.Scope(object))();
            }
        }
        return inst;
    };

    // 路由
    (function () {
        var router = {
            routes: {}
        };
        var hasBind;
        // 整体路由-包含添加路由/前后置任务/启动路由
        RUN.router = function (route, handler, notRun) {
            // @param route {object|string} 必传
            // @param route.routes {object} 路由参数
            // @param route.before {function} 前置任务
            // @param route.after {function} 后置任务
            // @param route.xxx {function} 挂载于route下的路由处理器, 其名称对应route.routes中指定的函数名称(如示例中的'list')
            // 如：{
            //      routes: {'/': 'list', 'list': 'list', 'default': function(){}},
            //      before: function(){},
            //      after: function(){}
            //      list: function(){}
            // }
            // @param handler {function|object} 非必传 当route类型为string时，handler作为路由任务
            // @param notRun {boolean} 非必传 是否不初始化运行
            // 添加
            if (route) {
                if (_isObject(route)) {
                    notRun = handler;
                    _extend(router, route || null);
                } else if (_isString(route) && (_isFunction(handler) || _isPlainObject(handler))) {
                    router.routes[route] = handler;
                }
                // 绑定
                if (!hasBind) {
                    window.addEventListener('hashchange', loadRoute, false);
                }
                // 初始化触发
                !notRun && loadRoute();
            }
        };
        // 加载路由
        function loadRoute() {
            var hash = _getHash();
            var routes = router.routes;
            var before = _isFunction(router.before) && router.before;
            var after = _isFunction(router.after) && router.after;
            var hasRoute;
            // 路由
            for (var route in routes) {
                // 匹配
                var routeStr = '/^' + route.replace(/^\/|\/$/g, '').replace(/\//g, '\\\/') + '$/';
                var routeReg = eval(routeStr.replace(/:[\w-]+/g, '[\\\w-]+'));
                if (hash === route.replace(/^\/|\/$/g, '') || (routeReg && routeReg.test(hash))) {
                    if (runRoute(routes[route], hash)) {
                        hasRoute = 1;
                    }
                    break;
                }
            }
            // 未匹配->检测默认
            if (!hasRoute) {
                runRoute(routes['default'], hash);
            }
            // 执行路由
            function runRoute (r, hash) {
                var isStr = 'string' === typeof r;
                var isFunc = _isFunction(r);
                var isObj = _isPlainObject(r);
                if (isStr || isFunc || isObj) {
                    // 前置任务
                    before && before(hash);
                    // 路由任务
                    isStr ? _isFunction(router[r]) && router[r](hash) : isFunc ? r(hash) : isObj && RUN.scope(hash, r);
                    // 后置任务
                    after && after(hash);
                    // 路由正常
                    return 1;
                }
            }
        }
    })();

    // 模板
    RUN.tmpl = (function () {
        var cache = {};
        return function tmpl(str, data) {
            var fn = !/\W/.test(str) ? cache[str] || (cache[str] = tmpl(document.getElementById(str).innerHTML)) : new Function('o', "var p=[];with(o||{}){p.push('" + str.replace(/[\r\t\n]/g, " ").split(_tmplLabel.start).join("\t").replace(eval("/((^|" + _tmplLabel.end + ")[^\\t]*)'/g"), "$1\r").replace(eval("/\\t=(.*?)" + _tmplLabel.end + "/g"), "',$1,'").split("\t").join("');").split(_tmplLabel.end).join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
            return data ? fn(data) : fn;
        };
    })();

    // 设置模板首尾标签
    RUN.setTmplLabel = function (label) {
        _isObject(label) && !_isEmptyObject(label) && _extend(_tmplLabel, label.start ? {start: label.start} : {}, label.end ? {end: label.end} : {});
    };

    typeof module !== 'undefined' ? (module.exports = RUN) : (window.RUN = RUN);

})(window);
