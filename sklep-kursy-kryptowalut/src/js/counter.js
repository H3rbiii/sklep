(()=>{

const runCounter = (endTime) => {
    const counter = document.querySelector("#promotion-counter")

    const getSecondsDate = (date) => {
        const end = new Date(date);
        const seconds = end.getTime()/1000
        const startS = Date.now()/1000

        return seconds - startS;
    }

    const getTimerFormat = seconds => {
        if(seconds <= 0) return "Koniec";
        const h = Math.floor(seconds/3600) 
        const m = Math.floor((seconds - h * 3600) / 60)
        const s = Math.floor(seconds - h * 3600 - m * 60)
        return `${h} godz. ${m} min ${s} s`;
    }
    counter.innerHTML = getTimerFormat(getSecondsDate(endTime));
}
const date = new Date();
date.setHours(date.getHours()+1);
date.setMinutes(date.getMinutes()+35)

const endTime = date.toISOString();

runCounter(endTime);
const interId = setInterval(() => {
    runCounter(endTime);
    if(Date.now() > date.getTime()){
        clearInterval(interId)
    }
}, 1000) 


})();
