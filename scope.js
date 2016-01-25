/**
 * 【run.scope】代码组织
 * @dependancy jQuery / Zepto
 * @author Phil Li <zixulee@163.com>
 * @date 2014.3.12
 */
(function(window){
    
    var RUN, $ = window.$ || RUN;
    
    if(!$) return;
    
    RUN = window.RUN || function(selector, context){
        var fn = arguments.callee, init;
        return this instanceof fn ? new fn.Scope(selector) : (init = fn.prototype._init) && new init(selector, context);
    };
    
    // 代码组织
    RUN.Scope = function(object){
        var self = arguments.callee, pt = self.prototype;
        self.events = {};
        if(!(this instanceof self)) return new self(object);
        !pt._init && (pt._init = function(){
            var that = this,
                $doc = $(document),
                el = this.el;
            if(!el){
                el = this.el = this.tagName ? '<' + this.tagName.replace(/^\<|(\/)*\>&/g, '') + ' />' : 'body';
            }
            this.$el = $(el);
            var events = this.events;
            if(events){
                for(var key in events){
                    var handler = events[key];
                    (function(key, handler){
                        setTimeout(function(){
                            if(!handler) return;
                            var evtArr = $.trim(key = key.replace(/\s+/g, ' ')).split(' '),
                                evts = evtArr.shift();
                            if(!evts || !evtArr.length) return;
                            $.inArray('window', evtArr) < 0 && $.inArray('document', evtArr) < 0 && $.inArray('body', evtArr) < 0 && evtArr.unshift(el);
                            var selector = evtArr.join(' '),
                                handlerName = '';
                            typeof handler === 'string' && (handlerName = handler);
                            $.each(evts.split(','), function(i, evt){
                                if(handlerName){
                                    var fullEventName = evt + '|' + selector.replace(/\s+/g, '~') + '|' + handlerName;
                                    if(!self.events[fullEventName]){
                                        var isSameOne;
                                        for(var existOne in self.events){
                                            var existArr = existOne.split('|');
                                            if(existArr.length < 3) continue;
                                            var existEvt = existArr[0],
                                                existSelector = existArr[1].replace(/~/, ' '),
                                                existHandlerName = existArr[2];
                                            if(evt === existEvt && selector === existSelector && handlerName === existHandlerName){
                                                isSameOne = true;
                                                break;
                                            }
                                        }
                                        if(!isSameOne){
                                            $.each(evt.split(','), function(i, e){
                                                $doc.on(e, selector, function(event){
                                                    handlerName ? ($.isFunction(that[handler]) && that[handler].apply(that, arguments)) : (handler && handler.apply(that, arguments));
                                                });
                                            });
                                            self.events[fullEventName] = true;
                                        }
                                    }
                                }else{
                                    $.each(evt.split(','), function(i, e){
                                        $doc.on(e, selector, function(event){
                                            handlerName ? ($.isFunction(that[handler]) && that[handler].apply(that, arguments)) : (handler && handler.apply(that, arguments));
                                        });
                                    });
                                }
                            });
                        });
                    })(key, handler);
                }
            }
            var init = this.init || this.initialize;
            init && init.apply(this, arguments);
        });
        var F = function(){
            var self = arguments.callee;
            if(!(this instanceof self)) return new self(arguments);
            this._init.apply(this, arguments);
        };
        $.extend(F.prototype, pt, object);
        return F;
    };

    typeof module !== 'undefined' ? (module.exports = RUN.Scope) : (window.RUN = RUN);
    
})(window);
