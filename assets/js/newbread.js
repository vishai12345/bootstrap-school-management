(function ()
{
    $('document').ready(function ()
    {
        $('.toggle-source-preview').on('click', function ()
        {
            $(this).parents('.example').toggleClass('show-source');
        });
    });

    /**
     * Watching media step changes
     */
    /*$(window).on('fuse::matchMediaChanged', function (ev, currentStep, isOrBelow, isOrAbove)
     {
     console.info('match media changed');
     console.info(currentStep);
     });*/

})();