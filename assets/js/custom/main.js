(() => {
    const clockDiodes = [
        [
            document.getElementById("oneTensHours"),
            document.getElementById("twoTensHours"),
            document.getElementById("fourTensHours"),
            document.getElementById("oneUnitesHours"),
            document.getElementById("twoUnitesHours"),
            document.getElementById("fourUnitesHours"),
            document.getElementById("eightUnitesHours"),
        ],
        [
            document.getElementById("oneTensMinutes"),
            document.getElementById("twoTensMinutes"),
            document.getElementById("fourTensMinutes"),
            document.getElementById("oneUnitiesMinutes"),
            document.getElementById("twoUnitiesMinutes"),
            document.getElementById("fourUnitiesMinutes"),
            document.getElementById("eightUnitiesMinutes"),
        ],
        [
            document.getElementById("oneTensSeconds"),
            document.getElementById("twoTensSeconds"),
            document.getElementById("fourTensSeconds"),
            document.getElementById("oneUnitiesSeconds"),
            document.getElementById("twoUnitiesSeconds"),
            document.getElementById("fourUnitiesSeconds"),
            document.getElementById("eightUnitiesSeconds"),
        ],
    ];

    const clockNumbers = [
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

    const cityInput = document.querySelector(".city-input");

    const optionsLeds = [
        document.querySelector(".option-digital-diode"),
        document.querySelector(".option-weather-diode"),
    ];

    const digitalClock = document.querySelector('.digital-clock');
    const menu = document.querySelector('.menu-button');
    const kiwi = document.querySelector(".fa-kiwi-bird");
    const colorSet = document.querySelectorAll(".color-set-diode");
    const weatherSection = document.querySelector(".weather");

    const weatherIcons = [
        'fa-cloud', 'fa-sun', 'fa-moon', 'fa-cloud-moon', 'fa-cloud-showers-heavy', 'fa-cloud-sun-rain', 'fa-cloud-moon-rain', 'fa-bolt', 'fa-snowflake', 'fa-smog', 'fa-exclamation-triangle',
    ]
    const colors = [
        'red', 'yellow', 'orange', 'mint', 'ice', 'blue', 'purple', 'pink',
    ];

    let weatherApiUpdate; //weather API (set interval)
    let discoBirdInterval; //color change interval
    let tempoColor = 'off'; // color change status (on/off)
    let draw; //current color 

    //current date and time
    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    //load and set local storage options
    const loadOptions = () => {
        if (localStorage.getItem('color') != null) {
            draw = localStorage.getItem('color')
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
    }
    loadOptions();

    //reset all colors before set new one
    const clockDiods = document.querySelectorAll('.clock-diode');
    const texts = document.querySelectorAll('.text');
    const optionsDiods = document.querySelectorAll('.option-diode');

    const reset = () => {

        colors.forEach((color) => {

            clockDiods.forEach((clockDiode) => {
                clockDiode.classList.remove(`${color}Off`);
                clockDiode.classList.remove(`${color}`);
            })

            texts.forEach((text) => {
                text.classList.remove(`${color}Number`)
            })

            optionsDiods.forEach((optionsDiod) => {
                optionsDiod.classList.remove(`${color}Off`)
            })

            menu.classList.remove(color);
            kiwi.classList.remove(`${color}OffNumber`);

        })

    }

    //add colors to all (options, clock, weather...)
    const addColors = () => {
        menu.classList.add(colors[draw]);
        colorSet[draw].classList.add(colors[draw]);
        kiwi.classList.add(`${colors[draw]}OffNumber`);

        clockDiods.forEach((clockDiode) => {
            clockDiode.classList.add(`${colors[draw]}Off`)
        })

        texts.forEach((text) => {
            text.classList.add(`${colors[draw]}Number`)
        })

        optionsDiods.forEach((optionsDiod) => {
            optionsDiod.classList.add(`${colors[draw]}Off`)
        })

    }

    //show time at binary and digital clock
    const showTime = (variable, section, digitalNumber) => {
        let tens = Math.floor(variable / 10);
        let unities = variable - tens * 10;

        digitalNumber[0].textContent = tens;
        digitalNumber[1].textContent = unities;

        if (unities >= 8) {
            section[6].classList.add(colors[draw]);
            unities -= 8
        }
        if (unities >= 4) {
            section[5].classList.add(colors[draw]);
            unities -= 4
        }
        if (unities >= 2) {
            section[4].classList.add(colors[draw]);
            unities -= 2
        }
        if (unities >= 1) {
            section[3].classList.add(colors[draw]);
        }

        if (tens >= 4) {
            section[2].classList.add(colors[draw]);
            tens -= 4
        }
        if (tens >= 2) {
            section[1].classList.add(colors[draw]);
            tens -= 2
        }
        if (tens >= 1) {
            section[0].classList.add(colors[draw]);
        }
    }

    //time set interwal 
    setInterval(() => {
        currentDate = new Date();
        hours = currentDate.getHours();
        minutes = currentDate.getMinutes();
        seconds = currentDate.getSeconds();

        reset();
        addColors();
        showTime(hours, clockDiodes[0], clockNumbers[0]);
        showTime(minutes, clockDiodes[1], clockNumbers[1]);
        showTime(seconds, clockDiodes[2], clockNumbers[2]);
    }, 100);

    //get info from weather API
    const weatherApi = () => {


        //get info from API and set information in HTML
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + encodeURI(cityInput.value) + "&APPID=18a4fba4ee73407fc5b7e49ba72b3fc4")
            .then(resp => resp.json())
            .then(resp => {
                if (resp.cod == 200) {
                    localStorage.setItem('city', cityInput.value);
                }
                const dateSunset = new Date(resp.sys.sunset * 1000);
                const hoursSunset = dateSunset.getHours();
                const minutesSunset = dateSunset.getMinutes();

                const dateSunrise = new Date(resp.sys.sunrise * 1000);
                const hoursSunrise = dateSunrise.getHours();
                const minutesSunrise = dateSunrise.getMinutes();

                const weatherIcon = document.querySelector('.weather-icon');
                const infoTemp = document.querySelector('.info-temp');
                const infoCity = document.querySelector('.info-city');

                const fullInfoTemp = document.querySelector('.full-info-temp');
                const fullInfoWeather = document.querySelector('.full-info-weather');
                const fullInfoPressure = document.querySelector('.full-info-pressure');
                const fullInfoHumidity = document.querySelector('.full-info-humidity');
                const fullInfoCity = document.querySelector('.full-info-city');
                const fullInfoWind = document.querySelector('.full-info-wind');
                const fullInfoSunrise = document.querySelector('.full-info-sunrise');
                const fullInfoSanset = document.querySelector('.full-info-sunset');
                const fullInfoCord = document.querySelector('.full-info-cord');
                const fullInfoUpdate = document.querySelector('.full-info-update');

                infoTemp.textContent = `${round(resp.main.temp - 273.15, 0)}°C`;
                infoCity.textContent = `${resp.name} , ${resp.sys.country}`;


                fullInfoTemp.textContent = `temp: ${round(resp.main.temp - 273.15, 1)}°C , ${round(round(resp.main.temp - 273.15, 1) * 9 / 5 + 32, 1)}°F`;
                fullInfoWeather.textContent = `weather: ${resp.weather[0].description}`;
                fullInfoCity.textContent = `${resp.name}, ${decodeCountry(resp.sys.country)}`;
                fullInfoPressure.textContent = `pressure: ${resp.main.pressure}hPa`;
                fullInfoHumidity.textContent = `humidity: ${resp.main.humidity}%`;
                fullInfoWind.textContent = `wind: ${resp.wind.speed}m/s${delUndefined(resp.wind.deg, `, ${windDirection(resp.wind.deg)} (${resp.wind.deg}deg.)`)}`;
                fullInfoSunrise.textContent = `sunrise: ${addZero(hoursSunrise)}:${addZero(minutesSunrise)}`;
                fullInfoSanset.textContent = `sunset: ${addZero(hoursSunset)}:${addZero(minutesSunset)}`;
                fullInfoCord.textContent = `geo coords: [${resp.coord.lat} , ${resp.coord.lon}]`;
                fullInfoUpdate.textContent = `last update: ${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;

                for (let i = 0; i < weatherIcons.length; i++) {
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
            })
    }
    weatherApi();
    if (!weatherSection.classList.contains('none')) {
        weatherApiUpdate = setInterval(weatherApi, 60000);
    }

    //automatic change of colors
    const discoBird = () => {
        draw++;
        if (draw >= colors.length) {
            draw = 0;
        }
        localStorage.setItem('color', draw);
        for (let o = 0; o < colorSet.length; o++) {
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
    }

    //////////////////////////////////////// event listeners ////////////////////////////////////////

    const colorClick = n => {
        for (let o = 0; o < colorSet.length; o++) {
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
    }

    for (let i = 0; i < colors.length; i++) {
        colorSet[i].addEventListener("click", (e) => {
            e.stopPropagation();
            colorClick(i);
        });
        colorSet[i].addEventListener("touch", (e) => {
            e.stopPropagation();
            colorClick(i);
        });
    }

    const weatherOptionClick = () => {
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
    }

    const optionWeather = document.querySelector('.option-weather');
    optionWeather.addEventListener('click', (e) => {
        e.stopPropagation();
        weatherOptionClick();
    });
    optionWeather.addEventListener('touch', (e) => {
        e.stopPropagation();
        weatherOptionClick()
    });

    cityInput.addEventListener('change', (e) => {
        weatherApi();
    });

    const menuClick = () => {
        const menuWrapper = document.querySelector(".menu-wrapper");

        menuWrapper.classList.toggle('none');
        if (!menuWrapper.classList.contains('none')) menuWrapper.scrollIntoView()
    }

    menu.addEventListener('click', (e) => {
        e.stopPropagation();
        menuClick();
    });
    menu.addEventListener('touch', (e) => {
        e.stopPropagation();
        menuClick();
    });

    const kiwiClick = () => {
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
    }
    kiwi.addEventListener('click', (e) => {
        e.stopPropagation();
        kiwiClick();
    });
    kiwi.addEventListener('touch', (e) => {
        e.stopPropagation();
        kiwiClick();
    });

    const numberOptionClick = () => {
        optionsLeds[0].classList.toggle(colors[draw]);
        digitalClock.classList.toggle('none');

        if (digitalClock.classList.contains('none')) localStorage.setItem('digitalClock', 'off');
        else localStorage.setItem('digitalClock', 'on');

    }

    const digitalOption = document.querySelector('.option-digital');
    digitalOption.addEventListener('click', (e) => {
        e.stopPropagation();
        numberOptionClick();
    });
    digitalOption.addEventListener('touch', (e) => {
        e.stopPropagation();
        numberOptionClick();
    });

    const fullInfo = document.querySelector('.full-info');
    weatherSection.addEventListener('click', (e) => {
        e.stopPropagation();
        fullInfo.classList.toggle('none');
    });
    weatherSection.addEventListener('touch', (e) => {
        e.stopPropagation();
        fullInfo.classList.toggle('none');
    });

    document.addEventListener('click', (e) => {
        fullInfo.classList.add('none');
    });
    document.addEventListener('touch', (e) => {
        fullInfo.classList.add('none');
    });
})();