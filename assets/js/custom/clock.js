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

//show time at analog clock
const showAnalogTime = (hours, minutes, seconds) => {
    const hoursHand = document.querySelector('.hours-hand');
    const minutesHand = document.querySelector('.minutes-hand');
    const secondsHand = document.querySelector('.seconds-hand');

    const changeStyle = (hand, deg) => {
        if (deg != 90) {
            hand.style.transition = `0.2s`;
            hand.style.transitionTimingFunction = 'cubic-bezier(0.1, 2.7, 0.58, 1)';
        } else {
            secondsHand.style.transition = `0s`;
        }
    }

    let hoursDeg = (hours / 12 * 360) + (minutes / 60 * 30) + 90;
    let minutesDeg = minutes / 60 * 360 + 90;
    let secondsDeg = seconds / 60 * 360 + 90;

    secondsHand.style.transform = `translateY(-50%) rotate(${secondsDeg}deg)`;
    changeStyle(secondsHand, secondsDeg);
    minutesHand.style.transform = `translateY(-50%) rotate(${minutesDeg}deg)`;
    changeStyle(minutesHand, minutesDeg);
    hoursHand.style.transform = `translateY(-50%) rotate(${hoursDeg}deg)`;
}