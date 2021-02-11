const timePlace = document.getElementById('timeplace');
let cityPlace = document.querySelector('select');
const dataPlace = document.querySelector('#dateplace');
const updated = document.querySelector('.updated');
const btn = document.getElementById('timeFormat');
const format = btn.querySelector('span');

function timeFormat() {
  let format = 24;
  function getFormat() {
    return format;
  }
  
  function toggleFormat() {
    format = format === 24 ? 12 : 24;
    return format;
  }
  
  return {
    get: getFormat,
    toggle: toggleFormat,
  }
}

const timeFormatUtil = timeFormat();

const MONTHS = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];

checkTime();
setInterval(checkTime, 1000 * 60);

function checkTime() {
    fetch("https://worldtimeapi.org/api/timezone/" + cityPlace.value)
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
            setTimeout(() => updated.style.visibility = "hidden", 3000);
        })
        .catch(err => console.log(err));
}

function fixTime(time) {
    time.setUTCHours(time.getUTCHours() % timeFormatUtil.get());
    return (time.getUTCHours() < 10 ? "0" : "") + time.getUTCHours() + ':' + (time.getUTCMinutes()<10 ? "0" : "") + time.getUTCMinutes();
}

cityPlace.addEventListener("change", checkTime);
btn.addEventListener("click", ()=>{
    format.innerHTML = String(timeFormatUtil.toggle());
    checkTime();
});
