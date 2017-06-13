// Functionality
$('#resNavBtn').click(function (){
    $('#resNavIcon').toggleClass('opened');
    $('.responsive-nav').toggleClass('opened');
});
$('.responsive-nav a').click(function (){
    $('#resNavIcon').removeClass('opened');
    $('.responsive-nav').removeClass('opened');
});
$('.project').hover(
    function() {
        $(this).removeClass('desaturate');
        $(this).find('.project-overlay').addClass('overlayed');
    }, function() {
        $(this).addClass('desaturate');
        $(this).find('.project-overlay').removeClass('overlayed');
    }
);

// Overlay Functionality
$('.web-project a').click(function(e){
    e.preventDefault();
    // Get the item ID
    var chosenItem = $(this).closest('.project').attr('id');
    // Change the URL of the Main Overlay Image to reflect the Thumbnail URL
    $('.overlay-img').attr('src','img/websites/desktops/'+chosenItem+'.png');
    // Get the Project Name
    var projectName = $('#'+chosenItem).find('.project-name').text();
    // Update the Project Name in the Overlay
    $('.main-overlay h2').text(projectName);
    // Get the Project Link
    var projectLink = $('#'+chosenItem).find('.project-link').attr('href');
    // Update the Project Link in the Overlay
    $('.main-overlay .view-details a').attr('href', projectLink);
    // Get the Project Description
    var projectDescription = $('#'+chosenItem).find('.project-description').text();
    // Update the Project Description
    $('.main-overlay p').text(projectDescription);
    // // Bring forth the Overlay!
    $('.main-overlay').addClass('opened');
    // // Stop Body Scroll
    $('body').addClass('no-scroll');
    // // Add $chosenItem
    $('.main-overlay').data('chosenItem', chosenItem);
    return false;
});

$('.close-me a').click(function(e) {
    e.preventDefault();
    $('body').removeClass('no-scroll');
    $('.main-overlay').removeClass('opened');
});
$(".fancy-gallery").fancybox({
    helpers : { overlay: { locked: false } },
    'autoScale' : true
});
// Navigation Variables
var navItems = $('.nav-item');
var navAbout = $('#navAbout a');
var navWeb = $('#navWeb a');
var navDesign = $('#navDesign a');
var navContact = $('#navContact a');

// Responsive Navigation Variables
var resNavAbout = $('#resNavAbout a');
var resNavWeb = $('#resNavWeb a');
var resNavDesign = $('#resNavDesign a');
var resNavContact = $('#resNavContact a');

// Section Variables
var sectionAbout = $('#sectionAbout');
var sectionWeb = $('#sectionWeb');
var sectionDesign = $('#sectionDesign');
var sectionContact = $('#sectionContact');

var tolerance = 250;

var scrollInit = function() {
    var scrollTop = $(this).scrollTop();

    // Fixing the Navigation
    var introSection = $('#sectionAbout');
    var introPos = $('#sectionAbout').offset().top;
    if (scrollTop > introPos) {
    	$('nav').addClass('fixed');
        $('.e-logo-wrapper').addClass('top-marker');
    } else {
    	$('nav').removeClass('fixed');
        $('.e-logo-wrapper').removeClass('top-marker');
    }
    // Fixing the Logo on Scroll
	var $fixedLogo = $('.e-logo-wrapper');
	var fixedPosition = ($fixedLogo.css('position') == 'fixed');

    var isMobile = $('.top-fix').css('width').replace('px','');

    if (isMobile < 564) {
        if ($(this).scrollTop() > 100 && !fixedPosition){
            $('.e-logo-wrapper').addClass('fixed-logo');
        }
        if ($(this).scrollTop() < 100 && fixedPosition)
        {
            $('.e-logo-wrapper').removeClass('fixed-logo');
        }
    } else {
        if ($(this).scrollTop() > 178 && !fixedPosition){
            $('.e-logo-wrapper').addClass('fixed-logo');
        }
        if ($(this).scrollTop() < 178 && fixedPosition)
        {
            $('.e-logo-wrapper').removeClass('fixed-logo');
        }
    }

	// Removing the Logo Background
	var logoHeight = $('.e-logo-wrapper').outerHeight()/2;
	var logoPosition = $('.e-logo-wrapper').position().top;
	var finalLogoPosition = logoHeight + logoPosition;
	var videoSectionHeight = $('.top-fix').height();

	var opacity = 0.8-(scrollTop/videoSectionHeight);
	var borderOpacity = 1-(scrollTop/videoSectionHeight);
	var logoScale = 1-(scrollTop/videoSectionHeight);

    if (scrollTop >= videoSectionHeight) {
    	$('.e-logo-wrapper').css({'background-color': 'rgba(255,255,255,0)', 'border': '10px solid rgba(34,34,34,0)', 'transform': 'scale3d(1, 1, 1)', '-webkit-transform': 'scale3d(1, 1, 1)', '-moz-transform': 'scale3d(1, 1, 1)'});
    	$('.e-side').addClass('test');
    } else if (scrollTop < videoSectionHeight) {
    	$('.e-logo-wrapper').css({'background-color': 'rgba(255,255,255,' +opacity+ ')', 'border': '10px solid rgba(34,34,34,' +borderOpacity+ ')', 'transform': 'scale3d('+logoScale+','+logoScale+','+logoScale+')', '-webkit-transform': 'scale3d('+logoScale+','+logoScale+','+logoScale+')', '-moz-transform': 'scale3d('+logoScale+','+logoScale+','+logoScale+')'});
    	$('.e-side').removeClass('test');
    }

    if (scrollTop >= sectionContact.position().top + tolerance || scrollTop + $(window).height() > $(document).height() - 25) {
    	$(navItems).removeClass('selected');
    	$(navContact).addClass('selected');
        $(resNavContact).addClass('selected');
    } else if (scrollTop >= sectionDesign.position().top + tolerance) {
    	$(navItems).removeClass('selected');
    	$(navDesign).addClass('selected');
        $(resNavDesign).addClass('selected');
    } else if (scrollTop >= sectionWeb.position().top + tolerance) {
    	$(navItems).removeClass('selected');
    	$(navWeb).addClass('selected');
        $(resNavWeb).addClass('selected');
    } else if (scrollTop >= sectionAbout.position().top + tolerance) {
    	$(navItems).removeClass('selected');
    	$(navAbout).addClass('selected');
        $(resNavAbout).addClass('selected');
    } else {
        $(navItems).removeClass('selected');
    }
}

$(window).scroll(scrollInit);
$(window).resize(scrollInit);
setTimeout(scrollInit, 1000);

// Initiate the Smooth Scroll
smoothScroll.init({
	speed: 500,
	easing: 'easeInOutQuad',
	offset: 0,
	updateURL: false,
	callbackBefore: function ( toggle, anchor ) {},
	callbackAfter: function ( toggle, anchor ) {}
});

// Menu Click Styling
$('.nav-item-wrap').click(function() {
	var clicked = $(this).parent('li');
	$('.nav-item').removeClass('selected');
	clicked.addClass('selected');
});