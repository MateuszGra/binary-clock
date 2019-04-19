(function () {
    const leds = [
        [
            document.getElementById("oneTensHours"),
            document.getElementById("twoTensHours"),
            document.getElementById("fourTensHours"),
            document.getElementById("oneUnitesHours"),
            document.getElementById("twoUnitesHours"),
            document.getElementById("fourUnitesHours"),
            document.getElementById("eightUnitesHours"),
            document.getElementById("ledsOff4"),
        ],
        [
            document.getElementById("oneTensMinutes"),
            document.getElementById("twoTensMinutes"),
            document.getElementById("fourTensMinutes"),
            document.getElementById("oneUnitiesMinutes"),
            document.getElementById("twoUnitiesMinutes"),
            document.getElementById("fourUnitiesMinutes"),
            document.getElementById("eightUnitiesMinutes"),
            document.getElementById("ledsOff12"),
        ],
        [
            document.getElementById("oneTensSeconds"),
            document.getElementById("twoTensSeconds"),
            document.getElementById("fourTensSeconds"),
            document.getElementById("oneUnitiesSeconds"),
            document.getElementById("twoUnitiesSeconds"),
            document.getElementById("fourUnitiesSeconds"),
            document.getElementById("eightUnitiesSeconds"),
            document.getElementById("ledsOff20"),
        ],
        [
            document.getElementById("tensHours"),
            document.getElementById("unitesHours"),
        ],
        [
            document.getElementById("tensMinutes"),
            document.getElementById("unitesMinutes"),
        ],
        [
            document.getElementById("tensSeconds"),
            document.getElementById("unitesSeconds"),
        ],
    ];

    const subtitlesLeds = [
        document.querySelector(".numberOption"),
        document.querySelector(".weatherOption"),
        document.querySelector(".temp"),
        document.querySelector(".weatherIcon"),
        document.querySelector(".city"),
        document.querySelector(".name"),
        document.querySelector(".fa-info-circle"),
        document.querySelector(".fullInfo"),
        document.querySelector(".tempFullInfo"),
        document.querySelector(".weatherFullInfo"),
        document.querySelector(".cityFullInfo"),
        document.querySelector(".pressureFullInfo"),
        document.querySelector(".humidityFullInfo"),
        document.querySelector(".windFullInfo"),
        document.querySelector(".sunriseFullInfo"),
        document.querySelector(".SunsetFullInfo"),
        document.querySelector(".cordFullInfo"),
        document.querySelector(".updateFullInfo"),
    ];

    const optionsLeds = [
        document.querySelector(".numberOptionLed"),
        document.querySelector(".weatherOptionLed"),
    ];

    const weatherIcons = [
        'fa-cloud', 'fa-sun', 'fa-moon', 'fa-cloud-moon', 'fa-cloud-showers-heavy', 'fa-cloud-sun-rain', 'fa-cloud-moon-rain', 'fa-bolt', 'fa-snowflake', 'fa-smog', 'fa-exclamation-triangle',
    ]

    const menu = document.getElementById('menu');
    const options = document.querySelector(".options");
    const weatherSection = document.querySelector(".weather");
    const kiwi = document.querySelector(".fa-kiwi-bird");
    const weatherInfo = document.querySelector(".weather");
    const body = document.querySelector("body");

    const colors = [
        'red', 'yellow', 'orange', 'mint', 'ice', 'blue', 'purple', 'pink',
    ];

    const menuLeds = [
        document.getElementById("wheel1"),
        document.getElementById("wheel2"),
        document.getElementById("wheel3"),
        document.getElementById("wheel4"),
        document.getElementById("wheel5"),
        document.getElementById("wheel6"),
        document.getElementById("wheel7"),
        document.getElementById("wheel8"),
    ];

    let weatherApiUpdate;
    let discoBirdInterval;
    let tempoColor = 'off';
    let draw;
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    if (localStorage.getItem('color') != null) {
        draw = localStorage.getItem('color')
        draw = parseInt(draw);
    } else {
        draw = Math.random() * 7;
        draw = Math.round(draw);
        localStorage.setItem('color', draw);
    }
    if (localStorage.getItem('city') != null) {
        subtitlesLeds[4].value = localStorage.getItem('city');
    } else {
        subtitlesLeds[4].value = 'Wrocław';
    }

    if (localStorage.getItem('digitalClock') == 'on') {
        for (let i = 0; i < leds[3].length; i++) {
            leds[3][i].classList.remove('none');
            leds[4][i].classList.remove('none');
            leds[5][i].classList.remove('none');
            optionsLeds[0].classList.add(colors[draw]);
        }
    } else {
        for (let i = 0; i < leds[3].length; i++) {
            leds[3][i].classList.add('none');
            leds[4][i].classList.add('none');
            leds[5][i].classList.add('none');
            optionsLeds[0].classList.remove(colors[draw] + 'Off');
        }
    }

    if (localStorage.getItem('weather') == 'off') {
        weatherSection.classList.add('none');
        optionsLeds[1].classList.add(colors[draw] + 'Off');
    } else {
        weatherSection.classList.remove('none');
        optionsLeds[1].classList.add(colors[draw]);
    }

    function addColors() {
        menu.classList.add(colors[draw]);
        menuLeds[draw].classList.add(colors[draw]);

        for (let i = 0; i < leds[0].length; i++) {
            leds[0][i].classList.add(colors[draw] + 'Off');
            leds[1][i].classList.add(colors[draw] + 'Off');
            leds[2][i].classList.add(colors[draw] + 'Off');
        }
        for (let i = 0; i < leds[3].length; i++) {
            leds[3][i].classList.add(colors[draw] + 'Number');
            leds[4][i].classList.add(colors[draw] + 'Number');
            leds[5][i].classList.add(colors[draw] + 'Number');
        }
        for (let i = 0; i < subtitlesLeds.length; i++) {
            subtitlesLeds[i].classList.add(colors[draw] + 'Number');
        }
        for (let i = 0; i < optionsLeds.length; i++) {
            optionsLeds[i].classList.add(colors[draw] + 'Off');
        }
        kiwi.classList.add(colors[draw] + 'OffNumber');
    }

    function showTime(variable, section, sectionNumber) {
        let tens = variable / 10
        tens = Math.floor(tens);
        let unities = variable - tens * 10;

        sectionNumber[0].textContent = tens;
        sectionNumber[1].textContent = unities;

        if (unities >= 8) {
            section[6].classList.add(colors[draw]);
            unities = unities - 8
        }
        if (unities >= 4) {
            section[5].classList.add(colors[draw]);
            unities = unities - 4
        }
        if (unities >= 2) {
            section[4].classList.add(colors[draw]);
            unities = unities - 2
        }
        if (unities >= 1) {
            section[3].classList.add(colors[draw]);
        }

        if (tens >= 4) {
            section[2].classList.add(colors[draw]);
            tens = tens - 4
        }
        if (tens >= 2) {
            section[1].classList.add(colors[draw]);
            tens = tens - 2
        }
        if (tens >= 1) {
            section[0].classList.add(colors[draw]);
        }
    }

    function reset() {
        for (let i = 0; i < leds.length; i++) {
            for (let o = 0; o < leds[i].length; o++) {
                for (let z = 0; z < colors.length; z++) {
                    leds[i][o].classList.remove(colors[z]);
                }
            }
        }
        for (let i = 0; i < leds[0].length; i++) {
            for (let o = 0; o < colors.length; o++) {
                leds[0][i].classList.remove(colors[o] + 'Off');
                leds[1][i].classList.remove(colors[o] + 'Off');
                leds[2][i].classList.remove(colors[o] + 'Off');
            }
        }
        for (let i = 0; i < leds[3].length; i++) {
            for (let o = 0; o < colors.length; o++) {
                leds[3][i].classList.remove(colors[o] + 'Number');
                leds[4][i].classList.remove(colors[o] + 'Number');
                leds[5][i].classList.remove(colors[o] + 'Number');
            }
        }
        for (let i = 0; i < subtitlesLeds.length; i++) {
            for (let o = 0; o < colors.length; o++) {
                subtitlesLeds[i].classList.remove(colors[o] + 'Number');
            }
        }
        for (let i = 0; i < optionsLeds.length; i++) {
            for (let o = 0; o < colors.length; o++) {
                optionsLeds[i].classList.remove(colors[o] + 'Off');
            }
        }
        for (let i = 0; i < colors.length; i++) {
            menu.classList.remove(colors[i]);
            kiwi.classList.remove(colors[i] + 'OffNumber');
        }
    }

    setInterval(function () {
        currentDate = new Date();
        hours = currentDate.getHours();
        minutes = currentDate.getMinutes();
        seconds = currentDate.getSeconds();

        reset();
        addColors();
        showTime(hours, leds[0], leds[3]);
        showTime(minutes, leds[1], leds[4]);
        showTime(seconds, leds[2], leds[5]);
    }, 100);

    function weatherApi() {
        let api = new XMLHttpRequest;
        api.open("GET", "https://api.openweathermap.org/data/2.5/weather?q=" + encodeURI(subtitlesLeds[4].value) + "&APPID=18a4fba4ee73407fc5b7e49ba72b3fc4", false);
        api.send();

        if (api.status == 200) {
            localStorage.setItem('city', subtitlesLeds[4].value);

            let apiJson = JSON.parse(api.responseText);
            let dateSunset = new Date(apiJson.sys.sunset * 1000);
            let hoursSunset = dateSunset.getHours();
            let minutesSunset = dateSunset.getMinutes();

            let dateSunrise = new Date(apiJson.sys.sunrise * 1000);
            let hoursSunrise = dateSunrise.getHours();
            let minutesSunrise = dateSunrise.getMinutes();

            function round(n, k) {
                let factor = Math.pow(10, k);
                return Math.round(n * factor) / factor;
            }

            subtitlesLeds[2].textContent = round(apiJson.main.temp - 273.15, 0) + '°C';
            subtitlesLeds[5].textContent = apiJson.name + ', ' + apiJson.sys.country;
            subtitlesLeds[8].textContent = 'temp: ' + round(apiJson.main.temp - 273.15, 1) + '°C , ' + round(round(apiJson.main.temp - 273.15, 1) * 9 / 5 + 32, 1) + '°F';
            subtitlesLeds[9].textContent = 'weather: ' + apiJson.weather[0].description;

            function decodeCountry(n) {
                const countryCode = ['AF', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'HR', 'CU', 'CW', 'CY', 'CZ', 'CI', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MK', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RO', 'RU', 'RW', 'RE', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'UY', 'UZ', 'VU', 'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW', 'AX'];
                const country = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia, Plurinational State of', 'Bonaire, Sint Eustatius and Saba', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, the Democratic Republic of the', 'Cook Islands', 'Costa Rica', 'Croatia', 'Cuba', 'Curaçao', 'Cyprus', 'Czechia', 'Côte d’Ivoire', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and McDonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran, Islamic Republic of', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, Democratic People’s Republic of', 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', 'Lao People’s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia, the former Yugoslav Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory, Occupied', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Romania', 'Russian Federation', 'Rwanda', 'Réunion', 'Saint Barthélemy', 'Saint Helena, Ascension and Tristan da Cunha', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin (French part)', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten (Dutch part)', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela, Bolivarian Republic of', 'Viet Nam', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe', 'Åland Islands'];

                for (i = 0; i < country.length; i++) {
                    if (n == countryCode[i]) {
                        return country[i];
                    }
                }
                return n;
            }

            subtitlesLeds[10].textContent = apiJson.name + ', ' + decodeCountry(apiJson.sys.country);
            subtitlesLeds[11].textContent = 'pressure: ' + apiJson.main.pressure + 'hPa';
            subtitlesLeds[12].textContent = 'humidity: ' + apiJson.main.humidity + '%';

            function windDirection(n) {
                if (n > 348.75 && n <= 11.25) {
                    return 'N';
                } else if (n > 11.25 && n <= 33.75) {
                    return 'NNE';
                } else if (n > 33.75 && n <= 56.25) {
                    return 'NE';
                } else if (n > 56.25 && n <= 78.75) {
                    return 'ENE';
                } else if (n > 78.75 && n <= 101.25) {
                    return 'E';
                } else if (n > 101.25 && n <= 123.75) {
                    return 'ESE';
                } else if (n > 123.75 && n <= 146.25) {
                    return 'SE';
                } else if (n > 146.25 && n <= 168.75) {
                    return 'SSE';
                } else if (n > 168.75 && n <= 191.25) {
                    return 'S';
                } else if (n > 191.25 && n <= 213.75) {
                    return 'SSW';
                } else if (n > 213.75 && n <= 236.25) {
                    return 'SW';
                } else if (n > 236.25 && n <= 258.75) {
                    return 'WSW';
                } else if (n > 258.75 && n <= 281.25) {
                    return 'W';
                } else if (n > 281.25 && n <= 303.75) {
                    return 'WNW';
                } else if (n > 303.75 && n <= 326.25) {
                    return 'NW';
                } else if (n > 326.25 && n <= 348.75) {
                    return 'NNW';
                }
            }

            function delUndefined(n, y) {
                if (n == undefined) {
                    y = '';
                }
                return y;
            }

            subtitlesLeds[13].textContent = 'wind: ' + apiJson.wind.speed + 'm/s' + delUndefined(apiJson.wind.deg, ', ' + windDirection(apiJson.wind.deg) + ' (' + apiJson.wind.deg + 'deg.)');

            function addZero(n) {
                if (n < 10) {
                    n = "0" + n;
                }
                return n;
            }

            subtitlesLeds[14].textContent = 'sunrise: ' + addZero(hoursSunrise) + ':' + addZero(minutesSunrise);
            subtitlesLeds[15].textContent = 'sunset: ' + addZero(hoursSunset) + ':' + addZero(minutesSunset);
            subtitlesLeds[16].textContent = 'geo coords: [' + apiJson.coord.lon + ' , ' + apiJson.coord.lat + ']';

            let dateUpdate = new Date();
            let hoursUpdate = dateUpdate.getHours();
            let minutesUpdate = dateUpdate.getMinutes();
            let secondsUpdate = dateUpdate.getSeconds();

            subtitlesLeds[17].textContent = 'last update: ' + addZero(hoursUpdate) + ':' + addZero(minutesUpdate) + ':' + addZero(secondsUpdate);

            for (i = 0; i < weatherIcons.length; i++) {
                subtitlesLeds[3].classList.remove(weatherIcons[i]);
            }

            if (apiJson.weather[0].icon == '03d' || apiJson.weather[0].icon == '03n' || apiJson.weather[0].icon == '04d' || apiJson.weather[0].icon == '04n') {
                subtitlesLeds[3].classList.add('fa-cloud');
            } else if (apiJson.weather[0].icon == '01d') {
                subtitlesLeds[3].classList.add('fa-sun');
            } else if (apiJson.weather[0].icon == '01n') {
                subtitlesLeds[3].classList.add('fa-moon');
            } else if (apiJson.weather[0].icon == '02d') {
                subtitlesLeds[3].classList.add('fa-cloud-sun');
            } else if (apiJson.weather[0].icon == '02n') {
                subtitlesLeds[3].classList.add('fa-cloud-moon');
            } else if (apiJson.weather[0].icon == '09d' || apiJson.weather[0].icon == '09n') {
                subtitlesLeds[3].classList.add('fa-cloud-showers-heavy');
            } else if (apiJson.weather[0].icon == '10d') {
                subtitlesLeds[3].classList.add('fa-cloud-sun-rain');
            } else if (apiJson.weather[0].icon == '10n') {
                subtitlesLeds[3].classList.add('fa-cloud-moon-rain');
            } else if (apiJson.weather[0].icon == '11d' || apiJson.weather[0].icon == '11n') {
                subtitlesLeds[3].classList.add('fa-bolt');
            } else if (apiJson.weather[0].icon == '13d' || apiJson.weather[0].icon == '13n') {
                subtitlesLeds[3].classList.add('fa-snowflake');
            } else if (apiJson.weather[0].icon == '50d' || apiJson.weather[0].icon == '50n') {
                subtitlesLeds[3].classList.add('fa-smog');
            } else {
                subtitlesLeds[3].classList.add('fa-exclamation-triangle');
            }
        }
    }
    weatherApi();
    if (weatherSection.classList[1] != 'none') {
        weatherApiUpdate = setInterval(weatherApi, 60000);
    }

    function discoBird() {
        draw++;
        if (draw >= colors.length) {
            draw = 0;
        }
        localStorage.setItem('color', draw);
        for (let o = 0; o < menuLeds.length; o++) {
            menuLeds[o].classList.remove(colors[o]);
            optionsLeds[0].classList.remove(colors[o]);
            optionsLeds[1].classList.remove(colors[o]);
            kiwi.classList.remove(colors[o] + 'Number');
        }
        menuLeds[draw].classList.add(colors[draw]);

        if (tempoColor == 'on') {
            kiwi.classList.add(colors[draw] + 'Number');
        }

        if (leds[3][0].classList[0] != 'none') {
            optionsLeds[0].classList.add(colors[draw]);
        }
        if (weatherSection.classList[1] != 'none') {
            optionsLeds[1].classList.add(colors[draw]);
        }
    }

    for (let i = 0; i < colors.length; i++) {
        menuLeds[i].addEventListener("click", function (e) {
            e.stopPropagation();
            for (let o = 0; o < menuLeds.length; o++) {
                menuLeds[o].classList.remove(colors[o]);
                optionsLeds[0].classList.remove(colors[o]);
                optionsLeds[1].classList.remove(colors[o]);
                kiwi.classList.remove(colors[o] + 'Number');
            }
            menuLeds[i].classList.add(colors[i]);

            if (tempoColor == 'on') {
                kiwi.classList.add(colors[i] + 'Number');
            }

            if (leds[3][0].classList[0] != 'none') {
                optionsLeds[0].classList.add(colors[i]);
            }

            if (weatherSection.classList[1] != 'none') {
                optionsLeds[1].classList.add(colors[i]);
            }
            localStorage.setItem('color', i);
            draw = i;
        });
        menuLeds[i].addEventListener("touch", function (e) {
            e.stopPropagation();
            for (let o = 0; o < menuLeds.length; o++) {
                menuLeds[o].classList.remove(colors[o]);
                optionsLeds[0].classList.remove(colors[o]);
                optionsLeds[1].classList.remove(colors[o]);
                kiwi.classList.remove(colors[o] + 'Number');
            }
            menuLeds[i].classList.add(colors[i]);

            if (tempoColor == 'on') {
                kiwi.classList.add(colors[i] + 'Number');
            }

            if (leds[3][0].classList[0] != 'none') {
                optionsLeds[0].classList.add(colors[i]);
            }

            if (weatherSection.classList[1] != 'none') {
                optionsLeds[1].classList.add(colors[i]);
            }
            localStorage.setItem('color', i);
            draw = i;
        });
    }

    subtitlesLeds[1].addEventListener('click', function (e) {
        e.stopPropagation();
        optionsLeds[1].classList.toggle(colors[draw]);
        weatherSection.classList.toggle('none');
        if (weatherSection.classList[1] == 'none') {
            localStorage.setItem('weather', 'off');
            clearInterval(weatherApiUpdate);
        } else {
            localStorage.setItem('weather', 'on');
            weatherApi();
            weatherApiUpdate = setInterval(weatherApi, 60000);
        }
    });

    subtitlesLeds[1].addEventListener('touch', function (e) {
        e.stopPropagation();
        optionsLeds[1].classList.toggle(colors[draw]);
        weatherSection.classList.toggle('none');
        if (weatherSection.classList[1] == 'none') {
            localStorage.setItem('weather', 'off');
            clearInterval(weatherApiUpdate);
        } else {
            localStorage.setItem('weather', 'on');
            weatherApi();
            weatherApiUpdate = setInterval(weatherApi, 60000);
        }
    });

    subtitlesLeds[4].addEventListener('change', function (e) {
        weatherApi();
    });

    menu.addEventListener('click', function (e) {
        e.stopPropagation();
        options.classList.toggle('none');
        if (options.classList[1] != 'none') {
            options.scrollIntoView()
        }
    });
    menu.addEventListener('touch', function (e) {
        e.stopPropagation();
        options.classList.toggle('none');
        if (options.classList[1] != 'none') {
            options.scrollIntoView()
        }
    });

    kiwi.addEventListener('click', function (e) {
        e.stopPropagation();
        for (let i = 0; i < colors.length; i++) {
            kiwi.classList.remove(colors[i] + 'Number');
        }

        if (tempoColor == 'off') {
            tempoColor = 'on'
            discoBirdInterval = setInterval(discoBird, 500);
            kiwi.classList.add(colors[draw] + 'Number');
        } else {
            tempoColor = 'off';
            clearInterval(discoBirdInterval);
        }
    });
    kiwi.addEventListener('touch', function (e) {
        e.stopPropagation();
        for (let i = 0; i < colors.length; i++) {
            kiwi.classList.remove(colors[i] + 'Number');
        }

        if (tempoColor == 'off') {
            tempoColor = 'on'
            discoBirdInterval = setInterval(discoBird, 500);
            kiwi.classList.add(colors[draw] + 'Number');
        } else {
            tempoColor = 'off';
            clearInterval(discoBirdInterval);
        }
    });

    subtitlesLeds[0].addEventListener('click', function (e) {
        e.stopPropagation();
        optionsLeds[0].classList.toggle(colors[draw]);

        for (let i = 0; i < leds[3].length; i++) {
            leds[3][i].classList.toggle('none');
            leds[4][i].classList.toggle('none');
            leds[5][i].classList.toggle('none');
        }
        if (leds[3][0].classList[1] != 'none') {
            localStorage.setItem('digitalClock', 'on');
        } else {
            localStorage.setItem('digitalClock', 'off');
        }
    });
    subtitlesLeds[0].addEventListener('touch', function (e) {
        e.stopPropagation();
        optionsLeds[0].classList.toggle(colors[draw]);

        for (let i = 0; i < leds[3].length; i++) {
            leds[3][i].classList.toggle('none');
            leds[4][i].classList.toggle('none');
            leds[5][i].classList.toggle('none');
        }
        if (leds[3][0].classList[1] != 'none') {
            localStorage.setItem('digitalClock', 'on');
        } else {
            localStorage.setItem('digitalClock', 'off');
        }
    });

    weatherInfo.addEventListener('click', function (e) {
        e.stopPropagation();
        subtitlesLeds[7].classList.toggle('none');
    });
    weatherInfo.addEventListener('touch', function (e) {
        e.stopPropagation();
        subtitlesLeds[7].classList.toggle('none');
    });

    body.addEventListener('click', function (e) {
        subtitlesLeds[7].classList.add('none');
    });
    body.addEventListener('touch', function (e) {
        subtitlesLeds[7].classList.add('none');
    });
})();