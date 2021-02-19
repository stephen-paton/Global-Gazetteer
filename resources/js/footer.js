/* =====================================================================================================
FOOTER FUNCTIONS
======================================================================================================== */
let footer = function () {
    // ===== Helper Functions =====
    /* Return Currency To Flag Icon List ===============================================================
       Description: Returns a named list of currency code(key) : isoA2(value) pairs. Used in exchange section
                    to get relevant flag image. */
    function returnCurrencyToFlagIconList() {

        let currencyToIsoA2 = [];

        currencyToIsoA2['AED'] = 'ae';
        currencyToIsoA2['AFN'] = 'af';
        currencyToIsoA2['ALL'] = 'al';
        currencyToIsoA2['AMD'] = 'am';
        currencyToIsoA2['ANG'] = 'nl';
        currencyToIsoA2['AOA'] = 'ao';
        currencyToIsoA2['ARS'] = 'ar';
        currencyToIsoA2['AUD'] = 'au';
        currencyToIsoA2['AWG'] = 'aw';
        currencyToIsoA2['AZN'] = 'az';
        currencyToIsoA2['BAM'] = 'ba';
        currencyToIsoA2['BBD'] = 'bb';
        currencyToIsoA2['BDT'] = 'bd';
        currencyToIsoA2['BGN'] = 'bg';
        currencyToIsoA2['BHD'] = 'bh';
        currencyToIsoA2['BIF'] = 'bi';
        currencyToIsoA2['BMD'] = 'bm';
        currencyToIsoA2['BND'] = 'bn';
        currencyToIsoA2['BOB'] = 'bo';
        currencyToIsoA2['BRL'] = 'br';
        currencyToIsoA2['BSD'] = 'bs';
        currencyToIsoA2['BTC'] = 'btc';
        currencyToIsoA2['BTN'] = 'bt';
        currencyToIsoA2['BYN'] = 'by';
        currencyToIsoA2['BWP'] = 'bw';
        currencyToIsoA2['BZD'] = 'bz';
        currencyToIsoA2['CAD'] = 'ca';
        currencyToIsoA2['CDF'] = 'cd';
        currencyToIsoA2['CHF'] = 'ch';
        currencyToIsoA2['CLF'] = 'cl';
        currencyToIsoA2['CLP'] = 'cl';
        currencyToIsoA2['CNH'] = 'cn';
        currencyToIsoA2['CNY'] = 'cn';
        currencyToIsoA2['COP'] = 'co';
        currencyToIsoA2['CRC'] = 'cr';
        currencyToIsoA2['CUC'] = 'cu';
        currencyToIsoA2['CUP'] = 'cu';
        currencyToIsoA2['CVE'] = 'cv';
        currencyToIsoA2['CZK'] = 'cz';
        currencyToIsoA2['DJF'] = 'dj';
        currencyToIsoA2['DKK'] = 'dk';
        currencyToIsoA2['DOP'] = 'do'
        currencyToIsoA2['DZD'] = 'dz';
        currencyToIsoA2['EGP'] = 'eg';
        currencyToIsoA2['ERN'] = 'er';
        currencyToIsoA2['ETB'] = 'et';                    
        currencyToIsoA2['EUR'] = 'eu';
        currencyToIsoA2['FJD'] = 'fj';
        currencyToIsoA2['FKP'] = 'fk';
        currencyToIsoA2['GBP'] = 'gb';
        currencyToIsoA2['GEL'] = 'ge';
        currencyToIsoA2['GGP'] = 'gg';
        currencyToIsoA2['GHS'] = 'gh';
        currencyToIsoA2['GIP'] = 'gi';
        currencyToIsoA2['GMD'] = 'gm';
        currencyToIsoA2['GNF'] = 'gn';
        currencyToIsoA2['GTQ'] = 'gt';
        currencyToIsoA2['GYD'] = 'gy';
        currencyToIsoA2['HKD'] = 'hk';
        currencyToIsoA2['HNL'] = 'hn';
        currencyToIsoA2['HRK'] = 'hr';
        currencyToIsoA2['HTG'] = 'ht';
        currencyToIsoA2['HUF'] = 'hu';
        currencyToIsoA2['IDR'] = 'id';
        currencyToIsoA2['ILS'] = 'il';
        currencyToIsoA2['IMP'] = 'im';
        currencyToIsoA2['INR'] = 'in';
        currencyToIsoA2['IQD'] = 'iq';
        currencyToIsoA2['IRR'] = 'ir';
        currencyToIsoA2['ISK'] = 'is';
        currencyToIsoA2['JEP'] = 'je';
        currencyToIsoA2['JMD'] = 'jm';
        currencyToIsoA2['JOD'] = 'jo';
        currencyToIsoA2['JPY'] = 'jp';
        currencyToIsoA2['KES'] = 'ke';
        currencyToIsoA2['KGS'] = 'kg';
        currencyToIsoA2['KHR'] = 'kh';
        currencyToIsoA2['KMF'] = 'km';
        currencyToIsoA2['KPW'] = 'kp';
        currencyToIsoA2['KRW'] = 'kr';
        currencyToIsoA2['KWD'] = 'kw';
        currencyToIsoA2['KYD'] = 'ky';
        currencyToIsoA2['KZT'] = 'kz';
        currencyToIsoA2['LAK'] = 'la';
        currencyToIsoA2['LBP'] = 'lb';
        currencyToIsoA2['LKR'] = 'lk';
        currencyToIsoA2['LRD'] = 'lr';
        currencyToIsoA2['LSL'] = 'ls';
        currencyToIsoA2['LYD'] = 'ly';
        currencyToIsoA2['MAD'] = 'ma';
        currencyToIsoA2['MDL'] = 'md';
        currencyToIsoA2['MGA'] = 'mg';
        currencyToIsoA2['MKD'] = 'mk';
        currencyToIsoA2['MMK'] = 'mm';
        currencyToIsoA2['MNT'] = 'mn';
        currencyToIsoA2['MOP'] = 'mo';
        currencyToIsoA2['MRO'] = 'mr';
        currencyToIsoA2['MRU'] = 'mr';
        currencyToIsoA2['MUR'] = 'mu';
        currencyToIsoA2['MVR'] = 'mv';
        currencyToIsoA2['MWK'] = 'mw';
        currencyToIsoA2['MXN'] = 'mx';
        currencyToIsoA2['MYR'] = 'my';
        currencyToIsoA2['MZN'] = 'mz';
        currencyToIsoA2['NAD'] = 'na';
        currencyToIsoA2['NGN'] = 'ng';
        currencyToIsoA2['NIO'] = 'ni';
        currencyToIsoA2['NOK'] = 'no';
        currencyToIsoA2['NPR'] = 'np';
        currencyToIsoA2['NZD'] = 'nz';
        currencyToIsoA2['OMR'] = 'om';
        currencyToIsoA2['PAB'] = 'pa';
        currencyToIsoA2['PEN'] = 'pe';
        currencyToIsoA2['PGK'] = 'pg';
        currencyToIsoA2['PHP'] = 'ph';
        currencyToIsoA2['PKR'] = 'pk';
        currencyToIsoA2['PLN'] = 'pl';
        currencyToIsoA2['PYG'] = 'py';
        currencyToIsoA2['QAR'] = 'qa';
        currencyToIsoA2['RON'] = 'ro';
        currencyToIsoA2['RSD'] = 'rs';
        currencyToIsoA2['RUB'] = 'ru';
        currencyToIsoA2['RWF'] = 'rw';
        currencyToIsoA2['SAR'] = 'sa';
        currencyToIsoA2['SBD'] = 'sb';
        currencyToIsoA2['SCR'] = 'sc';
        currencyToIsoA2['SDG'] = 'sd';
        currencyToIsoA2['SEK'] = 'se';
        currencyToIsoA2['SGD'] = 'sg';
        currencyToIsoA2['SHP'] = 'sh';
        currencyToIsoA2['SLL'] = 'sl';
        currencyToIsoA2['SOS'] = 'so';
        currencyToIsoA2['SRD'] = 'sr';
        currencyToIsoA2['SSP'] = 'ss';
        currencyToIsoA2['STD'] = 'st';
        currencyToIsoA2['STN'] = 'st';
        currencyToIsoA2['SVC'] = 'sv';
        currencyToIsoA2['SYP'] = 'sy';
        currencyToIsoA2['SZL'] = 'sz';
        currencyToIsoA2['THB'] = 'th';
        currencyToIsoA2['TJS'] = 'tj';
        currencyToIsoA2['TMT'] = 'tm';
        currencyToIsoA2['TND'] = 'tn';
        currencyToIsoA2['TOP'] = 'to';
        currencyToIsoA2['TRY'] = 'tr';
        currencyToIsoA2['TTD'] = 'tt';
        currencyToIsoA2['TWD'] = 'tw';
        currencyToIsoA2['TZS'] = 'tz';
        currencyToIsoA2['UAH'] = 'ua';
        currencyToIsoA2['UGX'] = 'ug';
        currencyToIsoA2['USD'] = 'us';
        currencyToIsoA2['UYU'] = 'uy';
        currencyToIsoA2['UZS'] = 'uz';
        currencyToIsoA2['VEF'] = 've';
        currencyToIsoA2['VES'] = 've';
        currencyToIsoA2['VND'] = 'vn';
        currencyToIsoA2['VUV'] = 'vu';
        currencyToIsoA2['WST'] = 'ws';
        currencyToIsoA2['XAF'] = 'cf';
        currencyToIsoA2['XAG'] = 'silver';
        currencyToIsoA2['XAU'] = 'gold';
        currencyToIsoA2['XCD'] = 'ag';
        currencyToIsoA2['XDR'] = 'imf';
        currencyToIsoA2['XOF'] = 'bj';
        currencyToIsoA2['XPD'] = 'palladium';
        currencyToIsoA2['XPF'] = 'nc';
        currencyToIsoA2['XPT'] = 'platinum';
        currencyToIsoA2['YER'] = 'ye';
        currencyToIsoA2['ZAR'] = 'za';
        currencyToIsoA2['ZMW'] = 'zm';
        currencyToIsoA2['ZWL'] = 'zw';

        return currencyToIsoA2;

    }

    /* Return Footer Section Classes ===================================================================
       Description: Returns a list containing all valid footer sectionClass names. */
    function returnFooterSectionClasses() {

        let footerSectionClasses = [
            'defaultSection',
            'about',
            'exchange',
            'countryPOI',
            'localPOI',
            'localWeather',
            'countryWeather',
            'news',
            'covid'
        ];

        return footerSectionClasses;

    }

    /* Change Active Select ============================================================================
       Description: Change active footer select of specified type (home or current) and set it to optionValue.
                    Returns true if successful and false if not */
    function changeActiveSelect(type, optionValue) {

        // ===== Validate Inputs =====
        // Validate 'type'
        if (!((type == 'home') || (type == 'current'))) {

            debug_log('changeActiveSelect: Invalid type specified');
            return false;

        }

        // Validate 'optionValue' (select options and footer classes share same names)
        if (!(sectionClassIsValid(optionValue))) {

            debug_log('changeActiveSelect: Invalid optionValue specified');
            return false;

        }

        // ===== Check if option is in optionslist =====
        if (!(selectOptionsContain(type, optionValue))) {

            debug_log('changeActiveSelect: Select does not contain specified option');
            return false;

        }

        // ===== Get activeSelect and new activeSelect =====
        let $activeSelect = $('.footerSelect.active');
        let $newActiveSelect = $(`.footerSelect.${type}`);

        // ===== if new activeSelect is current activeSelect, then do nothing =====
        if ($activeSelect.is($newActiveSelect)) {

            $activeSelect.val(optionValue);
            return true;

        }

        // ===== make new activeSelect active and old activeSelect inactive =====
        $activeSelect.removeClass('active');
        $activeSelect.addClass('inactive');
        $activeSelect.fadeOut();

        $newActiveSelect.removeClass('inactive');
        $newActiveSelect.addClass('active');
        $newActiveSelect.val(optionValue); // Set optionValue of new activeSelect

        // ===== hide old activeSelect and show new activeSelect =====
        $activeSelect.hide();
        $newActiveSelect.show();

    }

    /* Select Options Contain ==========================================================================
        Description: Checks whether select option of type (home or current) contains the specified optionValue.
                    Returns true if so and false if not. */
    function selectOptionsContain(type, optionValue) {

        // ===== Validate Inputs =====
        // Validate 'type'
        if (!((type == 'home') || (type == 'current'))) {

            debug_log('selectOptionsContain: Invalid type specified');
            return false;

        }

        // ===== Determine how many select options match input parameters (1 means match, 0 means no match) =====
        let $footerSelectOptions = $(`.${type}.footerSelect option`);

        let numberOfMatches = $footerSelectOptions.filter(function () {
            
            return $(this).val() == optionValue;

        }).length;

        if (numberOfMatches) {

            return true;

        }

        return false;

    }

    /* Add Select Option ===============================================================================
       Description: Adds the specified select option to the relevant (home or current) options select element.
                    Returns true if successful and false if not. */
    function addSelectOption(type, section, name = section) {

        // ===== Validate Inputs =====
        // Validate 'type'
        if (!(type == 'home' || type == 'current')) {

            debug_log('addSelectOption: Invalid type specified');
            return false;

        }

        // ===== Create select option using inputs =====
        let option = `
            <option value="${section}">${capitalizeFirstLetter(name)}</option>
        `;

        // ===== if select option doesn't already exist, add to options select element
        if (!(selectOptionsContain(type, section))) {

            let $footerSelect = $(`.${type}.footerSelect`);

            $footerSelect.append(option);

            const currentOption = $footerSelect.val();

            // Sort Updated Options
            let $options = $footerSelect.find('option');

            let $sorted_options = $options.remove().sort((a, b) => {

                let at = $(a).text(); 
                let bt = $(b).text();

                let returnValue = 0;

                if (at > bt) {

                    returnValue = 1;

                } else if (at < bt) {

                    returnValue = -1;

                }

                return returnValue;
                
            });

            $footerSelect.append($sorted_options);

            // Reset to correct current option
            $footerSelect.val(currentOption);

        }

        return true;

    }

    /* Footer Is Open ==================================================================================
       Description: Determines if the footer is currently open. Returns true if so and false if not. */
    function footerIsOpen() {

        let $footer = $('footer');

        let footerIsOpen = $footer.hasClass('fullWidth');

        return footerIsOpen;

    }

    /* Update Footer Section ===========================================================================
       Description: Updates selected footer section. Returns true if successful and false if not. */
    function updateFooterSection(type, sectionClass) {

        // ===== Validate Inputs =====
        // validate 'type'
        if (!(type == 'home' || type == 'current')) {

            debug_log('updateFooterSection: Invalid type specified');
            return false;

        }

        // validate 'sectionClass'
        if (!(sectionClassIsValid(sectionClass))) {

            debug_log('Invalid section class specified')
            return false;
        }

        // ===== Create and Add Relevant Section =====
        switch (sectionClass) {

            case 'about':
                return updateAboutSection(type);
            case 'exchange':
                return updateExchangeRatesSection(type);
            case 'countryPOI':
                return updateCountryPOISection(type);
            case 'localPOI':
                return updateLocalPOISection(type);
            case 'localWeather':
                return updateLocalWeatherSection(type);
            case 'countryWeather':
                return updateCountryWeatherSection(type);
            case 'covid':
                return updateCovidSection(type);
            case 'news':
                return updateNewsSection(type);
            default:
                return false;

        }

    }

    /* Clear Footer Sections ===========================================================================
       Description: Removes all footer sections from the relevant footer (home or current). */
    function clearFooterSections(type) {

        let $footerSections = $(`.footerSection.${type}`);

        if ($footerSections) {

            $footerSections.remove();

        }

    }

    /* Clear Select Options ============================================================================
       Description: Removes all select options from relevant options select element (home or current). */
    function clearSelectOptions(type) {

        let $footerSelectOptions = $(`.footerSelect.${type} option`);

        if ($footerSelectOptions) {

            $footerSelectOptions.remove();

        }

    }

    // ===== Update Footer Sections =====
    /* Update About Section ============================================================================
       Description: Updates the content in the about footer section of the relevant type (home or current) and adds to the footer.
                    Returns true if successful and false if not. */
    function updateAboutSection(type) {

        if (!(type == 'home' || type == 'current')) {

            debug_log('updateAboutSection: Invalid type specified');
            return false;

        }

        let countriesInfo = countriesInfoFunctions.returnCountriesInfo();
        let countryBorder = countriesInfo[type]['countryBorder'];
        let countryIsoA2 = countryBorder['properties']['iso_a2'];
        let restCountries = countriesInfo['restCountries'];

        let countryRestData;

        for (let i = 0; i < restCountries.length; i++) {

            let restCountriesIsoA2 = restCountries[i]['alpha2Code'];

            if (restCountriesIsoA2 == countryIsoA2) {

                countryRestData = restCountries[i];
                break;

            }

        }

        if (!(countryRestData)) {

            debug_log(`updateAboutSection: '${type}' country is not present in the REST data object`);
            return false;
        
        }

        let flagImage = `resources/images/flags/${countryIsoA2.toLowerCase()}.png`;
        let name = countryBorder['properties']['name'];
        let region = countryRestData['region'];
        let subregion = countryRestData['subregion'];
        let capital = countryRestData['capital'];
        let population = countryRestData['population'];
        let restLanguages = countryRestData['languages'];

        let languages = "";
        for (let i = 0; i < restLanguages.length; i++) {

            languages += restLanguages[i]['name'];

            if (i < restLanguages.length - 1) {

                languages += '<br>';

            }

        }

        let aboutSectionContent = `
        <h3 class="sectionHeader"><img class="tableImage" src=${flagImage}> ${name}</h3>
        <div class="tableContainer">
            <table class="aboutTable">
                <tr>
                    <td>Region:</td>
                    <td>${region}</td>
                </tr>
                <tr>
                    <td>Subregion:</td>
                    <td>${subregion}</td>
                </tr>
                <tr>
                    <td>Capital:</td>
                    <td>${capital}</td>
                </tr>
                <tr>
                    <td>Population:</td>
                    <td>${numberWithCommas(population)}</td>
                </tr>
                <tr>
                    <td>Languages:</td>
                    <td>${languages}</td>
                </tr>
            </table>
        </div>
        `;

        let $aboutSection = $(`.about.${type}`);

        $aboutSection.html(aboutSectionContent);

        addSelectOption(type, 'about');

        return true;

    }

    /* Update Exchange Rates Section ===================================================================
       Description: Updates the content in the exchange rates footer section of the relevant type (home or current) and adds to the footer.
                    Returns true if successful and false if not. */
    function updateExchangeRatesSection(type) {

        if (!(type == 'home' || type == 'current')) {

            debug_log('updateExchangeRatesSection: Invalid type specified');
            return false;

        }

        let countriesInfo = countriesInfoFunctions.returnCountriesInfo();
        let countryBorder = countriesInfo[type]['countryBorder'];
        let isoA2 = countryBorder['properties']['iso_a2'];
        let restCountries = countriesInfo['restCountries'];

        let currencyName;
        let currencySymbol;
        let countryCode;
        
        for (let i = 0; i < restCountries.length; i++) {

            let restIsoA2 = restCountries[i]['alpha2Code'];

            if (restIsoA2 == isoA2) {

                currencyName = restCountries[i]['currencies'][0]['name'];
                currencySymbol = restCountries[i]['currencies'][0]['symbol'];
                countryCode = restCountries[i]['currencies'][0]['code'];

                break;

            }

        }

        if (currencySymbol) {

            currencyName = `${currencyName} (${currencySymbol})`;

        }

        let currencies = countriesInfo['currencies'];
        let currencyToIsoA2List = returnCurrencyToFlagIconList();
        let usdToLocal = 1 / currencies[countryCode];
        let exchangeSectionInnerContent = "";

        for (let currency in currencyToIsoA2List) {

            // Skip Home/Current Currency
            if (countryCode == currency) {

                continue;

            }

            // Skip Values that aren't in currencies
            if (!currencies[currency]) {

                continue;

            }

            // Setup Currency Display
            const localExchangeRate = usdToLocal * currencies[currency];
            const decimalDisplay = numberWithCommas(localExchangeRate.toFixed(2));
            const scientificDisplay = numberWithCommas(parseFloat(localExchangeRate.toPrecision(2)));
            const currencyDisplay = (localExchangeRate < 0.005) ? scientificDisplay : decimalDisplay;

            // Append to Exchange Section Inner Content
            exchangeSectionInnerContent += `
                <tr>
                    <td><img src="resources/images/flags/${currencyToIsoA2List[currency]}.png"></img></td>
                    <td>${currency}</td>
                    <td>${currencyDisplay}</td>
                </tr>
            `;

        }

        let flag = isoA2.toLowerCase();

        let exchangeSectionContent = `
            <h3 class="sectionHeader">Exchange Rates</h3>
            <h4>Currency</h4>
            <p>${currencyName}<p>
            <h4>Conversion Rates</h4>
            <div class="tableContainer">
                <table class="currencyTable fullWidth">
                    <tr>
                    <th rowspan="2">Flag</th>
                    <th rowspan="2">Currency</th>
                    <th><img src="resources/images/flags/${flag}.png"></th>
                    </tr>
                    <tr>
                    <th>${countryCode}</th>
                    </tr>
                    <tr>
                        <td><img src="resources/images/flags/${flag}.png"></td>
                        <td>${countryCode}</td>
                        <td>1.00</td>
                    </tr>
                    ${exchangeSectionInnerContent}
                </table>
            </div>
        `;

        let $exchangeSection = $(`.exchange.${type}`);
        $exchangeSection.html(exchangeSectionContent);

        addSelectOption(type, 'exchange', 'Exchange Rates');

        return true;

    }

    /* Update Country POI Section ======================================================================
       Description: Updates the content in the country POI footer section of the relevant type (home or current) and adds to the footer.
                    Returns true if successful and false if not. */
    function updateCountryPOISection(type) {

        if (!(type == 'home' || type == 'current')) {

            debug_log('updateCountryPOISection: Invalid type specified');
            return false;

        }

        let countriesInfo = countriesInfoFunctions.returnCountriesInfo();
        let countryPOI = countriesInfo[type]['countryPOI']['geonames'];

        let countryPOISectionInnerContent = "";
        
        for (let i = 0; i < countryPOI.length; i++) {

            let title = countryPOI[i]['title'];
            let summary = countryPOI[i]['summary'];
            let wikiURL = 'https://';
            wikiURL += countryPOI[i]['wikipediaUrl'];
            let thumbnail = countryPOI[i]['thumbnailImg'];
            let thumbnailImage = (thumbnail == undefined) ? "" : `<img class="thumbnail" src="${thumbnail}"></img>`;

            countryPOISectionInnerContent += `
                <div class="infoBlock">
                    <div class="tab">
                        ${thumbnailImage}
                        <p class="number">${i+1}</p>
                    </div>
                    <h4 class="title">${title}</h4>
                    <p class="summary">${summary}</p>
                    <button type="button" class="linkButton" onclick="window.open('${wikiURL}')">Read On</button>
                </div>
            `;

        }

        let countryPOISectionContent = `
            <h3 class="sectionHeader">Points of Interest In/Near Country</h3>
            ${countryPOISectionInnerContent}
        `;

        let $countryPOISection = $(`.countryPOI.${type}`);
        $countryPOISection.html(countryPOISectionContent);

        addSelectOption(type, 'countryPOI', 'Points of Interest In/Near Country');

        return true;

    }

    /* Update Local POI Section ========================================================================
       Description: Updates the content in the local POI footer section of the relevant type (home or current) and adds to the footer.
                    Returns true if successful and false if not. */
    function updateLocalPOISection(type) {

        if (!(type == 'home' || type == 'current')) {

            debug_log('updateLocalPOISection: Invalid type specified');
            return false;

        }

        let countriesInfo = countriesInfoFunctions.returnCountriesInfo();
        let localPOI = countriesInfo[type]['localPOI']['geonames'];

        let localPOISectionInnerContent = "";

        for (let i = 0; i < localPOI.length; i++) {

            let title = localPOI[i]['title'];
            let summary = localPOI[i]['summary'];
            let wikiURL = 'https://';
            wikiURL += localPOI[i]['wikipediaUrl'];
            let thumbnail = localPOI[i]['thumbnailImg'];
            let thumbnailImage = (thumbnail == undefined) ? "" : `<img class="thumbnail" src="${thumbnail}"></img>`;

            localPOISectionInnerContent += `
                <div class="infoBlock">
                    <div class="tab">
                        ${thumbnailImage}
                        <p class="number">${i+1}</p>
                    </div>
                    <h4 class="title">${title}</h4>
                    <p class="summary">${summary}</p>
                    <button type="button" class="linkButton" onclick="window.open('${wikiURL}')">Read On</button>
                </div>
            `;

        }

        let localPOISectionContent = `
            <h3 class="sectionHeader">Points of Interest Near Home Location</h3>
            ${localPOISectionInnerContent}
        `;

        let $localPOISection = $(`.localPOI.${type}`);
        $localPOISection.html(localPOISectionContent);

        addSelectOption(type, 'localPOI', 'Points of Interest Near Home Location');

        return true;  

    }

    /* Update Weather at Home Location Section ====================================================================
       Description: Updates the content in the Weather at Home Location footer section of the relevant type (home or current) and adds to the footer.
                    Returns true if successful and false if not. */
    function updateLocalWeatherSection(type) {

        if (!(type == 'home' || type == 'current')) {

            debug_log('updateLocalWeatherSection: Invalid type specified');
            return false;

        }

        let countriesInfo = countriesInfoFunctions.returnCountriesInfo();
        let localWeather = countriesInfo[type]['localWeather'];

        // Day Table Content
        let weatherTimeContent = "", weatherImageContent = "", weatherStatusContent = "", weatherTemperatureContent = "";

        let hourly = localWeather['hourly'];
        let unixOffset = localWeather['timezone_offset'];

        for (let i = 0; i < hourly.length; i++) {

            // Weather Time Content
            let unixTimestamp = hourly[i]['dt'];
            let timestamp = moment.unix(unixTimestamp + unixOffset);
            let hourAndMinute = timestamp.format('HH:mm');

            weatherTimeContent += `<td>${hourAndMinute}</td>`;

            // Weather Image Content
            let image = hourly[i]['weather'][0]['icon'];

            weatherImageContent += `<td><img src="resources/images/weather/${image}.png"></td>`;

            // Weather Status Content
            let status = hourly[i]['weather'][0]['description'];

            weatherStatusContent += `<td>${status}</td>`;

            // Weather Temperature Content
            let temperatureDegreesC = (hourly[i]['temp'] - 273.15).toFixed(0);

            weatherTemperatureContent += `<td>${temperatureDegreesC}&#176;C</td>`;

        }

        // Week Table Content
        let weekTableContent = "";

        let daily = localWeather['daily'];

        for (let i = 0; i < daily.length; i++) {

            // Day
            let unixTimestamp = daily[i]['dt'];
            let timestamp = moment.unix(unixTimestamp);

            let day = timestamp.format('dddd');

            // Image
            let image = daily[i]['weather'][0]['icon'];

            // Status
            let status = daily[i]['weather'][0]['description'];

            // Temperature
            let temperatureDegreesC = (daily[i]['temp']['day'] - 273.15).toFixed(0); 

            weekTableContent += `
                <tr>
                    <td>${day}</td>
                    <td><img src="resources/images/weather/${image}.png"></td>
                    <td>${status}</td>
                    <td>${temperatureDegreesC}&#176;C</td>
                </tr>
            `;

        }
        
        // Weather at Home Location Section Content
        let localWeatherSectionContent = `
            <h3 class="sectionHeader">Weather at Home Location</h3>
            <h4>Hourly</h4>
            <div class="tableContainer">
                <table class="dayTable fullWidth">
                    <tr class="weatherTime">
                        ${weatherTimeContent}
                    </tr>
                    <tr class="weatherImage">
                        ${weatherImageContent}
                    </tr>
                    <tr class="weatherStatus">
                        ${weatherStatusContent}
                    </tr>
                    <tr class="weatherTemperature">
                        ${weatherTemperatureContent}
                    </tr>
                </table>
            </div>
            <h4>Daily</h4>
            <div class="tableContainer">
                <table class="weekTable fullWidth">
                    ${weekTableContent}
                </table>
            </div>
        `;
       
        let $localWeatherSection = $(`.localWeather.${type}`);
        $localWeatherSection.html(localWeatherSectionContent);

        addSelectOption(type, 'localWeather', 'Weather at Home Location');

        return true;  

    }

    /* Update Country Weather Section ==================================================================
       Description: Updates the content in the country weather footer section of the relevant type (home or current) and adds to the footer.
                    Returns true if successful and false if not. */
    function updateCountryWeatherSection(type) {

        if (!(type == 'home' || type == 'current')) {

            debug_log('updateCountryWeatherSection: Invalid type specified');
            return false;

        }

        let countriesInfo = countriesInfoFunctions.returnCountriesInfo();
        let countryWeather = countriesInfo[type]['countryWeather']['weatherObservations'];

        let countryWeatherSectionInnerContent = "";

        for (let i = 0; i < countryWeather.length; i++) {

            let stationName = countryWeather[i]['stationName'];
            let clouds = countryWeather[i]['clouds'];
            let weatherCondition = countryWeather[i]['weatherCondition'];
            let humidity = countryWeather[i]['humidity'];
            let temperature = countryWeather[i]['temperature'];
            let windDirection = countryWeather[i]['windDirection'];
            let windSpeed = countryWeather[i]['windSpeed'];
            let stationLat = countryWeather[i]['lat'].toFixed(6);
            let stationLon = countryWeather[i]['lng'].toFixed(6);
            let datetime = new Date(countryWeather[i]['datetime']);
            let dateRecorded = moment(datetime).format('DD/MM/YYYY');
            let timeRecorded = moment(datetime).format('HH:mm:ss');

            let weatherIcon;

            function cloudImage() {

                switch (clouds) {

                    case 'n/a':
                    case 'clear sky':
                    case 'no clouds detected':
                    case 'nil significant cloud':
                    case 'vertical visibility':
                        weatherIcon = 'Clear';
                        return;
                    case 'few clouds':
                    case 'scattered clouds':
                    case 'broken clouds':
                        weatherIcon = 'Broken';
                        return;
                    case 'overcast':
                    case 'clouds and visibility OK':
                        weatherIcon = 'Cloudy';
                        return;
                    default:
                        weatherIcon = 'Clear';
                        return;

                }

            }
            
            switch (weatherCondition) {

                case 'drizzle':
                case 'showers':
                case 'partial':
                case 'hail':
                case 'small hail/snow pellets':
                    weatherIcon = 'Showers';
                    break;
                case 'rain':
                case 'unknown precipitation':
                    weatherIcon = 'Rain';
                    break;
                case 'snow':
                case 'snow grains':
                case 'ice crystals':
                case 'ice pellets':
                    weatherIcon = 'Snow';
                    break;
                case 'mist':
                case 'fog':
                case 'smoke':
                case 'volcanic ash':
                    weatherIcon = 'Fog';
                    break;
                case 'tornado/waterspout':
                    weatherIcon = 'Tornado';
                    break;
                case 'thunderstorm':
                    weatherIcon = 'Thunder';
                    break;
                case 'n/a':
                default:
                    cloudImage();
                    break;

            }

            countryWeatherSectionInnerContent += `
                <h4><img class="tableImage" src="resources/images/markers/${type}${weatherIcon}.png"> ${stationName}</h4>
                <div class="tableContainer">
                    <table class="countryWeatherTable fullWidth">
                        <tr>
                            <td>Clouds:</td>
                            <td>${clouds}</td>
                        </tr>
                        <tr>
                            <td>Weather Condition:</td>
                            <td>${weatherCondition}</td>
                        </tr>
                        <tr>
                            <td>Humidity:</td>
                            <td>${humidity}</td>
                        </tr>
                        <tr>
                            <td>Temperature:</td>
                            <td>${temperature}&#176;C</td>
                        </tr>
                        <tr>
                            <td>Wind Direction:</td>
                            <td>${windDirection}&#176;</td>
                        </tr>
                        <tr>
                            <td>Wind Speed:</td>
                            <td>${windSpeed} knots</td>
                        </tr>
                        <tr>
                            <td>Station Latitude:</td>
                            <td>${stationLat}</td>
                        </tr>
                        <tr>
                            <td>Station Longitude:</td>
                            <td>${stationLon}</td>
                        </tr>
                        <tr>
                            <td>Date Recorded:</td>
                            <td>${dateRecorded}</td>
                        </tr>
                        <tr>
                            <td>Time Recorded:</td>
                            <td>${timeRecorded}</td>
                        </tr>
                    </table>
                </div>
            `;

        }

        let countryWeatherSectionContent = `
            <h3 class="sectionHeader">Weather</h3>
            ${countryWeatherSectionInnerContent}
        `;

        let $countryWeatherSection = $(`.countryWeather.${type}`);
        $countryWeatherSection.html(countryWeatherSectionContent);

        addSelectOption(type, 'countryWeather', 'Weather');

        return true;  

    }

    /* Update Covid Section ============================================================================
       Description: Updates the content in the covid footer section of the relevant type (home or current) and adds to the footer.
                    Returns true if successful and false if not. */
    function updateCovidSection(type) {

        if (!(type == 'home' || type == 'current')) {

            debug_log('updateCovidSection: Invalid type specified');
            return false;

        }

        let countriesInfo = countriesInfoFunctions.returnCountriesInfo();
        let covid = countriesInfo[type]['covid']['data'];

        let covidSectionInnerContent = "";

        for (let i = 0; i < covid.length; i++) {

            let lat = parseFloat(covid[i]['region']['lat']);
            let lon = parseFloat(covid[i]['region']['long']);

            if (isNaN(lat) || isNaN(lon)) {

                continue;

            }

            let province = covid[i]['region']['province']; 
            let name = covid[i]['region']['name'];
            name = (province == "") ? name : `${name} - ${province}`; 
            let activeCases = covid[i]['active'];
            let activeDifference = covid[i]['active_diff'];
            let confirmedCases = covid[i]['confirmed'];
            let confirmedDifference = covid[i]['confirmed_diff'];
            let recoveries = covid[i]['recovered'];
            let recoveriesDifference = covid[i]['recovered_diff'];
            let deaths = covid[i]['deaths'];
            let deathsDifference = covid[i]['deaths_diff'];
            let fatalityRate = covid[i]['fatality_rate'];
            let datetime = new Date(covid[i]['last_update']);
            let dateUpdated = moment(datetime).format('DD/MM/YYYY');
            let timeUpdated = moment(datetime).format('HH:mm:ss');

            covidSectionInnerContent += `
                <h4>${name}</h4>
                <div class="tableContainer">
                    <table class="covidTable fullWidth">
                        <tr>
                            <td>Active Cases:</td>
                            <td>${numberWithCommas(activeCases)} <span class="${positiveOrNegative(activeDifference, false)}">(${numberWithCommas(activeDifference)})</span></td>
                        </tr>
                        <tr>
                            <td>Confirmed Cases:</td>
                            <td>${numberWithCommas(confirmedCases)} <span class="${positiveOrNegative(confirmedDifference, false)}">(${numberWithCommas(confirmedDifference)})</span></td>
                        </tr>
                        <tr>
                            <td>Recoveries:</td>
                            <td>${numberWithCommas(recoveries)} <span class="${positiveOrNegative(recoveriesDifference, true)}">(${numberWithCommas(recoveriesDifference)})</span></td>
                        </tr>
                        <tr>
                            <td>Deaths:</td>
                            <td>${numberWithCommas(deaths)} <span class="${positiveOrNegative(deathsDifference, false)}">(${numberWithCommas(deathsDifference)})</span></td>
                        </tr>
                        <tr>
                            <td>Fatality Rate:</td>
                            <td>${fatalityRate}</td>
                        </tr>
                        <tr>
                            <td>Date Updated:</td>
                            <td>${dateUpdated}</td>
                        </tr>
                        <tr>
                            <td>Time Updated:</td>
                            <td>${timeUpdated}</td>
                        </tr>
                    </table>
                </div>
            `;

        }

        let covidSectionContent = `
            <h3 class="sectionHeader"><img class="tableImage" src="resources/images/markers/${type}Covid.png"> Covid Statistics</h3>
            ${covidSectionInnerContent}
        `;
        
        let $covidSection = $(`.covid.${type}`);
        $covidSection.html(covidSectionContent);

        addSelectOption(type, 'covid', 'Covid Statistics');

        return true; 

    }

    /* Update News Section =============================================================================
       Description: Updates the content in the news footer section of the relevant type (home or current) and adds to the footer.
                    Returns true if successful and false if not. */
    function updateNewsSection(type) {

        if (!(type == 'home' || type == 'current')) {

            debug_log('updateNewsSection: Invalid type specified');
            return false;

        }

        let countriesInfo = countriesInfoFunctions.returnCountriesInfo();
        let news = countriesInfo[type]['news']['value'];

        let newsSectionInnerContent = "";

        for (let i = 0; i < news.length; i++) {

            let title = news[i]['title'];
            let source = news[i]['provider']['name'];
            let datetime = new Date(news[i]['datePublished']);
            let date = moment(datetime).format('DD/MM/YYYY');
            let time = moment(datetime).format('HH:mm:ss');
            let summary = news[i]['description'];
            let url = news[i]['url'];
            let thumbnail = news[i]['image']['thumbnail'];
            let thumbnailImage = (thumbnail == "") ? "" : `<img class="thumbnail" src="${thumbnail}"></img>`;

            newsSectionInnerContent += `
                <div class="infoBlock">
                    <div class="tab">
                        ${thumbnailImage}
                        <p class="number">${i+1}</p>
                    </div>
                    <h4 class="title">${title}</h4>
                    <p class="datetime">by ${source} | ${date} at ${time}</p>
                    <p class="summary">${summary}</p>
                    <button type="button" class="linkButton" onclick="window.open('${url}')">Read On</button>
                </div>
            `;

        }

        let newsSectionContent = `
            <h3 class="sectionHeader">News</h3>
            ${newsSectionInnerContent}
        `;
        
        let $newsSection = $(`.news.${type}`);
        $newsSection.html(newsSectionContent);

        addSelectOption(type, 'news', 'News');

        return true;

    }

    // ===== Exported Functions =====
    /* Add Footer Section ==============================================================================
       Description: Creates a footer section and adds it to footer. Returns true if successful and false if not. */
       function addFooterSection(type, sectionClass) {

        // ===== Validate Inputs =====
        // Validate 'type'
        if (!((type == 'home') || (type == 'current'))) {

            debug_log("addFooterSection: Invalid 'type' specified");
            return false;

        }

        // Validate 'sectionClass'
        if (!(sectionClassIsValid(sectionClass))) {

            debug_log('addFooterSection: Invalid section class specified');
            return false;
        }

        // ===== Generate footer section and add to footer =====
        let footerSection = `<div class="${type} ${sectionClass} footerSection fullWidth inactive"></div>`;
        let $footerInfoContainer = $('.footerInfoContainer');

        $footerInfoContainer.append(footerSection);

        // ===== Populate generated footer section with content. If this fails, delete generated footer section =====
        if (!(updateFooterSection(type, sectionClass))) {

            let $footerSection = $(`.${type}.${sectionClass}`);
            $footerSection.remove();

            return false;

        }

        // ===== If footer has multiple sections, make select button visible =====
        let $activeFooterSelect = $('.footerSelect.active');

        if (!$activeFooterSelect.is(':visible')) {

            let numberOfLoadedFooterSections = $('.footerSelect.active option').length;

            if (numberOfLoadedFooterSections) {

                let $footerInfoButton = $('.footerInfoButton');

                $activeFooterSelect.fadeIn();
                $footerInfoButton.removeClass('selectNotPresent');
                $footerInfoButton.addClass('selectPresent');

            }

        }

        // ===== If footer has current section, make switch button visible
        let $footerSwitchButton = $('.footerSwitchButton');

        if (!$footerSwitchButton.is(':visible')) {

            let numberOfLoadedCurrentFooterSections = $('.current option').length;

            if (numberOfLoadedCurrentFooterSections) {

                $footerSwitchButton.fadeIn();

            }

        }

        return true;

    }

    /* Update Footer Info Button =======================================================================
       Description: Update the content of the footer info button and its type (home or current) */
       function updateFooterInfoButton(type) {

        if (!(type == 'home' || type == 'current')) {

            debug_log('updateFooterInfoButton: Invalid type specified');
            return false;

        }

        let countriesInfo = countriesInfoFunctions.returnCountriesInfo();
        let countryBorder = countriesInfo[type]['countryBorder'];
        let country = countryBorder['properties']['name'];
        let isoA2 = countryBorder['properties']['iso_a2'];
        let flagImage = `resources/images/flags/${isoA2.toLowerCase()}.png`;

        let locationInfo = `
            <img class="pulltabIcon home" src="resources/images/icons/${type}.png" alt="${capitalizeFirstLetter(type)} Icon"> ${country} <img class="pulltabImage" src=${flagImage} alt="${country} Flag">
        `;

        let $footerInfoButtonLocationInfo = $('.footerInfoButton .locationInfo');

        $footerInfoButtonLocationInfo.html(locationInfo);

    }

    /* Change Active Section ===========================================================================
       Description: Change active footer section. */
       function changeActiveSection(type, newSectionClass) {

        // ===== Validate Inputs =====
        // Validate 'type'
        if (!((type == 'home') || (type == 'current'))) {

            debug_log('changeActiveSection: Invalid type specified');
            return;

        }

        // Validate 'newSectionClass'
        if (!(sectionClassIsValid(newSectionClass))) {

            debug_log('changeActiveSection: Invalid newSectionClass specified');
            return;

        }

        let $activeSection = $('.footerSection.active');
        let $newActiveSection = $(`.${newSectionClass}.${type}`);

        // if active section has changed
        if (!($newActiveSection.is($activeSection))) {

            // make active section inactive
            $activeSection.removeClass('active');
            $activeSection.addClass('inactive');

            // if the new section isn't available, default to the about section
            if (!(selectOptionsContain(type, newSectionClass))) {

                $newActiveSection = $(`.inactive.${type}.about`);

            }

            // make new active section active
            $newActiveSection.addClass('active');
            $newActiveSection.removeClass('inactive');

            // scroll footer to top of new section (stops scroll height of previous section from influencing new section)
            $('.footerInfoContainer').scrollTop(0);

        }

        // remove animations from previous active section (means that animations will trigger on this element the next time it becomes active)
        $activeSection.removeClass('animated slideInLeft');

        // stop default section text from animating when inactive
        if ($activeSection.is($('.defaultSection'))) {

            try {

                window['animatedFooterTextController'].pause();

            } catch (err) {}

        }

        // make default section text animate when active
        if ($newActiveSection.is($('.defaultSection'))) {

            window['animatedFooterTextController'].play();

        }

        // if footer is open, animate new section
        if (footerIsOpen()) {

            // make new active footer section slide in from the left if footer is open
            $newActiveSection.addClass('animated slideInLeft');
            $newActiveSection.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
                $newActiveSection.removeClass('animated slideInLeft');
            });

        }

        // make footer switch button visible if 'current' select options exist
        let numberOfCurrentSelectOptions = $('.current.footerSelect option').length;

        if (numberOfCurrentSelectOptions) {

            let $footerSwitchButton = $('.footerSwitchButton').fadeIn();

        }
        
        // make select option coincide with active section and update footer info button content
        changeActiveSelect(type, newSectionClass);
        updateFooterInfoButton(type);

        let $footerSwitchButton = $('.footerSwitchButton');

        if (type == 'home') {

            $footerSwitchButton.removeClass('current');
            $footerSwitchButton.addClass('home');

        } else {

            $footerSwitchButton.removeClass('home');
            $footerSwitchButton.addClass('current');

        }

        // Toggle the Footer Open for certain section classes
        switch(newSectionClass) {

            case 'about':
            case 'exchange':
            case 'localWeather':
            case 'news':
                toggle(true);
                break;

        }



        // Determine which FG the map should display
        let notType = (type == 'home') ? 'current' : 'home';
        switch (newSectionClass) {

            case 'countryPOI':
                // Country POI
                mapFunctions.show(`${type}CountryPOI_FG`);
                mapFunctions.hide(`${notType}CountryPOI_FG`);
                // Local POI
                mapFunctions.hide(`${type}LocalPOI_FG`);
                mapFunctions.hide(`${notType}LocalPOI_FG`);
                // Country Marker
                mapFunctions.hide(`${type}CountryMarker`);
                // Weather
                mapFunctions.hide(`${type}WeatherFG`);
                mapFunctions.hide(`${notType}WeatherFG`);
                // Covid
                mapFunctions.hide(`${type}CovidFG`);
                mapFunctions.hide(`${notType}CovidFG`);

                mapFunctions.focusOn(`${type}CountryPOI_FG`);
                break;
            case 'localPOI':
                // Local POI
                mapFunctions.show(`${type}LocalPOI_FG`);
                mapFunctions.hide(`${notType}LocalPOI_FG`);
                // Country POI
                mapFunctions.hide(`${type}CountryPOI_FG`);
                mapFunctions.hide(`${notType}CountryPOI_FG`);
                // Country Marker
                mapFunctions.hide(`${type}CountryMarker`);
                // Weather
                mapFunctions.hide(`${type}WeatherFG`);
                mapFunctions.hide(`${notType}WeatherFG`);
                // Covid
                mapFunctions.hide(`${type}CovidFG`);
                mapFunctions.hide(`${notType}CovidFG`);
                
                mapFunctions.focusOn(`${type}LocalPOI_FG`);
                break;
            case 'countryWeather':
                // Weather
                mapFunctions.show(`${type}WeatherFG`);
                mapFunctions.hide(`${notType}WeatherFG`);
                // Local POI
                mapFunctions.hide(`${type}LocalPOI_FG`);
                mapFunctions.hide(`${notType}LocalPOI_FG`);
                // Country POI
                mapFunctions.hide(`${type}CountryPOI_FG`);
                mapFunctions.hide(`${notType}CountryPOI_FG`);
                // CountryMarker
                mapFunctions.hide(`${type}CountryMarker`);
                // Covid
                mapFunctions.hide(`${type}CovidFG`);
                mapFunctions.hide(`${notType}CovidFG`);

                mapFunctions.focusOn(`${type}WeatherFG`);
                break;
            case 'covid':
                // Covid
                mapFunctions.show(`${type}CovidFG`);
                mapFunctions.hide(`${notType}CovidFG`);
                // Local POI
                mapFunctions.hide(`${type}LocalPOI_FG`);
                mapFunctions.hide(`${notType}LocalPOI_FG`);
                // Country POI
                mapFunctions.hide(`${type}CountryPOI_FG`);
                mapFunctions.hide(`${notType}CountryPOI_FG`);
                // Country Marker
                mapFunctions.hide(`${type}CountryMarker`);
                // Weather
                mapFunctions.hide(`${type}WeatherFG`);
                mapFunctions.hide(`${notType}WeatherFG`);

                mapFunctions.focusOn(`${type}CovidFG`);
                break;
            default:
                // Country Marker
                mapFunctions.show(`${type}CountryMarker`);
                // Local POI
                mapFunctions.hide(`${type}LocalPOI_FG`);
                mapFunctions.hide(`${notType}LocalPOI_FG`);
                // Country POI
                mapFunctions.hide(`${type}CountryPOI_FG`);
                mapFunctions.hide(`${notType}CountryPOI_FG`);
                // Weather
                mapFunctions.hide(`${type}WeatherFG`);
                mapFunctions.hide(`${notType}WeatherFG`);
                // Covid
                mapFunctions.hide(`${type}CovidFG`);
                mapFunctions.hide(`${notType}CovidFG`);
                break;

        }

    }

    /* Return Active Section Class =====================================================================
       Description: Returns the className of the active footer section. */
    function returnActiveSectionClass($activeSection) {

        let sections = returnFooterSectionClasses();

        for (let i = 0; i < sections.length; i++) {

            if ($activeSection.hasClass(sections[i])) {

                return sections[i];

            }


        }

        return false;

    }

    /* Section Class Is Valid ==========================================================================
       Description: Takes a footer section className and determines if it is valid. Returns true if so and false if not. */
    function sectionClassIsValid(sectionClass) {

        let validSections = returnFooterSectionClasses();

        for (let i = 0; i < validSections.length; i++) {

            if (sectionClass == validSections[i]) {

                return true;

            }

        }

        return false;

    }

    /* Clear Footer ==================================================================================== 
       Description: Clears all footer sections and select options from specified type (home or current).
                    Returns true if successful and false if not */
    function clearFooter(type) {

        // ===== Validate Inputs =====
        // Validate 'type'
        if (!((type == 'home') || (type == 'current'))) {

            debug_log('clearFooter: Invalid type specified');
            return false;

        }

        clearFooterSections(type);
        clearSelectOptions(type);

        return true;

    }

    /* Close ===========================================================================================
       Description: Close the footer instantly. */
    function close() {

        // If the footer is already closed, then do nothing
        if (!footerIsOpen()) {

            return;
        
        }

        // ===== Close Footer =====
        let $footer = $('footer');
        let $footerInfoImage = $('.footerInfoImage');
        let $footerInfoContainer = $('.footerInfoContainer');
        let upArrow = 'resources/images/icons/upArrow.png';

        // Close footer
        $footerInfoImage.attr('src', upArrow);
        $footerInfoContainer.hide();
        $footer.removeClass('fullWidth');


    }

    /* Toggle ==========================================================================================
       Description: Toggles the footer open and closed. Accepts optional parameter to specify whether the footer
                    should open or close */
    function toggle(open) {

        // ===== Toggle footer if user hasn't provided input =====
        if (open == undefined) {

            if (footerIsOpen()) {

                open = false;
    
            } else {

                open = true;

            }

        }

        // ===== Open The Footer =====
        let $footer = $('footer');
        let $footerInfoImage = $('.footerInfoImage');
        let $footerInfoContainer = $('.footerInfoContainer');


        if (open) {

            // ===== Do nothing if footer is already open =====
            if (footerIsOpen()) {

                return;

            }

            // ===== Open Footer =====
            let downArrow = 'resources/images/icons/downArrow.png';
            // ===== Get active footer section =====
            let $activeFooterSection = $('.footerSection.active');

            if (!($activeFooterSection)) {

                return;

            }

            // ===== Animate in active footer section =====
            $activeFooterSection.addClass('animated bounceInUp');
            $activeFooterSection.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {

                $activeFooterSection.removeClass('animated bounceInUp');

            });

            // ===== Change footer arrow and open footer =====
            $footerInfoImage.attr('src', downArrow);
            $footerInfoContainer.slideDown(1000);
            $footer.addClass('fullWidth');

        // ===== Close The Footer =====
        } else {

            // ===== Do nothing if footer is already closed =====
            if (!(footerIsOpen())) {

                return;

            }

            // ===== Close Footer =====
            let upArrow = 'resources/images/icons/upArrow.png';

            // Close footer
            $footerInfoImage.attr('src', upArrow);
            $footerInfoContainer.slideUp(1000);

            setTimeout(function () {

                $footer.removeClass('fullWidth');

            }, 1000);

        }

    }

    // ===== Exports =====
    return {

        addFooterSection: addFooterSection,
        updateFooterInfoButton: updateFooterInfoButton,
        changeActiveSection: changeActiveSection,
        returnActiveSectionClass: returnActiveSectionClass,
        sectionClassIsValid: sectionClassIsValid,
        clearFooter: clearFooter,
        toggle: toggle,
        close: close,
        footerIsOpen, footerIsOpen

    }

}();