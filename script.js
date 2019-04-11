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
            document.querySelector(".airQuality"),
        ],
    ];
    const optionsLeds = [
        document.querySelector(".numberOptionLed"),
        document.querySelector(".airQualityLed"),
    ];
    const menu = document.getElementById('menu');
    const options = document.querySelector(".options");

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

    let draw;
    draw = Math.random() * 7;
    draw = Math.round(draw);

    let classOn = colors[draw];
    let classOff = classOn + 'Off';
    let classNumber = classOn + 'Number'

    menuLeds[draw].classList.add(classOn);

    for (let i = 0; i < colors.length; i++) {
        menuLeds[i].addEventListener("click", function (e) {
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
        });
    }

    optionsLeds[0].classList.add(classOff);
    leds[6][0].addEventListener('click', function (e) {
        for (let i = 0; i < optionsLeds[i].length; i++) {
            for (let o = 0; o < colors.length; o++) {
                optionsLeds[i].classList.remove(colors[o]);
            }
        }
        optionsLeds[0].classList.toggle(classOn);

        for (let i = 0; i < leds[3].length; i++) {
            leds[3][i].classList.toggle('none');
            leds[4][i].classList.toggle('none');
            leds[5][i].classList.toggle('none');
        }
    });
    leds[6][0].addEventListener('touch', function (e) {
        for (let i = 0; i < optionsLeds[i].length; i++) {
            for (let o = 0; o < colors.length; o++) {
                optionsLeds[i].classList.remove(colors[o]);
            }
        }
        optionsLeds[0].classList.toggle(classOn);

        for (let i = 0; i < leds[3].length; i++) {
            leds[3][i].classList.toggle('none');
            leds[4][i].classList.toggle('none');
            leds[5][i].classList.toggle('none');
        }
    });

    menu.addEventListener('click', function (e) {
        options.classList.toggle('none');
    });
    menu.addEventListener('touch', function (e) {
        options.classList.toggle('none');
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
        let currentDate = new Date();
        let hours = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let seconds = currentDate.getSeconds();

        reset();
        showTime(hours, leds[0], leds[3]);
        showTime(minutes, leds[1], leds[4]);
        showTime(seconds, leds[2], leds[5]);
    }, 100);


    const url = "https://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/129";

    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.send();

})();