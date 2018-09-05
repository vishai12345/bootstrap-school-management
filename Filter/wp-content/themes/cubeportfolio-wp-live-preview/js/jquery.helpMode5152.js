/**
 * helpMode v0.1 - http://scriptpie.com
 *
 * Commercial use requires one-time purchase of a commercial license
 * http://isotope.metafizzy.co/docs/license.html @todo license link
 *
 * Non-commercial use is licensed under the MIT License
 *
 * Copyright - 2013 Mihai Buricea
 */
//@todo - sa-si dea seama daca mai are spatiu pe verticala sau orizontala si sa se deschida in partea cealalta. Astrfel se evita situatiile cand ecranul e prea mic si se deschide help mode si nu se vede
//@todo - show hide cu callbackfunction
(function ($, window, document, undefined) {

    "use strict";

    // Utility
    if (typeof Object.create !== 'function') {
        Object.create = function (obj) {
            function F() {
            }

            F.prototype = obj;
            return new F();
        };
    }

    var pluginName = 'helpMode',
        pluginNamespace = 'hm',
        eventNamespace = '.' + pluginNamespace,
        pluginObject = {


            /**
             * plugin initialization
             */
            _main: function (obj, options) {

                var t = this;

                // the wrap element is active
                t.isActive = false;

                // registered events (observator & publisher pattern)
                t.registeredEvents = [];

                // extend options
                t.options = $.extend({}, $.fn[pluginName].options, options);

                // store js element
                t.obj = obj;

                // store jquery element
                t.$obj = $(obj);

                // check support for modern browsers
                t._browserInfo();

                // create html markup and css
                t._createMarkup();

                // add events
                t._events();

                if (t.options.showDefault) {
                    t.show.call(t.obj);
                }

            },


            /**
             * Get info about client browser
             */
            _browserInfo: function () {

                var t = this,
                    appVersion = navigator.appVersion;

                if (appVersion.indexOf("MSIE 8.") !== -1) { // ie8
                    t.browser = 'ie8';
                } else if (appVersion.indexOf("MSIE 9.") !== -1) { // ie9
                    t.browser = 'ie9';
                } else if (appVersion.indexOf("MSIE 10.") !== -1) { // ie10
                    t.browser = 'ie10';
                } else if ((/android/gi).test(appVersion)) { // android
                    t.browser = 'android';
                } else if ((/iphone|ipad|ipod/gi).test(appVersion)) { // ios
                    t.browser = 'ios';
                } else {
                    t.browser = '';
                }

                // add class to plugin for additional support
                if (t.browser) {
                    t.$obj.addClass(pluginNamespace + t.browser);
                }

            },


            /**
             * Create html markup for plugin
             */
            _createMarkup: function () {

                var t = this;

                // CREATE WRAP
                t.wrap = $('<div/>', {
                    'class': 'hm-wrap'
                });

                // get data options from html
                t.dataOptions = {
                    header: t.$obj.data('hm-header'),
                    body: t.$obj.data('hm-body'),
                    addClass: t.$obj.data('hm-addclass') || '',
                    animation: t.$obj.data('hm-animation') || 'fade',
                    direction: t.$obj.data('hm-direction') || 'br',
                    parentAlign: t.$obj.data('hm-align').split('-')[0] || 'bc',
                    childAlign: t.$obj.data('hm-align').split('-')[1] || 'tc'
                };

                // add animation class to wrap. add direction class to wrap. add addition class to wrap
                t.wrap.addClass('hm-animation-' + t.dataOptions.animation)
                    .addClass('hm-direction-' + t.dataOptions.direction)
                    .addClass(t.dataOptions.addClass);

                // CREATE CONTAINER
                t.container = $('<div/>', {
                    'class': 'hm-container'
                }).appendTo(t.wrap);


                // CREATE PANEL
                t.panel = $('<div/>', {
                    'class': 'hm-panel'
                }).appendTo(t.container);

                // add header if available
                if (t.dataOptions.header) {
                    $('<div/>', {
                        'class': 'hm-header',
                        'html': t.dataOptions.header
                    }).appendTo(t.panel);
                }

                // add body if available
                if (t.dataOptions.body) {
                    $('<div/>', {
                        'class': 'hm-body',
                        'html': t.dataOptions.body
                    }).appendTo(t.panel);
                }
            },

            _layout: function () {

                var t = this;

                // get position for this.$obj
                t.positionObj = t._getPosition(t.$obj.offset(), t.$obj.outerWidth(), t.$obj.outerHeight(), t.dataOptions.parentAlign);

                // get position for wrap
                t.positionWrap = t._getPosition({
                    top: 0,
                    left: 0
                }, -t.wrap.outerWidth(true), -t.wrap.outerHeight(true), t.dataOptions.childAlign);

                // add css to wrap
                t.wrap.css({
                    top: t.positionObj.top + t.positionWrap.top,
                    left: t.positionObj.left + t.positionWrap.left
                });

                // store container style
                t.containerStyle = {
                    width: t.container.outerWidth(),
                    height: t.container.outerHeight(),
                    top: t.container[0].offsetTop,
                    left: t.container[0].offsetLeft
                };

                // store panel style
                t.panelStyle = {
                    width: t.panel.outerWidth(),
                    height: t.panel.outerHeight()
                };

                t.container.css(t.containerStyle);

            },

            _events: function () {

                var t = this, n;

                // resize event
                $(window).on("resize" + eventNamespace, function () {

                    if (!t.isActive) return;

                    if (n) {
                        clearTimeout(n);
                    }

                    n = setTimeout(function () {

                        // reposition the blocks
                        t._layout();

                    }, 50);
                });

                // hover event
                t.container.on('mouseenter' + eventNamespace, function (e) {

                    var width = t.panelStyle.width,
                        height = t.panelStyle.height,
                        top = t.containerStyle.top,
                        left = t.containerStyle.left;

                    if (t.options.followCursor) {

                        t.wrap.removeClass('hm-direction-' + t.dataOptions.direction);

                        if ((e.pageY - t.container.offset().top) <= (t.containerStyle.height / 2)) {
                            t.dataOptions.direction = 'b';
                        } else {
                            t.dataOptions.direction = 't';
                        }

                        if ((e.pageX - t.container.offset().left) <= (t.containerStyle.width / 2)) {
                            t.dataOptions.direction += 'r';
                        } else {
                            t.dataOptions.direction += 'l';
                        }

                        t.wrap.addClass('hm-direction-' + t.dataOptions.direction);

                    }

                    if (t.dataOptions.animation === 'expand') {

                        switch (t.dataOptions.direction) {
                            case 'bl':
                                left = left - width + t.containerStyle.width;
                                break;

                            case 'tr':
                                top = top - height + t.containerStyle.height;
                                break;

                            case 'tl':
                                top = top - height + t.containerStyle.height;
                                left = left - width + t.containerStyle.width;
                                break;
                        }

                        t.container.css({
                            width: width,
                            height: height,
                            top: top,
                            left: left
                        });
                    }

                    t.wrap.addClass('hm-active');

                }).on('mouseleave' + eventNamespace, function (e) {

                    t.container.css(t.containerStyle);
                    t.wrap.removeClass('hm-active');

                });

            },


            /**
             * Get position for current element
             */
            _getPosition: function (offset, width, height, align) {

                var obj = {};

                offset.left = parseInt(offset.left, 10);
                offset.top = parseInt(offset.top, 10);

                obj = {
                    left: offset.left,
                    top: offset.top,
                    right: offset.left + width,
                    bottom: offset.top + height,
                    centerLeft: parseInt((2 * offset.left + width) / 2, 10),
                    centerTop: parseInt((2 * offset.top + height) / 2, 10),
                };

                return this['_getPosition' + align.toUpperCase()](obj);
            },

            // get top center position
            _getPositionTC: function (obj) {

                return {
                    top: obj.top,
                    left: obj.centerLeft
                };
            },

            // get top right position
            _getPositionTR: function (obj) {

                return {
                    top: obj.top,
                    left: obj.right
                };

            },

            // get right center position
            _getPositionRC: function (obj) {

                return {
                    top: obj.centerTop,
                    left: obj.right
                };

            },

            // get right bottom position
            _getPositionRB: function (obj) {

                return {
                    top: obj.bottom,
                    left: obj.right
                };

            },

            // get bottom center position
            _getPositionBC: function (obj) {

                return {
                    top: obj.bottom,
                    left: obj.centerLeft
                };

            },

            // get bottom left position
            _getPositionBL: function (obj) {

                return {
                    top: obj.bottom,
                    left: obj.left
                };

            },

            // get left center position
            _getPositionLC: function (obj) {

                return {
                    top: obj.centerTop,
                    left: obj.left
                };

            },

            // get left top position
            _getPositionLT: function (obj) {

                return {
                    top: obj.top,
                    left: obj.left
                };

            },

            // get center position
            _getPositionCC: function (obj) {

                return {
                    top: obj.centerTop,
                    left: obj.centerLeft
                };

            },

            // show the plugin
            _showPlugin: function () {

                var t = this;

                // append wrap to body
                t.wrap.appendTo(document.body);

                t._layout();

                t.isActive = true;
            },

            // show the plugin
            _hidePlugin: function () {

                var t = this;

                // hide the wrap
                t.wrap.detach();

                t.isActive = false;
            },


            /**
             *  Register event
             */
            _registerEvent: function (name, callbackFunction, oneTime) {

                var t = this;

                if (!t.registeredEvents[name]) {

                    t.registeredEvents[name] = [];

                    t.registeredEvents.push(name);
                }

                t.registeredEvents[name].push({
                    func: callbackFunction,
                    oneTime: oneTime || false
                });


            },

            /**
             *  Trigger event
             */
            _triggerEvent: function (name) {

                var t = this;

                if (t.registeredEvents[name]) {
                    for (var i = t.registeredEvents[name].length - 1; i >= 0; i--) {

                        t.registeredEvents[name][i].func.call(t);

                        if (t.registeredEvents[name][i].oneTime) {

                            t.registeredEvents[name].splice(i, 1);
                        }

                    }
                }

            },


            /*  -----------------------------------------------------
             PUBLIC METHODS
             ----------------------------------------------------- */

            /**
             * Initializate the plugin
             */
            init: function (options, callbackFunction) {

                var t = $.data(this, pluginNamespace);

                if (t) {
                    throw new Error(pluginName + " is already initialized. Please destroy it before initialize again!");
                }

                // create new pluginObject attached to this element
                t = $.data(this, pluginNamespace, Object.create(pluginObject));

                // call private _main
                t._main(this, options);

            },

            /**
             * Destroy the plugin
             */
            destroy: function (callbackFunction) {

                var t = $.data(this, pluginNamespace);

                if (!t) {
                    throw new Error(pluginName + " is not initialized. Please initialize before calling destroy method!");
                }

                // remove wrap
                t.wrap.remove();

                // remove data
                $.removeData(this, pluginNamespace);

                // off on resize event
                $(window).off("resize" + eventNamespace);

            },


            /**
             * Show the plugin
             */
            show: function () {

                var t = $.data(this, pluginNamespace);
                if (!t) {
                    throw new Error(pluginName + " is not initialized. Please initialize before calling show method!");
                }

                if (t.options.delayShow === 0) {
                    t._showPlugin();
                } else {
                    setTimeout(function () {
                        t._showPlugin();
                    }, t.options.delayShow);
                }

            },

            /**
             * Hide the plugin
             */
            hide: function () {

                var t = $.data(this, pluginNamespace);
                if (!t) {
                    throw new Error(pluginName + " is not initialized. Please initialize before calling hide method!");
                }

                if (t.options.delayHide === 0) {
                    t._hidePlugin();
                } else {
                    setTimeout(function () {
                        t._hidePlugin();
                    }, t.options.delayHide);
                }

            }

        };

    /**
     * jQuery plugin initializer
     */
    $.fn[pluginName] = function (method) {

        var args = arguments;

        return this.each(function () {

            // public method calling
            if (pluginObject[method]) {

                return pluginObject[method].apply(this, Array.prototype.slice.call(args, 1));

            } else if (typeof method === 'object' || !method) {

                return pluginObject.init.apply(this, args);

            } else {

                console.log('Method ' + method + ' does not exist on jQuery.' + pluginName + '.js');
            }

        });

    };


    // Plugin default parameters
    $.fn[pluginName].options = {

        // show the elements when the plugin initialization have been triggered
        showDefault: true,

        // delay before showing the plugin
        delayShow: 0,

        // delay before hiding the plugin
        delayHide: 0,

        // change the direction of animation by mouse position
        followCursor: false

    };

})(jQuery, window, document);
