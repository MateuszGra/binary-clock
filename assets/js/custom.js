"use strict";

//auxiliary function to round results
var round = function round(n, k) {
  var factor = Math.pow(10, k);
  return Math.round(n * factor) / factor;
}; //auxiliary function to change country code to full country name


var decodeCountry = function decodeCountry(n) {
  var countryCode = ['AF', 'AL', 'DZ', 'AS', 'AD', 'AO', 'AI', 'AQ', 'AG', 'AR', 'AM', 'AW', 'AU', 'AT', 'AZ', 'BS', 'BH', 'BD', 'BB', 'BY', 'BE', 'BZ', 'BJ', 'BM', 'BT', 'BO', 'BQ', 'BA', 'BW', 'BV', 'BR', 'IO', 'BN', 'BG', 'BF', 'BI', 'KH', 'CM', 'CA', 'CV', 'KY', 'CF', 'TD', 'CL', 'CN', 'CX', 'CC', 'CO', 'KM', 'CG', 'CD', 'CK', 'CR', 'HR', 'CU', 'CW', 'CY', 'CZ', 'CI', 'DK', 'DJ', 'DM', 'DO', 'EC', 'EG', 'SV', 'GQ', 'ER', 'EE', 'SZ', 'ET', 'FK', 'FO', 'FJ', 'FI', 'FR', 'GF', 'PF', 'TF', 'GA', 'GM', 'GE', 'DE', 'GH', 'GI', 'GR', 'GL', 'GD', 'GP', 'GU', 'GT', 'GG', 'GN', 'GW', 'GY', 'HT', 'HM', 'VA', 'HN', 'HK', 'HU', 'IS', 'IN', 'ID', 'IR', 'IQ', 'IE', 'IM', 'IL', 'IT', 'JM', 'JP', 'JE', 'JO', 'KZ', 'KE', 'KI', 'KP', 'KR', 'KW', 'KG', 'LA', 'LV', 'LB', 'LS', 'LR', 'LY', 'LI', 'LT', 'LU', 'MO', 'MK', 'MG', 'MW', 'MY', 'MV', 'ML', 'MT', 'MH', 'MQ', 'MR', 'MU', 'YT', 'MX', 'FM', 'MD', 'MC', 'MN', 'ME', 'MS', 'MA', 'MZ', 'MM', 'NA', 'NR', 'NP', 'NL', 'NC', 'NZ', 'NI', 'NE', 'NG', 'NU', 'NF', 'MP', 'NO', 'OM', 'PK', 'PW', 'PS', 'PA', 'PG', 'PY', 'PE', 'PH', 'PN', 'PL', 'PT', 'PR', 'QA', 'RO', 'RU', 'RW', 'RE', 'BL', 'SH', 'KN', 'LC', 'MF', 'PM', 'VC', 'WS', 'SM', 'ST', 'SA', 'SN', 'RS', 'SC', 'SL', 'SG', 'SX', 'SK', 'SI', 'SB', 'SO', 'ZA', 'GS', 'SS', 'ES', 'LK', 'SD', 'SR', 'SJ', 'SE', 'CH', 'SY', 'TW', 'TJ', 'TZ', 'TH', 'TL', 'TG', 'TK', 'TO', 'TT', 'TN', 'TR', 'TM', 'TC', 'TV', 'UG', 'UA', 'AE', 'GB', 'US', 'UM', 'UY', 'UZ', 'VU', 'VE', 'VN', 'VG', 'VI', 'WF', 'EH', 'YE', 'ZM', 'ZW', 'AX'];
  var country = ['Afghanistan', 'Albania', 'Algeria', 'American Samoa', 'Andorra', 'Angola', 'Anguilla', 'Antarctica', 'Antigua and Barbuda', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaijan', 'Bahamas', 'Bahrain', 'Bangladesh', 'Barbados', 'Belarus', 'Belgium', 'Belize', 'Benin', 'Bermuda', 'Bhutan', 'Bolivia, Plurinational State of', 'Bonaire, Sint Eustatius and Saba', 'Bosnia and Herzegovina', 'Botswana', 'Bouvet Island', 'Brazil', 'British Indian Ocean Territory', 'Brunei Darussalam', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Cambodia', 'Cameroon', 'Canada', 'Cape Verde', 'Cayman Islands', 'Central African Republic', 'Chad', 'Chile', 'China', 'Christmas Island', 'Cocos (Keeling) Islands', 'Colombia', 'Comoros', 'Congo', 'Congo, the Democratic Republic of the', 'Cook Islands', 'Costa Rica', 'Croatia', 'Cuba', 'Curaçao', 'Cyprus', 'Czechia', 'Côte d’Ivoire', 'Denmark', 'Djibouti', 'Dominica', 'Dominican Republic', 'Ecuador', 'Egypt', 'El Salvador', 'Equatorial Guinea', 'Eritrea', 'Estonia', 'Eswatini', 'Ethiopia', 'Falkland Islands (Malvinas)', 'Faroe Islands', 'Fiji', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'French Southern Territories', 'Gabon', 'Gambia', 'Georgia', 'Germany', 'Ghana', 'Gibraltar', 'Greece', 'Greenland', 'Grenada', 'Guadeloupe', 'Guam', 'Guatemala', 'Guernsey', 'Guinea', 'Guinea-Bissau', 'Guyana', 'Haiti', 'Heard Island and McDonald Islands', 'Holy See (Vatican City State)', 'Honduras', 'Hong Kong', 'Hungary', 'Iceland', 'India', 'Indonesia', 'Iran, Islamic Republic of', 'Iraq', 'Ireland', 'Isle of Man', 'Israel', 'Italy', 'Jamaica', 'Japan', 'Jersey', 'Jordan', 'Kazakhstan', 'Kenya', 'Kiribati', 'Korea, Democratic People’s Republic of', 'Korea, Republic of', 'Kuwait', 'Kyrgyzstan', 'Lao People’s Democratic Republic', 'Latvia', 'Lebanon', 'Lesotho', 'Liberia', 'Libyan Arab Jamahiriya', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macao', 'Macedonia, the former Yugoslav Republic of', 'Madagascar', 'Malawi', 'Malaysia', 'Maldives', 'Mali', 'Malta', 'Marshall Islands', 'Martinique', 'Mauritania', 'Mauritius', 'Mayotte', 'Mexico', 'Micronesia, Federated States of', 'Moldova, Republic of', 'Monaco', 'Mongolia', 'Montenegro', 'Montserrat', 'Morocco', 'Mozambique', 'Myanmar', 'Namibia', 'Nauru', 'Nepal', 'Netherlands', 'New Caledonia', 'New Zealand', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Norfolk Island', 'Northern Mariana Islands', 'Norway', 'Oman', 'Pakistan', 'Palau', 'Palestinian Territory, Occupied', 'Panama', 'Papua New Guinea', 'Paraguay', 'Peru', 'Philippines', 'Pitcairn', 'Poland', 'Portugal', 'Puerto Rico', 'Qatar', 'Romania', 'Russian Federation', 'Rwanda', 'Réunion', 'Saint Barthélemy', 'Saint Helena, Ascension and Tristan da Cunha', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Martin (French part)', 'Saint Pierre and Miquelon', 'Saint Vincent and the Grenadines', 'Samoa', 'San Marino', 'Sao Tome and Principe', 'Saudi Arabia', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leone', 'Singapore', 'Sint Maarten (Dutch part)', 'Slovakia', 'Slovenia', 'Solomon Islands', 'Somalia', 'South Africa', 'South Georgia and the South Sandwich Islands', 'South Sudan', 'Spain', 'Sri Lanka', 'Sudan', 'Suriname', 'Svalbard and Jan Mayen', 'Sweden', 'Switzerland', 'Syrian Arab Republic', 'Taiwan, Province of China', 'Tajikistan', 'Tanzania, United Republic of', 'Thailand', 'Timor-Leste', 'Togo', 'Tokelau', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Turkmenistan', 'Turks and Caicos Islands', 'Tuvalu', 'Uganda', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'United States Minor Outlying Islands', 'Uruguay', 'Uzbekistan', 'Vanuatu', 'Venezuela, Bolivarian Republic of', 'Viet Nam', 'Virgin Islands, British', 'Virgin Islands, U.S.', 'Wallis and Futuna', 'Western Sahara', 'Yemen', 'Zambia', 'Zimbabwe', 'Åland Islands'];

  for (var i = 0; i < country.length; i++) {
    if (n == countryCode[i]) return country[i];
  }

  return n;
}; //auxiliary function to change wind deg to direction


var windDirection = function windDirection(n) {
  if (n > 11.25 && n <= 33.75) {
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
  } else if (n > 348.75 || n <= 11.25) {
    return 'N';
  }
}; //auxiliary function to delete if some API info is not defined


var delUndefined = function delUndefined(n, y) {
  if (n == undefined) {
    y = '';
  }

  return y;
}; //auxiliary function to add zero to result (3am to 03am)


var addZero = function addZero(n) {
  if (n < 10) {
    n = '0' + n;
  }

  return n;
};
"use strict";

(function () {
  var clockDiodes = [[document.getElementById("oneTensHours"), document.getElementById("twoTensHours"), document.getElementById("fourTensHours"), document.getElementById("oneUnitesHours"), document.getElementById("twoUnitesHours"), document.getElementById("fourUnitesHours"), document.getElementById("eightUnitesHours")], [document.getElementById("oneTensMinutes"), document.getElementById("twoTensMinutes"), document.getElementById("fourTensMinutes"), document.getElementById("oneUnitiesMinutes"), document.getElementById("twoUnitiesMinutes"), document.getElementById("fourUnitiesMinutes"), document.getElementById("eightUnitiesMinutes")], [document.getElementById("oneTensSeconds"), document.getElementById("twoTensSeconds"), document.getElementById("fourTensSeconds"), document.getElementById("oneUnitiesSeconds"), document.getElementById("twoUnitiesSeconds"), document.getElementById("fourUnitiesSeconds"), document.getElementById("eightUnitiesSeconds")]];
  var clockNumbers = [[document.getElementById("tensHours"), document.getElementById("unitesHours")], [document.getElementById("tensMinutes"), document.getElementById("unitesMinutes")], [document.getElementById("tensSeconds"), document.getElementById("unitesSeconds")]];
  var cityInput = document.querySelector(".city-input");
  var optionsLeds = [document.querySelector(".option-digital-diode"), document.querySelector(".option-weather-diode")];
  var digitalClock = document.querySelector('.digital-clock');
  var menu = document.querySelector('.menu-button');
  var kiwi = document.querySelector(".fa-kiwi-bird");
  var colorSet = document.querySelectorAll(".color-set-diode");
  var weatherSection = document.querySelector(".weather");
  var weatherIcons = ['fa-cloud', 'fa-sun', 'fa-moon', 'fa-cloud-moon', 'fa-cloud-showers-heavy', 'fa-cloud-sun-rain', 'fa-cloud-moon-rain', 'fa-bolt', 'fa-snowflake', 'fa-smog', 'fa-exclamation-triangle'];
  var colors = ['red', 'yellow', 'orange', 'mint', 'ice', 'blue', 'purple', 'pink'];
  var weatherApiUpdate; //weather API (set interval)

  var discoBirdInterval; //color change interval

  var tempoColor = 'off'; // color change status (on/off)

  var draw; //current color 
  //current date and time

  var currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds(); //load and set local storage options

  var loadOptions = function loadOptions() {
    if (localStorage.getItem('color') != null) {
      draw = localStorage.getItem('color');
      draw = parseInt(draw);
    } else {
      draw = Math.random() * 7;
      draw = Math.round(draw);
      localStorage.setItem('color', draw);
    }

    if (localStorage.getItem('city') != null) {
      cityInput.value = localStorage.getItem('city');
    } else {
      cityInput.value = 'Wrocław';
    }

    if (localStorage.getItem('digitalClock') == 'on') {
      digitalClock.classList.remove('none');
      optionsLeds[0].classList.add(colors[draw]);
    } else {
      digitalClock.classList.add('none');
      optionsLeds[0].classList.remove(colors[draw] + 'Off');
    }

    if (localStorage.getItem('weather') == 'off') {
      weatherSection.classList.add('none');
      optionsLeds[1].classList.add(colors[draw] + 'Off');
    } else {
      weatherSection.classList.remove('none');
      optionsLeds[1].classList.add(colors[draw]);
    }
  };

  loadOptions(); //reset all colors before set new one

  var clockDiods = document.querySelectorAll('.clock-diode');
  var texts = document.querySelectorAll('.text');
  var optionsDiods = document.querySelectorAll('.option-diode');

  var reset = function reset() {
    colors.forEach(function (color) {
      clockDiods.forEach(function (clockDiode) {
        clockDiode.classList.remove("".concat(color, "Off"));
        clockDiode.classList.remove("".concat(color));
      });
      texts.forEach(function (text) {
        text.classList.remove("".concat(color, "Number"));
      });
      optionsDiods.forEach(function (optionsDiod) {
        optionsDiod.classList.remove("".concat(color, "Off"));
      });
      menu.classList.remove(color);
      kiwi.classList.remove("".concat(color, "OffNumber"));
    });
  }; //add colors to all (options, clock, weather...)


  var addColors = function addColors() {
    menu.classList.add(colors[draw]);
    colorSet[draw].classList.add(colors[draw]);
    kiwi.classList.add("".concat(colors[draw], "OffNumber"));
    clockDiods.forEach(function (clockDiode) {
      clockDiode.classList.add("".concat(colors[draw], "Off"));
    });
    texts.forEach(function (text) {
      text.classList.add("".concat(colors[draw], "Number"));
    });
    optionsDiods.forEach(function (optionsDiod) {
      optionsDiod.classList.add("".concat(colors[draw], "Off"));
    });
  }; //show time at binary and digital clock


  var showTime = function showTime(variable, section, digitalNumber) {
    var tens = Math.floor(variable / 10);
    var unities = variable - tens * 10;
    digitalNumber[0].textContent = tens;
    digitalNumber[1].textContent = unities;

    if (unities >= 8) {
      section[6].classList.add(colors[draw]);
      unities -= 8;
    }

    if (unities >= 4) {
      section[5].classList.add(colors[draw]);
      unities -= 4;
    }

    if (unities >= 2) {
      section[4].classList.add(colors[draw]);
      unities -= 2;
    }

    if (unities >= 1) {
      section[3].classList.add(colors[draw]);
    }

    if (tens >= 4) {
      section[2].classList.add(colors[draw]);
      tens -= 4;
    }

    if (tens >= 2) {
      section[1].classList.add(colors[draw]);
      tens -= 2;
    }

    if (tens >= 1) {
      section[0].classList.add(colors[draw]);
    }
  }; //time set interwal 


  setInterval(function () {
    currentDate = new Date();
    hours = currentDate.getHours();
    minutes = currentDate.getMinutes();
    seconds = currentDate.getSeconds();
    reset();
    addColors();
    showTime(hours, clockDiodes[0], clockNumbers[0]);
    showTime(minutes, clockDiodes[1], clockNumbers[1]);
    showTime(seconds, clockDiodes[2], clockNumbers[2]);
  }, 100); //get info from weather API

  var weatherApi = function weatherApi() {
    //get info from API and set information in HTML
    fetch("https://api.openweathermap.org/data/2.5/weather?q=" + encodeURI(cityInput.value) + "&APPID=18a4fba4ee73407fc5b7e49ba72b3fc4").then(function (resp) {
      return resp.json();
    }).then(function (resp) {
      if (resp.cod == 200) {
        localStorage.setItem('city', cityInput.value);
      }

      var dateSunset = new Date(resp.sys.sunset * 1000);
      var hoursSunset = dateSunset.getHours();
      var minutesSunset = dateSunset.getMinutes();
      var dateSunrise = new Date(resp.sys.sunrise * 1000);
      var hoursSunrise = dateSunrise.getHours();
      var minutesSunrise = dateSunrise.getMinutes();
      var weatherIcon = document.querySelector('.weather-icon');
      var infoTemp = document.querySelector('.info-temp');
      var infoCity = document.querySelector('.info-city');
      var fullInfoTemp = document.querySelector('.full-info-temp');
      var fullInfoWeather = document.querySelector('.full-info-weather');
      var fullInfoPressure = document.querySelector('.full-info-pressure');
      var fullInfoHumidity = document.querySelector('.full-info-humidity');
      var fullInfoCity = document.querySelector('.full-info-city');
      var fullInfoWind = document.querySelector('.full-info-wind');
      var fullInfoSunrise = document.querySelector('.full-info-sunrise');
      var fullInfoSanset = document.querySelector('.full-info-sunset');
      var fullInfoCord = document.querySelector('.full-info-cord');
      var fullInfoUpdate = document.querySelector('.full-info-update');
      infoTemp.textContent = "".concat(round(resp.main.temp - 273.15, 0), "\xB0C");
      infoCity.textContent = "".concat(resp.name, " , ").concat(resp.sys.country);
      fullInfoTemp.textContent = "temp: ".concat(round(resp.main.temp - 273.15, 1), "\xB0C , ").concat(round(round(resp.main.temp - 273.15, 1) * 9 / 5 + 32, 1), "\xB0F");
      fullInfoWeather.textContent = "weather: ".concat(resp.weather[0].description);
      fullInfoCity.textContent = "".concat(resp.name, ", ").concat(decodeCountry(resp.sys.country));
      fullInfoPressure.textContent = "pressure: ".concat(resp.main.pressure, "hPa");
      fullInfoHumidity.textContent = "humidity: ".concat(resp.main.humidity, "%");
      fullInfoWind.textContent = "wind: ".concat(resp.wind.speed, "m/s").concat(delUndefined(resp.wind.deg, ", ".concat(windDirection(resp.wind.deg), " (").concat(resp.wind.deg, "deg.)")));
      fullInfoSunrise.textContent = "sunrise: ".concat(addZero(hoursSunrise), ":").concat(addZero(minutesSunrise));
      fullInfoSanset.textContent = "sunset: ".concat(addZero(hoursSunset), ":").concat(addZero(minutesSunset));
      fullInfoCord.textContent = "geo coords: [".concat(resp.coord.lat, " , ").concat(resp.coord.lon, "]");
      fullInfoUpdate.textContent = "last update: ".concat(addZero(hours), ":").concat(addZero(minutes), ":").concat(addZero(seconds));

      for (var i = 0; i < weatherIcons.length; i++) {
        weatherIcon.classList.remove(weatherIcons[i]);
      }

      if (resp.weather[0].icon == '03d' || resp.weather[0].icon == '03n' || resp.weather[0].icon == '04d' || resp.weather[0].icon == '04n') {
        weatherIcon.classList.add('fa-cloud');
      } else if (resp.weather[0].icon == '01d') {
        weatherIcon.classList.add('fa-sun');
      } else if (resp.weather[0].icon == '01n') {
        weatherIcon.classList.add('fa-moon');
      } else if (resp.weather[0].icon == '02d') {
        weatherIcon.classList.add('fa-cloud-sun');
      } else if (resp.weather[0].icon == '02n') {
        weatherIcon.classList.add('fa-cloud-moon');
      } else if (resp.weather[0].icon == '09d' || resp.weather[0].icon == '09n') {
        weatherIcon.classList.add('fa-cloud-showers-heavy');
      } else if (resp.weather[0].icon == '10d') {
        weatherIcon.classList.add('fa-cloud-sun-rain');
      } else if (resp.weather[0].icon == '10n') {
        weatherIcon.classList.add('fa-cloud-moon-rain');
      } else if (resp.weather[0].icon == '11d' || resp.weather[0].icon == '11n') {
        weatherIcon.classList.add('fa-bolt');
      } else if (resp.weather[0].icon == '13d' || resp.weather[0].icon == '13n') {
        weatherIcon.classList.add('fa-snowflake');
      } else if (resp.weather[0].icon == '50d' || resp.weather[0].icon == '50n') {
        weatherIcon.classList.add('fa-smog');
      } else {
        weatherIcon.classList.add('fa-exclamation-triangle');
      }
    });
  };

  weatherApi();

  if (!weatherSection.classList.contains('none')) {
    weatherApiUpdate = setInterval(weatherApi, 60000);
  } //automatic change of colors


  var discoBird = function discoBird() {
    draw++;

    if (draw >= colors.length) {
      draw = 0;
    }

    localStorage.setItem('color', draw);

    for (var o = 0; o < colorSet.length; o++) {
      colorSet[o].classList.remove(colors[o]);
      optionsLeds[0].classList.remove(colors[o]);
      optionsLeds[1].classList.remove(colors[o]);
      kiwi.classList.remove(colors[o] + 'Number');
    }

    colorSet[draw].classList.add(colors[draw]);

    if (tempoColor == 'on') {
      kiwi.classList.add(colors[draw] + 'Number');
    }

    if (!digitalClock.classList.contains('none')) {
      optionsLeds[0].classList.add(colors[draw]);
    }

    if (!weatherSection.classList.contains('none')) {
      optionsLeds[1].classList.add(colors[draw]);
    }
  }; //////////////////////////////////////// event listeners ////////////////////////////////////////


  var colorClick = function colorClick(n) {
    for (var o = 0; o < colorSet.length; o++) {
      colorSet[o].classList.remove(colors[o]);
      optionsLeds[0].classList.remove(colors[o]);
      optionsLeds[1].classList.remove(colors[o]);
      kiwi.classList.remove(colors[o] + 'Number');
    }

    colorSet[n].classList.add(colors[n]);

    if (tempoColor == 'on') {
      kiwi.classList.add(colors[n] + 'Number');
    }

    if (!digitalClock.classList.contains('none')) {
      optionsLeds[0].classList.add(colors[n]);
    }

    if (!weatherSection.classList.contains('none')) {
      optionsLeds[1].classList.add(colors[n]);
    }

    localStorage.setItem('color', n);
    draw = n;
  };

  var _loop = function _loop(i) {
    colorSet[i].addEventListener("click", function (e) {
      e.stopPropagation();
      colorClick(i);
    });
    colorSet[i].addEventListener("touch", function (e) {
      e.stopPropagation();
      colorClick(i);
    });
  };

  for (var i = 0; i < colors.length; i++) {
    _loop(i);
  }

  var weatherOptionClick = function weatherOptionClick() {
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
  };

  var optionWeather = document.querySelector('.option-weather');
  optionWeather.addEventListener('click', function (e) {
    e.stopPropagation();
    weatherOptionClick();
  });
  optionWeather.addEventListener('touch', function (e) {
    e.stopPropagation();
    weatherOptionClick();
  });
  cityInput.addEventListener('change', function (e) {
    weatherApi();
  });

  var menuClick = function menuClick() {
    var menuWrapper = document.querySelector(".menu-wrapper");
    menuWrapper.classList.toggle('none');
    if (!menuWrapper.classList.contains('none')) menuWrapper.scrollIntoView();
  };

  menu.addEventListener('click', function (e) {
    e.stopPropagation();
    menuClick();
  });
  menu.addEventListener('touch', function (e) {
    e.stopPropagation();
    menuClick();
  });

  var kiwiClick = function kiwiClick() {
    for (var i = 0; i < colors.length; i++) {
      kiwi.classList.remove(colors[i] + 'Number');
    }

    if (tempoColor == 'off') {
      tempoColor = 'on';
      discoBirdInterval = setInterval(discoBird, 500);
      kiwi.classList.add(colors[draw] + 'Number');
    } else {
      tempoColor = 'off';
      clearInterval(discoBirdInterval);
    }
  };

  kiwi.addEventListener('click', function (e) {
    e.stopPropagation();
    kiwiClick();
  });
  kiwi.addEventListener('touch', function (e) {
    e.stopPropagation();
    kiwiClick();
  });

  var numberOptionClick = function numberOptionClick() {
    optionsLeds[0].classList.toggle(colors[draw]);
    digitalClock.classList.toggle('none');
    if (digitalClock.classList.contains('none')) localStorage.setItem('digitalClock', 'off');else localStorage.setItem('digitalClock', 'on');
  };

  var digitalOption = document.querySelector('.option-digital');
  digitalOption.addEventListener('click', function (e) {
    e.stopPropagation();
    numberOptionClick();
  });
  digitalOption.addEventListener('touch', function (e) {
    e.stopPropagation();
    numberOptionClick();
  });
  var fullInfo = document.querySelector('.full-info');
  weatherSection.addEventListener('click', function (e) {
    e.stopPropagation();
    fullInfo.classList.toggle('none');
  });
  weatherSection.addEventListener('touch', function (e) {
    e.stopPropagation();
    fullInfo.classList.toggle('none');
  });
  document.addEventListener('click', function (e) {
    fullInfo.classList.add('none');
  });
  document.addEventListener('touch', function (e) {
    fullInfo.classList.add('none');
  });
})();