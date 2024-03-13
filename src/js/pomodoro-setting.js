const closeButton = document.getElementById("close")
const rest = document.getElementById("restTimer")
const workTimer = document.getElementById("workTimer")
const apply = document.getElementById("apply")

closeButton.addEventListener("click", () => {
    window.global_function.closeSetting()
})

apply.addEventListener('click', () => {
    let jsonData = {
        rest: parseInt(rest.value),
        work: parseInt(workTimer.value)
    }

    fs.writeFile(fs.pathJson("/src/asset/setting.json"), JSON.stringify(jsonData, null, 2))
})


