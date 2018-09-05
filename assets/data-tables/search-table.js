$(document).ready(function () {

    (function ($) {

        $('#filter1').keyup(function () {

            var rex = new RegExp($(this).val(), 'i');
            $('.searchable1 tr').hide();
            $('.searchable1 tr').filter(function () {
                return rex.test($(this).text());
            }).show();

        });
        $('#filter2').keyup(function () {

            var rex = new RegExp($(this).val(), 'i');
            $('.searchable2 tr').hide();
            $('.searchable2 tr').filter(function () {
                return rex.test($(this).text());
            }).show();

        });
        $('#filter3').keyup(function () {

            var rex = new RegExp($(this).val(), 'i');
            $('.searchable3 tr').hide();
            $('.searchable3 tr').filter(function () {
                return rex.test($(this).text());
            }).show();

        })
    }(jQuery));
});