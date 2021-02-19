/* =====================================================================================================
INITIALIZATION
======================================================================================================== */
(async function() {
    // ===== Debugging Setup =====
    window['debug'] = false;
    // ===== Get Countries Info Status (for programming purposes) =====
    if (countriesInfoFunctions.returnCountriesInfo()) {

        debug_log(`${sizeof(localStorage.getItem('countriesInfo'))/ 1000000}MB`); // Display size of countriesInfo object (Should not exceed 5MB)
        debug_log(countriesInfoFunctions.returnCountriesInfo()); // Display starting status of countriesInfo object

    }

    // ===== Setup User's Home Lat/Lon Coordinates =====
    loadingScreen.updateStatusMessage('Requesting User Location...');

    // Returns lat from successful geolocation information request
    function returnLatLon() {

        return new Promise(function (resolve, reject) {

            function success(position) {
    
                let latLon = [];
    
                latLon[0] = position.coords.latitude;
                latLon[1] = position.coords.longitude;
    
                resolve(latLon);
    
            }
    
            function failure(err) {

                reject(err);
            
            }

            navigator.geolocation.getCurrentPosition(success, failure);

        }); 

    }

    // try and get the user's location
    try {

        let latLon = await returnLatLon();

        // Set lat and lon (if user gives access to information)
        window['homeLat'] = latLon[0];
        window['homeLon'] = latLon[1];
        // User's location isn't default (changed popup message for icon on map)
        window['defaultLocation'] = false;


    // if this fails, default to Glasgow, Scotland
    } catch (err) {

        window['homeLat'] = 55.863426;
        window['homeLon'] = -4.253078;

        window['defaultLocation'] = true;

    }     

    // ===== Initialize Current Date =====
    loadingScreen.updateStatusMessage('Establishing Current Date...');

    const currentDate = moment().format('DD/MM/YYYY');
    window['currentDate'] = currentDate;


    // ===== Initialization that relies on ready DOM
    $(document).ready(function () {
        // ===== Initialize App Once Page Has Loaded =====
        setup.initializeApp();

        // ===== Ensure App Height is Browser Height (mainly for problematic iOS Safari orientation bug) =====
        let resizeId;

        $(window).resize(function () {
            //clearTimeout(resizeId);
            //resizeId = setTimeout(resizePage, 300);
            resizePage();
        });

        function resizePage () {

            let width = $(window).width();
            let height = $(window).height();

            $('html, body').css('width', `${width}px`);
            $('html, body').css('min-height', `${height}px`);

        }

        $(window).trigger('resize');

    }); 
    
})();

/* =====================================================================================================
MAIN
======================================================================================================== */
$(document).ready(function () {
    /* ===================================================================================================
    Close Loading Screen
    ====================================================================================================== */
    // ===== Close loading screen when 'close' event is triggered =====
    let $loadingScreenContainer = $('.loadingScreenContainer');
    $loadingScreenContainer.on('close', function () {

        // ===== Make loading icon slide downwards out of page =====
        let $loadingIcon = $('.loadingAnimationContainer');
        $loadingIcon.addClass('animated fadeOutDownBig fast');

        // ===== Once slide animation has finished, fade out loading screen =====
        $loadingIcon.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {

            // ===== Trigger header image to bounce in from above =====
            // Hide header icon until loading screen has disappeared
            let $headerImage = $('.headerImageContainer');
            $headerImage.css('visibility', 'hidden');

            // Fade out loading screen
            let $loadingScreen = $('.loadingScreenContainer');
            $loadingScreen.fadeOut(300, function () {

                // Once loading screen has faded out, bounce in header image from above
                $headerImage.css('visibility', 'visible');
                $headerImage.addClass('animated bounceInDown');

                // Once bounce in animation has complete, remove it from header image
                $headerImage.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {

                    $headerImage.removeClass('animated bounceInDown');
                
                });

                // ===== Stop loading screen text animation from running =====
                try {

                    window['loadingTextAnimationController'].pause();

                } catch (err) {}
                
                
                // ===== Delete loading screen =====
                $loadingScreen.remove();
                window['loadingScreenActive'] = false;

            });
            
        });  

    });


    /* ===================================================================================================
    Determine User's Mode of Input
    ====================================================================================================== */
    let usingMouse = false;
    
    // Using Mouse
    $(document.documentElement).mousedown(function() {

        usingMouse = true;
    });

    // Using Tab
    $(document.documentElement).keydown(function(event) {

        if (event.keyCode === 9) {
            usingMouse = false;
    }
    });

    // Using Touch
    let tap = ('ontouchstart' in document.documentElement);

    /* =================================================================================================
    Interactivity Aids
    ==================================================================================================== */
    // ===== Highlight Interactive Element When Clicked =====
    let clickedElements = [
        'mapButton',
        'leaflet-control-zoom-in',
        'leaflet-control-zoom-out',
        'footerInfoButton',
        'footerSwitchButton',
    ];

    let clickedClassSelector = "";

    for (let i = 0; i < clickedElements.length; i++) {

        if (!(i == 0)) {

            clickedClassSelector += ', ';

        }

        clickedClassSelector += `.${clickedElements[i]}`;

    }

    $(clickedClassSelector).click(function () {

        let $clickedElement = $(this);

        $clickedElement.addClass('clicked');

        setTimeout(function () { $clickedElement.removeClass('clicked')}, 200);

    });

    let tabbedElements = [
        '#countries',
        '.searchButton',
        '.mapButton',
        '.footerInfoButton',
        '.footerSelect',
        '.footerSwitchButton'
    ];

    let tabbedClassSelector = "";

    for (let i = 0; i < tabbedElements.length; i++) {

        if (!(i == 0)) {

            tabbedClassSelector += ', ';

        }

        tabbedClassSelector += tabbedElements[i];

    }

    // ===== Highlight Interactive Element when user tabs =====
    $(tabbedClassSelector).focus(function() {

        if (usingMouse) {

            $(this).removeClass('tabbed');

        } else {

            $(this).addClass('tabbed');

        }

    });

    $(tabbedClassSelector).blur(function() {

        $(this).removeClass('tabbed');

    });

    /* =================================================================================================
    Header
    ==================================================================================================== */
    // ===== Animate Header Image When Clicked =====
    $('.headerImageContainer').click(function () {

        let leftOrRight = Math.floor(Math.random() * 2);

        if (leftOrRight) {

            $(this).addClass('spinRight');
            
        } else {

            $(this).addClass('spinLeft');

        }

        $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('spinRight spinLeft');
        });

    });

    // ===== Animate Header Title When Clicked =====
    $('.headerTextContainer').click(function () {

        $(this).addClass('animated rubberBand');
        $(this).one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
            $(this).removeClass('animated rubberBand');
        });

    });


    // ===== Countries Select =====
    // ===== Initiate 'search' =====
    // Trigger 'search' when searchField contains valid country
    $('#countries').change(function () { 

        let currentValue = $(this).val();

        let isoA2 = returnIsoA2FromCountryName(currentValue);
        let latLon = returnLatLonFromIsoA2(isoA2);
        let lat = latLon[0];
        let lon = latLon[1];
    
        $(this).trigger('search', [currentValue, lat, lon]);

    });

    // ===== Carry Out 'search' =====
    $('#countries').on('search', function (e, searchResult, lat, lon) {
        debug_log('Search initiated');

        let countriesInfo = countriesInfoFunctions.returnCountriesInfo();

        let countryBorder;

        try {

            countryBorder = countriesInfo['current']['countryBorder'];

        } catch (e) {

            countryBorder = false;

        }

        if (countryBorder) {

            let currentCountry = countryBorder['properties']['name'];

            if (currentCountry == searchResult) {

                debug_log('Search Event: Selected country is already current country');

                mapFunctions.focusOn('currentCountryFG');
    
                let classValue = $('.current.footerSelect').val();

                footer.changeActiveSection('current', classValue);
                footer.toggle(true);

                return;

            }

        }
        
        let currentCountryBorderUpdated = countriesInfoFunctions.updateProperty('countryBorder', 'current', {countryName: searchResult});
        
        if (currentCountryBorderUpdated) {

            window['currentLat'] = lat;
            window['currentLon'] = lon;

            setup.updateCurrent(true);

            mapFunctions.focusOn('currentCountryFG');
        
            let classValue = $('.current.footerSelect').val();

            footer.changeActiveSection('current', classValue);
            footer.toggle(true);

        }
        
    });

    /* =====================================================================================================
    Footer
    ======================================================================================================== */
    // ===== Setup defaultSection =====
    let $animatedFooterText = $('.defaultSection .ml6');
    let animatedFooterTextContent = $animatedFooterText.html();

    animatedFooterTextContent = animatedFooterTextContent.replace(/\S/g, "<span class='letter'>$&</span>");

    $animatedFooterText.html(animatedFooterTextContent);

    window['animatedFooterTextController'] = anime.timeline({loop: true})
    .add({
        targets: '.defaultSection .ml6 .letter',
        translateY: ["1.1em", 0],
        translateZ: 0,
        duration: 750,
        delay: (el, i) => 50 * i
    }).add({
        targets: '.defaultSection .ml6',
        opacity: 0,
        duration: 1000,
        easing: "easeOutExpo",
        delay: 1000
    });


    // ===== Setup Footer Slider =====
    let $footerInfoButton = $('.footerInfoButton');
    $footerInfoButton.click(function() {

        // Toggle footer to open/close
        footer.toggle();

    });

    // ===== Setup Footer Select ====
    // Setup within footerHeader so that active footer select changes between current and home. Otherwise, is bound only to home footer select
    let $footerHeader = $('.footerHeader');
    $footerHeader.click(function () {

        let $footerSelect = $('.footerSelect.active');
        $footerSelect.change(function () {
    
            let classValue = $(this).val();
    
            let type = ($(this).hasClass('home')) ? 'home' : 'current';
    
            footer.changeActiveSection(type, classValue);
    
        });
        

    });

    // ===== Setup Footer Switch Button =====
    let $footerSwitchButton = $('.footerSwitchButton');
    $footerSwitchButton.click(function () {

        $footerSwitchButton.prop('disabled', true);

        setTimeout(function () {
            $footerSwitchButton.prop('disabled', false);
        }, 500);

        let $activeFooterSection = $('.footerSection.active');

        if ($activeFooterSection.hasClass('home')) {

            let classValue = $('.current.footerSelect').val();

            footer.changeActiveSection('current', classValue);

        } else if ($activeFooterSection.hasClass('current')) {

            let classValue = $('.home.footerSelect').val();

            footer.changeActiveSection('home', classValue);

        } else {

            return;

        }

        let $newActiveFooterSection = $('.footerSection.active');
        let $footerInfoContainer = $('.footerInfoContainer');

        if (footer.footerIsOpen()) {

            $footerInfoContainer.removeClass('rotateRight');
            $newActiveFooterSection.removeClass('animated slideInLeft');
            setTimeout(function () {
                $footerInfoContainer.addClass('rotateRight');
                $footerInfoContainer.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                    $footerInfoContainer.removeClass('rotateRight');
                });
            }, 100);

        }
        
    });

});