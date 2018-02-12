'use strict';

(function(){
$(function(){




	// FANCYBOX
	if( $("[data-fancybox='gallery']").length != 0 )
		$("[data-fancybox='gallery']").fancybox({
			afterShow : function( instance, current ) {
			},
			transitionEffect: "zoom-in-out"
		});

	//WOW
	new WOW({
		offset: 30
	}).init();




	// AOS
	AOS.init({
	  offset: 100,
	  once: true,
	  duration: 1100,
	  delay: 150
	});

	setTimeout(function(){AOS.refresh()}, 1000);



	$("#min-menu").mmenu({
		extensions 	: [ 
									"position-bottom", 
									"fullscreen", 
									"theme-black", 
									"listview-50", 
									"fx-panels-slide-up", 
									"fx-listitems-drop", 
									"border-offset" 
									],
		navbar 			: 
								{
									title 		: "Меню"
								},
		navbars		: [{
			height 	: 2,
			content : [ 
									'<div class="min-menu-logo">'+
									'<a  href="" ><img src="img/logo.png"/></a>'+
									'</div>'+
									'<div class="close-btn bar">'+
									'<a  href="#page" ><span class="icon-bar"></span><span class="icon-bar"></span></a>'+
									'</div>'
								]
					}, 
			{
				content : ["prev","title"] 
			}]
		}, { });





  // Flikity Carousel
	function flickityPrevNext( className ) {
		var carouselName = $( className )
		var $carousel = carouselName.find( ".carousel-content" );
		carouselName.find('.carousel-nav .next').on( 'click', function() {$carousel.flickity('next');});
		carouselName.find('.carousel-nav .prev').on( 'click', function() {$carousel.flickity('previous');});
	}
	var arrowStyle = { 
	  x0: 10,
	  x1: 60, y1: 50,
	  x2: 70, y2: 40,
	  x3: 30
	}



	var carouselPortfolio = $('.carousel-portfolio .carousel-content').flickity({
		imagesLoaded: true,
		autoPlay: false,
		arrowShape: arrowStyle,
		prevNextButtons: false,
		draggable: false,
		selectedAttraction: 0.1,
		friction: 1,
		wrapAround: true,
		pageDots: false,
		contain: false,
		percentPosition: true,
		cellAlign: ''
	});
	flickityPrevNext(".carousel-portfolio");


	var carouselProductions = $('.carousel-production-items').flickity({
		imagesLoaded: true,
		autoPlay: 3500,
		arrowShape: arrowStyle,
		prevNextButtons: true,
		draggable: false,
		selectedAttraction: 0.1,
		friction: 1,
		wrapAround: false,	
		pageDots: false,
		contain: false,
		percentPosition: true,
		cellAlign: '0.025'
	});
	var flkty = carouselProductions.data('flickity');
	carouselProductions.on( 'select.flickity', function() {

	  console.log( flkty.cells.length-1 + ' ' + flkty.selectedIndex, flkty )
	  if( flkty.cells.length-1 === flkty.selectedIndex )
	  	carouselProductions.flickity( 'next', true );

	})








	if( $('.carousel-article').length >= 0 ){

		var carouselMain = 		$('.carousel-article .carousel-main'),
				carouselNav = 		$('.carousel-article .carousel-nav');

		for( var i = 0 ; i < carouselMain.length ; i++ ){

			var crs = $(carouselMain).eq(i).flickity({
				imagesLoaded: true,
				prevNextButtons: false,
				cellAlign: 'center',
				//friction: 1,
				//selectedAttraction: 1,
				initialIndex: 0,
				draggable: true,
				contain: true,
				pageDots: false
			});
			var flkty = crs.data('flickity');

			crs.on( 'settle.flickity', function(e) {
				$(flkty.selectedElement).siblings().css("display", "none");
			})
			crs.on( 'select.flickity', function(e) {
				$(flkty.selectedElement).css("display", "");
			})

			$(carouselNav).eq(i).flickity({
				imagesLoaded: true,
				initialIndex: 0,
			  asNavFor: $(carouselMain)[i],
			  prevNextButtons: true,
			  draggable: true,
			  cellAlign: 'center',
			  adaptiveHeight: true,
			  //contain: true,
			  pageDots: false
			});

		}
	}







	//FORM
	(function() {

		if (!String.prototype.trim) {
			(function() {
				// Make sure we trim BOM and NBSP
				var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
				String.prototype.trim = function() {
					return this.replace(rtrim, '');
				};
			})();
		}

		[].slice.call( document.querySelectorAll( '.input__field' ) ).forEach( function( inputEl ) {

			if( inputEl.value.trim() !== '' ) {
				classie.add( inputEl.parentNode, 'input--filled' );
			}

			// events:
			inputEl.addEventListener( 'focus', onInputFocus );
			inputEl.addEventListener( 'blur', onInputBlur );
		} );

		function onInputFocus( ev ) {
			classie.add( ev.target.parentNode, 'input--filled' );
		}

		function onInputBlur( ev ) {
			if( ev.target.value.trim() === '' ) {
				classie.remove( ev.target.parentNode, 'input--filled' );
			}
		}
	})();



	function onLoaded  (){
		
		//MASONRY
		if( $('.grid-img').length != 0 ){
		
			var $grid = $('.grid-img').masonry({
			  itemSelector: '.grid-img-item',
			  columnWidth: '.grid-img-sizer',
			  percentPosition: true
			});

		}
	}



	if ( !$(".short-news-content").text().trim().length )
		if ( $(".search-not-found").length )
			$(".search-not-found").addClass("show");



	//SCROLL
	var header_status = false;
	$( window ).on("scroll", function(e){

		if($(window).scrollTop() > 300 && header_status == false){

			header_status = true;

			if ( $(".min-menu") ) $(".min-menu").addClass("scrolled");

		}else if($(window).scrollTop() < 300 && header_status == true){

			header_status = false;
			if ( $(".min-menu") ) $(".min-menu").removeClass("scrolled");

		}

	});





	
	window.preLoader = {

		preBox: ".pre-box",
		enter: false,
		status: $(".pre-box").hasClass("in"),

		preToggle: function ( bool, func ) {
			var endtime = 600;
			if( !this.enter ) 
				return;
			if ( typeof func === "function" )
				setTimeout( function() { func(); }, endtime )
			var preBox = $(this.preBox);

			bool || this.status ?
				preBox.removeClass("in").setTimeout( function(){ $( preBox ).hide(); }, endtime )
			:
				preBox.show().addClass("in").find(".box-content");
			
			return this.status = !this.status;

		},


		preImg: function ( img ) {

			var images = 						 		img || document.images,
					imagesTotalCount = 			images.length,
					imagesLoadedCount = 		0,
					preloadPercent = 		 		$(".percent").text("0 %");


			if( imagesTotalCount == 0 ){
				preOnload();
				$(preloadPercent).text("100 %"); 
			}

			for ( var i = 0; i < imagesTotalCount ; i++ ) {
				var image_clone = new Image();
						image_clone.onload = 		image_loaded;
						image_clone.onerror = 	image_loaded;
						image_clone.src = 			images[i].src;
			}

			function preOnload (){
				onLoaded();
			}

			function image_loaded (){
				imagesLoadedCount++;

				var per = ( ( 100 / imagesTotalCount ) * imagesLoadedCount ) << 0 ;

				setTimeout( function(){
					//console.log(per);
					$(preloadPercent).text(  per +  "%"); 
				}, 1)

				if(imagesLoadedCount >= imagesTotalCount )	preOnload();
			}

		}
	}


	preLoader.preImg();






		window.revSlider = $('.rev-slider') || null;
		var bannerSlider =  $('.rev-slider').hasClass("banner-slider") || null;

		onResized(function(){

	  	if( revSlider )
		   revSlider.revolution({
					delay:6000,
					startwidth: checkSm() ? $( window ).width() : checkMd() ? 970 : 1170,
					startheight: checkSm() ? 450 :  bannerSlider ? 700 : $( window ).height(),
					autoHeight:"off",
					fullScreenAlignForce:"off",

					onHoverStop:"on",

					thumbWidth:100,
					thumbHeight:50,
					thumbAmount:3,

					hideThumbsOnMobile:"on",
					hideBulletsOnMobile:"on",
					hideArrowsOnMobile:"on",
					hideThumbsUnderResoluition:0,

					hideThumbs: -1,
					hideTimerBar:"on",

					keyboardNavigation:"off",

					navigationType:"none",
					navigationArrows:"none",	//solo
					navigationStyle:"round",

					navigationHAlign:"center",
					navigationVAlign:"bottom",
					navigationHOffset: 0,
					navigationVOffset: 30,

					soloArrowLeftHalign:"left",
					soloArrowLeftValign:"center",
					soloArrowLeftHOffset:30,
					soloArrowLeftVOffset:0,

					soloArrowRightHalign:"right",
					soloArrowRightValign:"center",
					soloArrowRightHOffset:30,
					soloArrowRightVOffset:0,


					touchenabled: "off",
					swipe_velocity:"0.7",
					swipe_max_touches:"1",
					swipe_min_touches:"1",
					drag_block_vertical: "false",

					stopAtSlide:-1,
					stopAfterLoops:-1,
					hideCaptionAtLimit:0,
					hideAllCaptionAtLilmit:0,
					hideSliderAtLimit:0,

					fullWidth:"off",
					fullScreen:"off",
					fullScreenOffsetContainer: "#header",

					dottedOverlay:"none",
					forceFullWidth:"off",

		      shadow:0

		    }).find("li").click(function(){ revSlider.revnext() })
			

		});


	});
}) (jQuery);














var isWebkit = /Webkit/i.test(navigator.userAgent),
		isChrome = /Chrome/i.test(navigator.userAgent),
		isMac =  	 /Mac/i.test(navigator.userAgent),
		isMobile = !!("ontouchstart" in window),
		isAndroid = /Android/i.test(navigator.userAgent);





// COMMON FUNCTION


setTimeout( function (){

	//jQuery FUNCITON
	$.fn.onResized = function(){
		onResized( function(){this} )
		return this;
	}

},1)



function checkSm(){
	return ($( document ).width() <= 991);
}
function checkMd(){
	return ( $( document ).width() < 1199 && !checkSm() );
}

function getRandomInt( min, max ) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomIntFloat( min, max ) {
  return Math.random() * (max - min) + min;
}
function onResized( f ) {
	if( typeof f === "function" ) f();
	$( window ).on("resize", function(e){
		if( typeof f === "function" ) f();
	});
	return this;
}
function scrolledDiv( el ) {
	try{
	  var docViewTop = $(window).scrollTop(),
		docViewBottom = docViewTop + $(window).height(),
		elTop = $(el).offset().top,
		elBottom = elTop + $(el).height()/1.8;
	}catch(err){console.error();}

  	return ((elBottom <= docViewBottom) && (elTop >= docViewTop));
}






