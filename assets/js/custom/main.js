const hoursDiodes = document.querySelectorAll('#hours-diode');
const minutesDiodes = document.querySelectorAll('#minutes-diode');
const secondsDiodes = document.querySelectorAll('#seconds-diode');

const hoursNumbers = document.querySelectorAll('#hours');
const minutesNumbers = document.querySelectorAll('#minutes');
const secondsNumbers = document.querySelectorAll('#seconds');

const cityInput = document.querySelector('.city-input');
const options = document.querySelectorAll('.option');
const sections = document.querySelectorAll('.section');

const optionDiods = document.querySelectorAll('.option-diode');

const digitalClock = document.querySelector('.digital-clock');
const menu = document.querySelector('.menu-button');
const kiwi = document.querySelector('.fa-kiwi-bird');
const colorSet = document.querySelectorAll(".color-set-diode");
const weatherSection = document.querySelector(".weather");

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
    if (!localStorage.getItem(`section0`)) localStorage.setItem(`section0`, 'on');

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

    sections.forEach((section, index) => {
        if (localStorage.getItem(`section${index}`) == 'on') {
            section.classList.remove('none');
            optionDiods[index].classList.add(colors[draw]);
        } else {
            section.classList.add('none');
            optionDiods[index].classList.remove(colors[draw] + 'Off');
        }

    });
}
loadOptions();

//reset all colors before set new one
const clockDiods = document.querySelectorAll('.clock-diode');
const texts = document.querySelectorAll('.text');
const blocks = document.querySelectorAll('.block');

const resetColors = () => {

    colors.forEach((color) => {

        clockDiods.forEach((clockDiode) => {
            clockDiode.classList.remove(`${color}Off`);
            clockDiode.classList.remove(`${color}`);
        })

        texts.forEach((text) => {
            text.classList.remove(`${color}Number`)
        })

        blocks.forEach((block) => {
            block.classList.remove(`${color}`)
        })

        optionDiods.forEach((optionDiod) => {
            optionDiod.classList.remove(`${color}Off`)
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

    blocks.forEach((block) => {
        block.classList.add(`${colors[draw]}`)
    })

    optionDiods.forEach((diode) => {
        diode.classList.add(`${colors[draw]}Off`)
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

const showAnalogTime = (hours, minutes, seconds) => {
    const hoursHand = document.querySelector('.hours-hand');
    const minutesHand = document.querySelector('.minutes-hand');
    const secondsHand = document.querySelector('.seconds-hand');

    const changeStyle = (hand, deg) => {
        if (deg != 90) {
            hand.style.transition = `0.3s`;
            hand.style.transitionTimingFunction = 'cubic-bezier(0.1, 2.7, 0.58, 1)';
        } else {
            secondsHand.style.transition = `0s`;
        }
    }

    let hoursDeg = (hours / 12 * 366) + (minutes / 60 * 30) + 90;
    let minutesDeg = minutes / 60 * 366 + 90;
    let secondsDeg = seconds / 60 * 366 + 90;

    secondsHand.style.transform = `translateY(-50%) rotate(${secondsDeg}deg)`;
    changeStyle(secondsHand, secondsDeg);
    minutesHand.style.transform = `translateY(-50%) rotate(${minutesDeg}deg)`;
    changeStyle(minutesHand, minutesDeg);
    hoursHand.style.transform = `translateY(-50%) rotate(${hoursDeg}deg)`;
}

//time interwal 
setInterval(() => {
    currentDate = new Date();
    hours = currentDate.getHours();
    minutes = currentDate.getMinutes();
    seconds = currentDate.getSeconds();

    resetColors();
    addColors();
    showTime(hours, hoursDiodes, hoursNumbers);
    showTime(minutes, minutesDiodes, minutesNumbers);
    showTime(seconds, secondsDiodes, secondsNumbers);

    showAnalogTime(hours, minutes, seconds);
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


            changeIcon(resp.weather[0].icon);

        })
}

weatherApi();
if (!weatherSection.classList.contains('none')) {
    weatherApiUpdate = setInterval(weatherApi, 60000);
}

//automatic change of colors
const discoBird = () => {
    draw++;
    if (draw >= colors.length) draw = 0;

    colorClick(draw);
}

//////////////////////////////////////// event listeners ////////////////////////////////////////

const colorClick = n => {
    colors.forEach((color, index) => {
        colorSet[index].classList.remove(color);
        optionDiods.forEach((option) => {
            option.classList.remove(color);
        });
        kiwi.classList.remove(`${color}Number`);
    });

    colorSet[n].classList.add(colors[n]);
    if (tempoColor == 'on') kiwi.classList.add(`${colors[n]}Number`);

    sections.forEach((section, index) => {
        if (!section.classList.contains('none')) {
            optionDiods[index].classList.add(colors[n]);
        }
    });

    localStorage.setItem('color', n);
    draw = n;
}

colorSet.forEach((diode, index) => {
    diode.addEventListener("click", (e) => {
        e.stopPropagation();
        colorClick(index);
    });
    diode.addEventListener("touch", (e) => {
        e.stopPropagation();
        colorClick(index);
    });
})




const numberOptionClick = (n) => {
    optionDiods[n].classList.toggle(colors[draw]);
    sections[n].classList.toggle('none');

    if (sections[n].classList.contains('none')) localStorage.setItem(`section${n}`, 'off');
    else localStorage.setItem(`section${n}`, 'on');

}

options.forEach((option, index) => {
    option.addEventListener('click', (e) => {
        e.stopPropagation();
        numberOptionClick(index);
    });
    option.addEventListener('touch', (e) => {
        e.stopPropagation();
        numberOptionClick(index);
    });
})

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