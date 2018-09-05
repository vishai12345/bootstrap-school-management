/*global $, console*/

$(function () {
   
    'use strict';
    
    $('.pCard_add-2').click(function () {
        $('.pCard_card-2').toggleClass('pCard_on-2');
        $('.pCard_add-2 i').toggleClass('fa-minus');
    });

});