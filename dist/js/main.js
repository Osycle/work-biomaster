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
		var carouselWrapper = $( className );
		var carousel = carouselWrapper.find( ".carousel-items" );
		var carouselPrevNext = carouselWrapper.find( ".carousel-prev-next" );
		var btnNext = carouselPrevNext.find(".next");
		var btnPrev = carouselPrevNext.find(".prev");
		var flkty = carousel.data("flickity");
		var selected;
		btnNext.on( 'click', function() {
			carousel.flickity('next', true);
		});
		
		btnPrev.on( 'click', function() {
			carousel.flickity('previous', true);
		});
		carousel.on( 'select.flickity', function() {
			selected = $(flkty.selectedElement);
			selected.removeClass("is-next is-prev")
			selected.next().addClass("is-next");
			selected.prev().addClass("is-prev");
		  	//console.log( $(flkty.selectedElement).next() )
		})
	}


	var arrowStyle = { 
	  x0: 10,
	  x1: 60, y1: 50,
	  x2: 70, y2: 40,
	  x3: 30
	}


	var carouselProductions = $('.short-productions-carousel .carousel-items').flickity({
		imagesLoaded: true,
		autoPlay: false,
		arrowShape: arrowStyle,
		prevNextButtons: false,
		draggable: false,
		selectedAttraction: 0.1,
		friction: 1,
		wrapAround: false,	
		pageDots: false,
		contain: false,
		percentPosition: true,
		cellAlign: !checkSm() ? '0.025' : 'center'
	});
	flickityPrevNext( $('.short-productions-carousel') );

	var carouselNews = $('.short-news-carousel .carousel-items').flickity({
		imagesLoaded: true,
		autoPlay: false,
		arrowShape: arrowStyle,
		initialIndex: 2,
		prevNextButtons: checkSm(),
		draggable: checkSm(),
		selectedAttraction: 0.1,
		friction: 1,
		wrapAround: false,	
		pageDots: false,
		contain: false,
		percentPosition: true,
		cellAlign: 'center'
	});
	if( !checkSm() )
			flickityPrevNext( $('.short-news-carousel') );




	function carouselArticle(){

		if( $('.carousel-article').length >= 0 ){

			var carouselMain = 		$('.carousel-article .carousel-main'),
					carouselNav = 		$('.carousel-article .carousel-nav');

			for( var i = 0 ; i < carouselMain.length ; i++ ){

				var crs = $(carouselMain).eq(i).flickity({
					imagesLoaded: true,
					prevNextButtons: false,
					//friction: 1,
					//selectedAttraction: 1,
					initialIndex: 0,
					draggable: true,
					cellAlign: 'center',
					contain: true,
					pageDots: false
				});
				var flkty = crs.data('flickity');

				// crs.on( 'settle.flickity', function(e) {
				// 	$(flkty.selectedElement).siblings().css("display", "none");
				// })
				// crs.on( 'select.flickity', function(e) {
				// 	$(flkty.selectedElement).css("display", "");
				// })

				$(carouselNav).eq(i).flickity({
					imagesLoaded: true,
					initialIndex: 0,
				  asNavFor: $(carouselMain)[i],
				  prevNextButtons: true,
				  draggable: true,
				  adaptiveHeight: true,
				  cellAlign: 'center',
				  //contain: true,
				  pageDots: false
				});

			}
		}

	}
	carouselArticle();


	function onLoaded  (){
		
		//MASONRY
		if( $('.grid-img').length != 0 ){
		
			var $grid = $('.grid-img').masonry({
			  itemSelector: '.grid-img-item',
			  columnWidth: '.grid-img-sizer',
			  percentPosition: true
			});

		}
		carouselArticle();
	}



	var videoContainer = $(".shares-news-video") || null
	if( videoContainer )
	(function(){
		var selectClass = "is-nav-selected";
		var mainCell = videoContainer.find(".video-main .video-cell");
		var navCells = videoContainer.find(".video-nav .video-cell");
		var selectCellSrc = videoContainer.find(".video-nav .is-nav-selected iframe").attr("src");
		var mainIframe = mainCell.find("iframe");
		mainIframe.attr( "src", selectCellSrc )
		navCells.find("iframe").on( "load", function(){
			$(this).addClass("in");
		})
		navCells.on("click", function( e ){
			var that = $(this);
			navCells.filter( "."+selectClass ).removeClass( selectClass );
			that.closest( ".video-cell" ).addClass( selectClass );
			var videoSrc = that.find( "iframe" ).attr( "src" );
			mainIframe.attr( "src", videoSrc );
			//(is-nav-selected)
			console.log(this);
		})

	})();










	//SCROLL
	var minMenu = $(".min-menu") || null;
	var headerRange = false;
	$( window ).on("scroll", function(e){

		if( $(window).scrollTop() > 300 && headerRange == false ){
			headerRange = true;
			if ( minMenu ) $(".min-menu").addClass("scrolled");
		}else if( $(window).scrollTop() < 300 && headerRange == true ){
			headerRange = !true;
			if ( minMenu ) $(".min-menu").removeClass("scrolled");
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
					startheight: checkSm() ? 450 :  bannerSlider ? 720 : 680,
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

},10)



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






