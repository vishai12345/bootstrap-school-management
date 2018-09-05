$(document).ready(function(){
    $(".popper").popover({
        html: true,
        placement: 'left',
        trigger: 'hover',
        content: function(){
            return $(this).next('#popover_content_wrapper').html();
        },
        delay: { show: 100, hide: 100}
    })
});
