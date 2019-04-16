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
        'fa-cloud',
        'fa-sun',
        'fa-moon',
        'fa-cloud-moon',
        'fa-cloud-showers-heavy',
        'fa-cloud-sun-rain',
        'fa-cloud-moon-rain',
        'fa-bolt',
        'fa-snowflake',
        'fa-smog',
        'fa-exclamation-triangle',
    ]

    const menu = document.getElementById('menu');
    const options = document.querySelector(".options");
    const weatherSection = document.querySelector(".weather");
    const kiwi = document.querySelector(".fa-kiwi-bird");
    const weatherInfo = document.querySelector(".weather");
    const body = document.querySelector("body");

    const colors = [
        'red',
        'yellow',
        'orange',
        'mint',
        'ice',
        'blue',
        'purple',
        'pink',
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

            subtitlesLeds[8].textContent = 'temp: ' + round(apiJson.main.temp - 273.15, 1) + '°C , ' + round((apiJson.main.temp - 273.15) * 9 / 5 + 32, 1) + '°F';
            subtitlesLeds[9].textContent = 'weather: ' + apiJson.weather[0].description;
            subtitlesLeds[10].textContent = apiJson.name + ', ' + apiJson.sys.country;
            subtitlesLeds[11].textContent = 'pressure: ' + apiJson.main.pressure + 'hPa';
            subtitlesLeds[12].textContent = 'humidity: ' + apiJson.main.humidity + '%';

            function windDirection(n) {
                if (apiJson.wind.deg > 348.75 && apiJson.wind.deg <= 11.25) {
                    return 'N';
                } else if (apiJson.wind.deg > 11.25 && apiJson.wind.deg <= 33.75) {
                    return 'NNE';
                } else if (apiJson.wind.deg > 33.75 && apiJson.wind.deg <= 56.25) {
                    return 'NE';
                } else if (apiJson.wind.deg > 56.25 && apiJson.wind.deg <= 78.75) {
                    return 'ENE';
                } else if (apiJson.wind.deg > 78.75 && apiJson.wind.deg <= 101.25) {
                    return 'E';
                } else if (apiJson.wind.deg > 101.25 && apiJson.wind.deg <= 123.75) {
                    return 'ESE';
                } else if (apiJson.wind.deg > 123.75 && apiJson.wind.deg <= 146.25) {
                    return 'SE';
                } else if (apiJson.wind.deg > 146.25 && apiJson.wind.deg <= 168.75) {
                    return 'SSE';
                } else if (apiJson.wind.deg > 168.75 && apiJson.wind.deg <= 191.25) {
                    return 'S';
                } else if (apiJson.wind.deg > 191.25 && apiJson.wind.deg <= 213.75) {
                    return 'SSW';
                } else if (apiJson.wind.deg > 213.75 && apiJson.wind.deg <= 236.25) {
                    return 'SW';
                } else if (apiJson.wind.deg > 236.25 && apiJson.wind.deg <= 258.75) {
                    return 'WSW';
                } else if (apiJson.wind.deg > 258.75 && apiJson.wind.deg <= 281.25) {
                    return 'W';
                } else if (apiJson.wind.deg > 281.25 && apiJson.wind.deg <= 303.75) {
                    return 'WNW';
                } else if (apiJson.wind.deg > 303.75 && apiJson.wind.deg <= 326.25) {
                    return 'NW';
                } else if (apiJson.wind.deg > 326.25 && apiJson.wind.deg <= 348.75) {
                    return 'NNW';
                }
            }

            subtitlesLeds[13].textContent = 'wind: ' + apiJson.wind.speed + 'm/s, ' + windDirection(apiJson.wind.deg) + ' (' + apiJson.wind.deg + 'deg.)';

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
        draw = draw + 1;
        if (draw >= colors.length) {
            draw = 0;
        }
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
        localStorage.setItem('city', subtitlesLeds[4].value);
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