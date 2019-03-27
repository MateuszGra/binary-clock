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

        function showTime(variable, section){
            let tens = variable / 10
            tens = Math.floor(tens);
            let unities = variable - tens * 10;

            if(unities >= 8){
                section[6].classList.add('on');
                unities = unities - 8
            }
            if(unities >= 4){
                section[5].classList.add('on');
                unities = unities - 4
            }
            if(unities >= 2){
                section[4].classList.add('on');
                unities = unities - 2
            }
            if(unities >= 1){
                section[3].classList.add('on');
            }

            if(tens >= 4){
                section[2].classList.add('on');
                tens = tens - 4
            }
            if(tens >= 2){
                section[1].classList.add('on');
                tens = tens - 2
            }
            if(tens >= 1){
                section[0].classList.add('on');
            }
        }

        function reset(){
            for (let i=0; i<leds.length; i++) {
                for (let o=0; o<leds[i].length; o++) {
                    leds[i][o].classList.remove('on');
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