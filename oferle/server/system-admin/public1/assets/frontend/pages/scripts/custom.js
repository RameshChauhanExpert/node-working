$( document ).ready(function() {

	$(".page-sidebar-menu").click(function(){
	    $(".page-sidebar-menu").toggleClass("sidebar-main");	    
	    $(".page-content").toggleClass("slide-left");	    
	});
});

