const timePlace = document.getElementById('timeplace');
let cityPlace = document.querySelector('select');
const dataPlace = document.querySelector('#dateplace');
const updated = document.querySelector('.updated');

const MONTHS = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

checkTime();
setInterval(checkTime, 1000*60);

function checkTime() {

    fetch("http://worldtimeapi.org/api/timezone/"+cityPlace.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            let offset = +data.utc_offset.slice(0,3);
            let time = new Date(data.datetime);
            time.setHours(time.getHours() + offset);
            return time;
        })
        .then(time => {
            timePlace.innerHTML = fixTime(time);
            dataPlace.innerHTML = time.getUTCDate() + " " + MONTHS[time.getUTCMonth()] + " "  + time.getUTCFullYear() + " года";
            updated.style.visibility = "visible";
            setTimeout(()=>updated.style.visibility = "hidden", 3000);
        })
        .catch(err => console.log(err));
}

function fixTime(time) {
    return (time.getUTCHours() < 10 ? "0" : "") + time.getUTCHours() + ':' + (time.getUTCMinutes()<10 ? "0" : "") + time.getUTCMinutes();
}

cityPlace.addEventListener("change", checkTime);