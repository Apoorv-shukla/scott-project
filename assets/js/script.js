// JavaScript Document
$(document).ready(function(){
	$("#nav-icon").click(function(){
		$("#mobile-menu").collapse('toggle');
		$("#mobile-menu").removeClass("animated slideOutLeft");
		// $("#mobile-menu").removeClass("position-absolute");
		// $("#mobile-menu").removeClass("position-fixed");
		$("#mobile-menu").addClass("animated slideInLeft");
		$("#nav-icon-close").click(function(){
			$("#mobile-menu").removeClass("animated slideInLeft");
			$("#mobile-menu").addClass("animated slideOutLeft");
			setTimeout(()=>{$("#mobile-menu").collapse('toggle')},1000);
			
		});
		
		
	});
});
// $(document).ready(function(){
//     $(".loginPagebtn").click(function(){
//         $(".adsContainer").css("display","none");
//         $(".signupContainer").fadeOut(500,function(){
//             $(".loginContainer").fadeIn(500);
//         });
//     })
// });
// $(document).ready(function(){
    
//     $(".signupPagebtn").click(function(){
//         $(".adsContainer").css("display","none");
//         $(".loginContainer").fadeOut(500,function(){
//             $(".signupContainer").fadeIn(500);
//         });
//     })
// });

// (function($){
// 	$('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
// 	  if (!$(this).next().hasClass('show')) {
// 		$(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
// 	  }
// 	  var $subMenu = $(this).next(".dropdown-menu");
// 	  $subMenu.toggleClass('show');

// 	  $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
// 		$('.dropdown-submenu .show').removeClass("show");
// 	  });

// 	  return false;
// 	});
// })(jQuery)


$(document).ready(function(){
	$("#ads_a").on("mouseover",function(){
		$(".ads_over").removeClass("d-none");
		$(".ads_over").addClass("d-block");
		
	});
	$(".drop_1, .drop_2").on("mouseover",function(){
		$(".ads_over").removeClass("d-block");
		$(".ads_over").addClass("d-none");
		
	});
});

$(document).ready(function(){
	$("#find_pro").on("mouseover",function(){
		$(".pro_over").removeClass("d-none");
		$(".pro_over").addClass("d-block");
		
	});
	$(".drop_2-1,.drop_2-2,.drop_2-3").on("mouseover",function(){
		$(".pro_over").removeClass("d-block");
		$(".pro_over").addClass("d-none");
		
	});
});