(function($, window, document, undefined) {

    'use strict';

    $('a[href*="#"]').on('click', function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
    });

// $(document).ready(function() {
//     // ie8
//     if (!Array.prototype.indexOf) {
//         Array.prototype.indexOf = function(obj, start) {
//             for (var i = (start || 0), j = this.length; i < j; i++) {
//                 if (this[i] === obj) {
//                     return i;
//                 }
//             }
//             return -1;
//         };
//     }

    // $('.helpMode').helpMode({
    //     // show the elements when the plugin initialization have been triggered
    //     showDefault: true,

    //     // delay before showing the plugin
    //     delayShow: 500,

    //     // delay before hiding the plugin
    //     delayHide: 0,

    //     // change the direction of animation by mouse position
    //     followCursor: false
    // });

    // var grid = $('.cbp'),
    //     filter = grid.prev();

    // // confy init
    // $.confy.init({
    //     itemCls: '.cfy-item',

    //     startOpen: true,

    //     callback: function(options) {

    //         grid.cubeportfolio('destroy', function() {

    //             grid.cubeportfolio('init', options);

    //             filter.find('.cbp-filter-item').removeClass('cbp-filter-item-active').eq(0).addClass('cbp-filter-item-active');

    //             $('.cbp-l-filters-dropdownHeader').text('Sort Gallery');

    //             grid.cubeportfolio('showCounter', filter.find('.cbp-filter-item'));

    //         });

    //     },

    //     loadingStart: function() {
    //         $('.cfy-wrap').addClass('cfy-wrap-loading');
    //     },

    //     loadingEnd: function() {
    //         $('.cfy-wrap').removeClass('cfy-wrap-loading');
    //     },

    //     dependencies: function(options) {
    //         if (options.displayType == 'default') {
    //             $('input[data-option="displayTypeSpeed"]').closest('.cfy-section').slideUp();
    //             $('.helpMode').helpMode('show');
    //             $('.dependeciesTypeSpeed').helpMode('hide');
    //         } else {
    //             $('input[data-option="displayTypeSpeed"]').closest('.cfy-section').slideDown();
    //             $('.helpMode').helpMode('show');
    //         }
    //     },

    //     hide: function() {
    //         $('.helpMode').helpMode('hide');
    //     },

    //     show: function() {
    //         $('.helpMode').helpMode('show');
    //     },

    //     // get settings from cubeportfolio
    //     settings: $.extend({}, $.data(grid[0], 'cubeportfolio').options)
    // });


    // $(document).on('scroll.wb', function(event) {
    //     event.preventDefault();

    //     // $('.cfy-wrap').height($('body').height());

    // });
    // });

})(jQuery, window, document);
