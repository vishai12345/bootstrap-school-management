/*global $, console*/

$(function () {
   
    'use strict';
    
    $('.pCard_add-3').click(function () {
        $('.pCard_card-3').toggleClass('pCard_on-3');
        $('.pCard_add-3 i').toggleClass('fa-minus');
    });

});