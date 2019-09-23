const timePlace = document.getElementById('timeplace');
const cityPlace = document.querySelector('.city');
const dataPlace = document.querySelector('#dateplace');
const updated = document.querySelector('.updated');

checkTime();
setInterval(checkTime, 1000*60);

function checkTime() {
    fetch("http://worldtimeapi.org/api/timezone/Europe/Moscow")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            cityPlace.innerHTML = data.timezone;
            return new Date(data.datetime);
        })
        .then(time => {
            timePlace.innerHTML = fixTime(time);
            dataPlace.innerHTML = time.getDate() + ;
            updated.style.visibility = "visible";
            setTimeout(()=>updated.style.visibility = "hidden", 3000);
        })
        .catch(err => console.log(err));
}

function fixTime(time) {
    return (time.getHours()<10 ? "0" : "") + time.getHours() + ':' + (time.getMinutes()<10 ? "0" : "") + time.getMinutes();
}