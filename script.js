(function() {
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
        ];
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

        menuLeds[draw].classList.add(classOn);

        for (let i=0; i<colors.length; i++) {
            menuLeds[i].addEventListener("click", function(){
                classOn = colors[i];
                classOff = colors[i] + 'Off';
                for (let o=0; o<menuLeds.length; o++) {
                    menuLeds[o].classList.remove(colors[o]);
                }
                menuLeds[i].classList.add(colors[i]);
            });
            menuLeds[i].addEventListener("touch", function(){
                classOn = colors[i];
                classOff = colors[i] + 'Off';
                for (let o=0; o<menuLeds.length; o++) {
                    menuLeds[o].classList.remove(colors[o]);
                }
                menuLeds[i].classList.add(colors[i]);
            });
        }

        function showTime(variable, section){
            for (let i=0; i<ledsOff.length; i++) {
                ledsOff[i].classList.add(classOff);
            }

            let tens = variable / 10
            tens = Math.floor(tens);
            let unities = variable - tens * 10;

            if(unities >= 8){
                section[6].classList.add(classOn);
                unities = unities - 8
            }
            if(unities >= 4){
                section[5].classList.add(classOn);
                unities = unities - 4
            }
            if(unities >= 2){
                section[4].classList.add(classOn);
                unities = unities - 2
            }
            if(unities >= 1){
                section[3].classList.add(classOn);
            }

            if(tens >= 4){
                section[2].classList.add(classOn);
                tens = tens - 4
            }
            if(tens >= 2){
                section[1].classList.add(classOn);
                tens = tens - 2
            }
            if(tens >= 1){
                section[0].classList.add(classOn);
            }
        }

        function reset(){
            for (let i=0; i<leds.length; i++) {
                for (let o=0; o<leds[i].length; o++) {
                    for (let z=0; z<colors.length; z++) {
                        leds[i][o].classList.remove(colors[z]);
                    }
                }
            }
            for (let i=0; i<ledsOff.length; i++) {
                for (let o=0; o<colors.length; o++) {
                    ledsOff[i].classList.remove(colors[o] + 'Off');
                }
            }

        }

        setInterval(function(){ 
            let currentDate = new Date();
            let hours = currentDate.getHours();
            let minutes = currentDate.getMinutes();
            let seconds = currentDate.getSeconds();

            reset();
            showTime(hours, leds[0]);
            showTime(minutes, leds[1]);
            showTime(seconds, leds[2]);
         }, 100);
})();