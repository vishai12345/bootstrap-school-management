$(document).ready(function () {




	var counterData = choose_mounth + " " + choose_day +", "+ choose_year;
	var counterTime = new Date(counterData + " " + choose_hour);
	$('#counter').countdown({
	until: counterTime,
	serverSync: serverTime,
	layout: '<div id="counter_bkg"><span class="marg"></span><span class="num{d100}"></span><span class="num{d10}"></span><span class="num{d1}"></span><span class="sep"></span><span class="num{h10}"></span><span class="num{h1}"></span><span class="sep"></span><span class="num{m10}"></span><span class="num{m1}"></span><span class="sep"></span><span class="num{s10}"></span><span class="num{s1}"></span><span class="marg"></span></div> <ul class="labels"><li class="lrg">{dl}</li><li>{hl}</li><li>{ml}</li><li>{sl}</li></ul><div id="glass"></div> ',
	expiryText:'<div class="expiry">' + counterExpiryText + '</div>',
	alwaysExpire: true
	});

	function serverTime() {
	var time = null;
	$.ajax({url: 'display_files/bin/serverTime.php',
		async: false, dataType: 'text',
		success: function(text) {
			time = new Date(text);
		}, error: function(http, message, exc) {
			time = new Date();
	}});
	return time;
	}


	$('.msg').hide();
	$("#submit").click(function() {
		$('.msg').hide();
		var email = $("#email").val();
			email_validation = /^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
		if (email == "" || !email_validation.test(email)){
		    $("#email").focus();
			$('.email_error').hide().fadeIn(1500, function() {
          $('.email_error');
		  });
		    return false;
		}else{
			var email = 'email= ' + email;
			$.ajax({
	    		type: "POST",
	    		url: "display_files/bin/process.php",
	    		data: email,
	    		success: function() {
					$('#newsletterForm h3 , .email_input , .sendbutton').hide();
	      			$('.send_ok').hide().fadeIn(1500, function() {
          $('.send_ok');
        });
	    		},
				error: function() {
	      			$('.send_error').hide().fadeIn(1500, function() {
         				 $('.send_error');
       				 });
				}
	   		});
	 		return false;
		}
	});


	var url_number_style = "display_files/images/numbers/num_style" + choose_numbers_style + ".png";
	$("body").addClass(choose_background);
	$("body").addClass(choose_style);
	$('<style id="num_col">#counter_bkg { background-color: ' + choose_numbers_color + ';}</style>').appendTo("head");
	$('<style id="num_sty">#counter span{background-image: url(' + url_number_style + ');}</style>').appendTo("head");
	$("span.date").text(counterData);

	function whatBackground(choose_background,choose_texture){

		if (choose_background == "image") {
			$('<div id="supersized"></div>').appendTo("body");
			$('<div id="darken"></div>').appendTo("body");
			// Slideshow for Background Slideshow theme
			$.supersized({
							slide_interval          : choose_slide_interval,
							transition              : choose_transition,
							transition_speed		: choose_transition_speed,
							slides 					: slidesArray
						});
		}else{
			$("#supersized").detach();
			$("#darken").remove();
			var background_texture = choose_background + choose_texture;
			var url_background = "display_files/images/textures/" + background_texture + ".png";
			$("body").css("background-image","url(" + url_background + ")");

		};

	};

	whatBackground(choose_background,choose_texture);

		function setSectionHeight() {
			var navigationHeight = $(".site-nav").height();
			//var section = $('section');
			var windowHeight = getWindowHeight();

			/*if ( section.hasClass('fullscreen') ) {*/
				$('section').css( 'min-height', windowHeight );
			/*}*/
		}



		//setSectionHeight();


		$(window).on('resize', function () {
		//	setSectionHeight();
		});

function getWindowHeight() {
		return Math.max( $(window).height(), window.innerHeight);
	}


	$("ul#numbers li a").click(function() {
		$("ul#numbers li a").removeClass("active");
		var number_style = $(this).attr("rel");
		$(this).addClass("active");
		var url_number_style = "display_files/images/numbers/num_style" + number_style + ".png";
		$('<style id="num_sty">#counter span{background-image: url(' + url_number_style + ');}</style>').appendTo("head");
		return false;
	});
	$("ul#color li a").click(function(){
		var col = $(this).css('backgroundColor');
		$('.colorSelector2 div').css('backgroundColor', col);
		$("<style>#counter_bkg { background-color: " + col + ";}</style>").appendTo("head");
		choose_numbers_color = col;
		return false;
	});
	$("ul#display_color li a").click(function() {
		$("body").removeClass("black white");
		$("ul#display_color li a").removeClass("active");
		$(this).addClass("active");
		var choose_style= $(this).attr("rel");
		$("body").addClass(choose_style);
		return false;
	});
	$("ul#squema li a").click(function() {
		$("body").removeClass("dark light image");
		$("ul#squema li a").removeClass("active");
		$(this).addClass("active");
		var choose_back= $(this).attr("rel");
		$("body").addClass(choose_back);
		choose_background = choose_back;
		whatBackground(choose_background,choose_texture);
		return false;
	});
	$("ul#patterns li a").click(function() {
		$("ul#patterns li a").removeClass("active");
		$(this).addClass("active");
		var texture = $(this).attr("rel");
		choose_texture = texture;
		whatBackground(choose_background,choose_texture);
	return false;
	});

	$('.colorSelector2').ColorPicker({
		onShow: function (colpkr) {
			$(colpkr).fadeIn(500);
			return false;
		},
		onHide: function (colpkr) {
			$(colpkr).fadeOut(500);
			return false;
		},
		onChange: function (hsb, hex, rgb) {
			$('.colorSelector2 div').css('backgroundColor', '#' + hex);
			$("<style>#counter_bkg { background-color: #" + hex + ";}</style>").appendTo("head");

		},
	});

	$("div.panel_button").click(function(){
		$("div#panel").animate({
			left: "0px"
		}, "fast");
		$(".panel_button").animate({
			left: "145px"
		}, "fast");
		$("div.panel_button").toggle();
	});
   $("div.hide_button").click(function(){
		$("div#panel").animate({
			left: "-155px"
		}, "fast");
		$(".panel_button").animate({
			left: "-10px"
		}, "fast");
   	});



});