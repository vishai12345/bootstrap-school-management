$(".tree a").click(function(){
  if($(this).hasClass("childHidden")){
    $(this).removeClass("childHidden");
    var parent = $(this).parent("li");
    $(parent).children("ul").show();
  }
  else{
    $(this).addClass("childHidden");
    var parent = $(this).parent("li");
    $(parent).children("ul").hide();
  }
});
$(".static-tree #node6").click(function(){
  $(".tree").toggle();
})