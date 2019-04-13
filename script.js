(function () {
    const leds = [
        [
            document.querySelector(".oneTensHours"),
            document.querySelector(".twoTensHours"),
            document.querySelector(".fourTensHours"),
            document.querySelector(".oneUnitesHours"),
            document.querySelector(".twoUnitesHours"),
            document.querySelector(".fourUnitesHours"),
            document.querySelector(".eightUnitesHours"),
        ],
        [
            document.querySelector(".oneTensMinutes"),
            document.querySelector(".twoTensMinutes"),
            document.querySelector(".fourTensMinutes"),
            document.querySelector(".oneUnitiesMinutes"),
            document.querySelector(".twoUnitiesMinutes"),
            document.querySelector(".fourUnitiesMinutes"),
            document.querySelector(".eightUnitiesMinutes"),
        ],
        [
            document.querySelector(".oneTensSeconds"),
            document.querySelector(".twoTensSeconds"),
            document.querySelector(".fourTensSeconds"),
            document.querySelector(".oneUnitiesSeconds"),
            document.querySelector(".twoUnitiesSeconds"),
            document.querySelector(".fourUnitiesSeconds"),
            document.querySelector(".eightUnitiesSeconds"),
        ],
        [
            document.querySelector(".tensHours"),
            document.querySelector(".unitesHours"),
        ],
        [
            document.querySelector(".tensMinutes"),
            document.querySelector(".unitesMinutes"),
        ],
        [
            document.querySelector(".tensSeconds"),
            document.querySelector(".unitesSeconds"),
        ],
        [
            document.querySelector(".numberOption"),
            document.querySelector(".weatherOption"),
            document.querySelector(".temp"),
            document.querySelector(".weatherIcon"),
            document.querySelector(".pressure"),
            document.querySelector(".city"),
        ],
    ];
    const optionsLeds = [
        document.querySelector(".numberOptionLed"),
        document.querySelector(".weatherOptionLed"),
    ];
    const weatherIcons = [
        'fa-cloud',
        'fa-sun',
        'fa-fa-moon',
        'fa-cloud-moon',
        'fa-cloud-showers-heavy',
        'fa-cloud-sun-rain',
        'fa-cloud-moon-rain',
        'fa-bolt',
        'fa-snowflake',
        'fa-smog',
    ]
    const menu = document.getElementById('menu');
    const options = document.querySelector(".options");
    const weatherSection = document.querySelector(".weather");

    const colors = [
        'red',
        'yellow',
        'green',
        'mint',
        'ice',
        'blue',
        'purple',
        'pink',
    ];

    const menuLeds = [
        document.querySelector(".wheel1"),
        document.querySelector(".wheel2"),
        document.querySelector(".wheel3"),
        document.querySelector(".wheel4"),
        document.querySelector(".wheel5"),
        document.querySelector(".wheel6"),
        document.querySelector(".wheel7"),
        document.querySelector(".wheel8"),
    ];
    const ledsOff = [
        document.getElementById('ledsOff1'),
        document.getElementById('ledsOff2'),
        document.getElementById('ledsOff3'),
        document.getElementById('ledsOff4'),
        document.getElementById('ledsOff5'),
        document.getElementById('ledsOff6'),
        document.getElementById('ledsOff7'),
        document.getElementById('ledsOff8'),
        document.getElementById('ledsOff9'),
        document.getElementById('ledsOff10'),
        document.getElementById('ledsOff11'),
        document.getElementById('ledsOff12'),
        document.getElementById('ledsOff13'),
        document.getElementById('ledsOff14'),
        document.getElementById('ledsOff15'),
        document.getElementById('ledsOff16'),
        document.getElementById('ledsOff17'),
        document.getElementById('ledsOff18'),
        document.getElementById('ledsOff19'),
        document.getElementById('ledsOff20'),
        document.getElementById('ledsOff21'),
        document.getElementById('ledsOff22'),
        document.getElementById('ledsOff23'),
        document.getElementById('ledsOff24'),
    ]
    let classOn;
    let draw;

    if (localStorage.getItem('color') != null) {
        draw = localStorage.getItem('color')
    } else {
        draw = Math.random() * 7;
        draw = Math.round(draw);
    }

    classOn = colors[draw];
    let classOff = classOn + 'Off';
    let classNumber = classOn + 'Number'

    let currentDate = new Date();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let seconds = currentDate.getSeconds();

    if (localStorage.getItem('city') != null) {
        leds[6][5].value = localStorage.getItem('city');
    } else {
        leds[6][5].value = 'Wrocław';
    }

    menuLeds[draw].classList.add(classOn);

    for (let i = 0; i < colors.length; i++) {
        menuLeds[i].addEventListener("click", function (e) {
            classOn = colors[i];
            classOff = colors[i] + 'Off';
            classNumber = colors[i] + 'Number'
            for (let o = 0; o < menuLeds.length; o++) {
                menuLeds[o].classList.remove(colors[o]);
                optionsLeds[0].classList.remove(colors[o]);
                optionsLeds[1].classList.remove(colors[o]);
            }
            menuLeds[i].classList.add(colors[i]);

            if (leds[3][0].classList[1] == 'none') {
                optionsLeds[0].classList.add(classOff);
            } else {
                optionsLeds[0].classList.add(classOn);
            }

            if (weatherSection.classList[1] != 'none') {
                optionsLeds[1].classList.add(classOn);
            }
            localStorage.setItem('color', i);
        });
        menuLeds[i].addEventListener("touch", function (e) {
            classOn = colors[i];
            classOff = colors[i] + 'Off';
            classNumber = colors[i] + 'Number'
            for (let o = 0; o < menuLeds.length; o++) {
                menuLeds[o].classList.remove(colors[o]);
                optionsLeds[0].classList.remove(colors[o]);
            }
            menuLeds[i].classList.add(colors[i]);

            if (leds[3][0].classList[1] == 'none') {
                optionsLeds[0].classList.add(classOff);
            } else {
                optionsLeds[0].classList.add(classOn);
            }
            localStorage.setItem('color', classOn);
        });
    }
    if (localStorage.getItem('digitalClock') == 'on') {
        for (let i = 0; i < leds[3].length; i++) {
            leds[3][i].classList.remove('none');
            leds[4][i].classList.remove('none');
            leds[5][i].classList.remove('none');
            optionsLeds[0].classList.add(classOn);
        }
    } else {
        for (let i = 0; i < leds[3].length; i++) {
            leds[3][i].classList.add('none');
            leds[4][i].classList.add('none');
            leds[5][i].classList.add('none');
            optionsLeds[0].classList.remove(classOff);
        }
    }
    leds[6][0].addEventListener('click', function (e) {
        optionsLeds[0].classList.toggle(classOn);

        for (let i = 0; i < leds[3].length; i++) {
            leds[3][i].classList.toggle('none');
            leds[4][i].classList.toggle('none');
            leds[5][i].classList.toggle('none');
        }
        if (leds[3][0].classList[2] == 'none') {
            localStorage.setItem('digitalClock', 'off');
        } else {
            localStorage.setItem('digitalClock', 'on');
        }
    });
    leds[6][0].addEventListener('touch', function (e) {
        optionsLeds[0].classList.toggle(classOn);

        for (let i = 0; i < leds[3].length; i++) {
            leds[3][i].classList.toggle('none');
            leds[4][i].classList.toggle('none');
            leds[5][i].classList.toggle('none');
        }
        if (leds[3][0].classList[2] == 'none') {
            localStorage.setItem('digitalClock', 'off');
        } else {
            localStorage.setItem('digitalClock', 'on');
        }
    });

    if (localStorage.getItem('weather') == 'off') {
        weatherSection.classList.add('none');
        optionsLeds[1].classList.add(classOff);
    } else {
        weatherSection.classList.remove('none');
        optionsLeds[1].classList.add(classOn);
    }
    leds[6][1].addEventListener('click', function (e) {
        optionsLeds[1].classList.toggle(classOn);
        weatherSection.classList.toggle('none');
        if (weatherSection.classList[1] != 'none') {
            weatherApi();
        }
        if (weatherSection.classList[1] == 'none') {
            localStorage.setItem('weather', 'off');
        } else {
            localStorage.setItem('weather', 'on');
        }
    });
    leds[6][1].addEventListener('touch', function (e) {
        optionsLeds[1].classList.toggle(classOn);
        weatherSection.classList.toggle('none');
        if (weatherSection.classList[1] != 'none') {
            weatherApi();
        }
    });

    leds[6][5].addEventListener('change', function (e) {
        weatherApi();
        localStorage.setItem('city', leds[6][5].value);
    });

    menu.addEventListener('click', function (e) {
        e.stopPropagation;
        options.classList.toggle('none');
        if (options.classList[1] != 'none') {
            options.scrollIntoView()
        }
    });
    menu.addEventListener('touch', function (e) {
        e.stopPropagation;
        options.classList.toggle('none');
        if (options.classList[1] != 'none') {
            options.scrollIntoView()
        }
    });

    function showTime(variable, section, sectionNumber) {
        menu.classList.add(classOn);
        for (let i = 0; i < ledsOff.length; i++) {
            ledsOff[i].classList.add(classOff);
        }
        for (let i = 0; i < leds[3].length; i++) {
            leds[3][i].classList.add(classNumber);
            leds[4][i].classList.add(classNumber);
            leds[5][i].classList.add(classNumber);
        }
        for (let i = 0; i < leds[6].length; i++) {
            leds[6][i].classList.add(classNumber);
        }
        for (let i = 0; i < optionsLeds.length; i++) {
            optionsLeds[i].classList.add(classOff);
        }

        let tens = variable / 10
        tens = Math.floor(tens);
        let unities = variable - tens * 10;

        sectionNumber[0].textContent = tens;
        sectionNumber[1].textContent = unities;

        if (unities >= 8) {
            section[6].classList.add(classOn);
            unities = unities - 8
        }
        if (unities >= 4) {
            section[5].classList.add(classOn);
            unities = unities - 4
        }
        if (unities >= 2) {
            section[4].classList.add(classOn);
            unities = unities - 2
        }
        if (unities >= 1) {
            section[3].classList.add(classOn);
        }

        if (tens >= 4) {
            section[2].classList.add(classOn);
            tens = tens - 4
        }
        if (tens >= 2) {
            section[1].classList.add(classOn);
            tens = tens - 2
        }
        if (tens >= 1) {
            section[0].classList.add(classOn);
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
        for (let i = 0; i < ledsOff.length; i++) {
            for (let o = 0; o < colors.length; o++) {
                ledsOff[i].classList.remove(colors[o] + 'Off');
            }
        }
        for (let i = 0; i < leds[3].length; i++) {
            for (let o = 0; o < colors.length; o++) {
                leds[3][i].classList.remove(colors[o] + 'Number');
                leds[4][i].classList.remove(colors[o] + 'Number');
                leds[5][i].classList.remove(colors[o] + 'Number');
            }
        }
        for (let i = 0; i < leds[6].length; i++) {
            for (let o = 0; o < colors.length; o++) {
                leds[6][i].classList.remove(colors[o] + 'Number');
            }
        }
        for (let i = 0; i < optionsLeds.length; i++) {
            for (let o = 0; o < colors.length; o++) {
                optionsLeds[i].classList.remove(colors[o] + 'Off');
            }
        }
        for (let i = 0; i < colors.length; i++) {
            menu.classList.remove(colors[i]);
        }
    }

    setInterval(function () {
        currentDate = new Date();
        hours = currentDate.getHours();
        minutes = currentDate.getMinutes();
        seconds = currentDate.getSeconds();

        reset();
        showTime(hours, leds[0], leds[3]);
        showTime(minutes, leds[1], leds[4]);
        showTime(seconds, leds[2], leds[5]);

    }, 100);

    function weatherApi() {
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + leds[6][5].value + "&APPID=18a4fba4ee73407fc5b7e49ba72b3fc4";
        console.log(url);
        let api = new XMLHttpRequest;
        api.open("GET", url, false);
        api.send();

        let apiJson = JSON.parse(api.responseText);

        leds[6][2].textContent = Math.round(apiJson.main.temp - 273.15) + ' °C';
        leds[6][4].textContent = Math.round(apiJson.main.pressure) + ' hPa';

        let sunet = apiJson.sys.sunset;
        let dateSunset = new Date(sunet * 1000);
        let hoursSunset = dateSunset.getHours();

        let sunrise = apiJson.sys.sunrise;
        let dateSunrise = new Date(sunrise * 1000);
        let hoursSunrise = dateSunrise.getHours();

        console.log();

        for (i = 0; i < weatherIcons.length; i++) {
            leds[6][3].classList.remove(weatherIcons[i]);
        }

        if (apiJson.weather[0].id >= 802 && apiJson.weather[0].id < 900) {
            leds[6][3].classList.add('fa-cloud');
        }
        if (apiJson.weather[0].id == 800) {
            if (hours <= hoursSunset && hours >= hoursSunrise) {
                leds[6][3].classList.add('fa-sun');
            } else {
                leds[6][3].classList.add('fas', 'fa-moon');
            }
        }
        if (apiJson.weather[0].id == 801) {
            if (hours <= hoursSunset && hours >= hoursSunrise) {
                leds[6][3].classList.add('fa-cloud-sun');
            } else {
                leds[6][3].classList.add('fas', 'fa-cloud-moon');
            }
        }
        if (apiJson.weather[0].id >= 502 && apiJson.weather[0].id < 600 || apiJson.weather[0].id >= 300 && apiJson.weather[0].id < 400) {
            leds[6][3].classList.add('fa-cloud-showers-heavy');
        }
        if (apiJson.weather[0].id >= 500 && apiJson.weather[0].id < 502) {
            if (hours <= hoursSunset && hours >= hoursSunrise) {
                leds[6][3].classList.add('fa-cloud-sun-rain');
            } else {
                leds[6][3].classList.add('fa-cloud-moon-rain');
            }
        }
        if (apiJson.weather[0].id >= 200 && apiJson.weather[0].id < 300) {
            leds[6][3].classList.add('fa-bolt');
        }
        if (apiJson.weather[0].id >= 600 && apiJson.weather[0].id < 700) {
            leds[6][3].classList.add('fa-snowflake');
        }
        if (apiJson.weather[0].id >= 700 && apiJson.weather[0].id < 800) {
            leds[6][3].classList.add('fa-smog');
        }
    }

    weatherApi();
    if (weatherSection.classList[1] != 'none') {
        setInterval(function () {
            weatherApi();
        }, 300000);
    }
})();