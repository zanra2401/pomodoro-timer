const timer = document.getElementById("timer")
const pause = document.getElementById("pause")
const resume = document.getElementById("resume")
const start = document.getElementById("start")
const setting = document.getElementById("setting")


class Timer {
    music = "../js/test.mp3"
    started = 0
    rest = 0
    work = 0
    time = 0
    timenow = 0
    isPaused = false
    status = "work"

    constructor(name, time){
        this.name = name
        this.rest = (time.rest > 300 ? 300 : time.rest) * (60 * 1000)
        this.work = (time.work > 300 ? 300 : time.work) * (60 * 1000)
    }

    start(time = 0) {
        this.time = time != 0 ? time : this.status === "work" ? this.work : this.rest
        this.timenow = 0
        const audio = new Audio(this.music)
        this.started = Date.now()
        console.log(this.timenow)
        this.timer = setInterval(() => {
            this.timenow += 1000
            if (this.timenow >= this.time){
                this.time = this.time
                audio.play()
                this.status = this.status == "work" ? "rest" : "work"
                clearInterval(this.timer)
            }
        },1000)
    }

    pause(){
        this.time = this.time - this.timenow
        this.isPaused = true
        this.timenow = 0
        clearInterval(this.timer)
    }

    resume(){
        this.start(this.time)
    }

    setPause(con){
        this.isPaused = con
    }
}

function readSetting(){
    let res = fs.readFile(fs.pathJson("/src/asset/setting.json"))
    return res
}

console.log(readSetting())

const timerRest = new Timer("REST", readSetting())

function convertTime() {
    let time = []
    time.push((timerRest.time - timerRest.timenow) > 60 * (60 * 1000) ? Math.floor((timerRest.time - timerRest.timenow) / 60 * (60 * 1000)) : 0)
    let dif = (timerRest.time - timerRest.timenow) > 60 * (60 * 1000) ? (timerRest.time - timerRest.timenow) - (Math.floor((timerRest.time - timerRest.timenow) / 60 * (60 * 1000)) * (60 * (60 * 1000))) : timerRest.time - timerRest.timenow
    time.push(dif > 60 * 1000 ? Math.floor(dif / (60 * 1000)) : 0)
    dif = dif > 60 * 1000 ? dif - (Math.floor(dif / (60 * 1000)) * (60 * 1000)) : dif
    time.push(dif > 1000 ? Math.floor(dif / 1000) : 0)
    return time
}

function updateTime() {
    let clock = setInterval(() => {
        if(timerRest.isPaused === true){
            clearInterval(clock)
        }
        const time = convertTime()
        console.log(time)
        if(this.timenow != 0) timer.innerHTML = `${time[0].toString().padStart(2, '0')}:${time[1].toString().padStart(2, '0')}:${time[2].toString().padStart(2, '0')}`
    }, 1000)
}

start.addEventListener("click", async () => {
    updateTime()
    timerRest.start()
})

pause.addEventListener("click", () => {
    timerRest.pause()
    const time = convertTime()
    timer.innerHTML = `${time[0].toString().padStart(2, '0')}:${time[1].toString().padStart(2, '0')}:${time[2].toString().padStart(2, '0')}`
})

resume.addEventListener("click", () => {
    timerRest.resume()
    timerRest.setPause(false)
    updateTime()
})

setting.addEventListener('click', () => {
    window.global_function.setting()
})
