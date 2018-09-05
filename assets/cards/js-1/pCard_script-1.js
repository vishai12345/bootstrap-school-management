/*global $, console*/

$(function () {
   
    'use strict';
    
    $('.pCard_add-1').click(function () {
        $('.pCard_card-1').toggleClass('pCard_on-1');
        $('.pCard_add-1 i').toggleClass('fa-minus');
    });

});