const clock = document.querySelector(".js-clock");
function getTime(){
    const time = new Date();
    const hour = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();
    clock.innerHTML = hour +":" + minutes + ":"+seconds;

    clock.innerText = `${hour < 10 ? `0${hour}` : hour}시 ${minutes < 10 ? `0${minutes}` : minutes}분 ${seconds < 10 ? `0${seconds}` : seconds}초`;
}

function init(){
setInterval(getTime, 1000);
}

init();