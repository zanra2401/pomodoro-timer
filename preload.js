
const os = require("os")
const fs = require("fs-extra")
const path = require("node:path")
const { contextBridge, ipcRenderer } = require("electron")


contextBridge.exposeInMainWorld('versions', {
    app : () => "1.0.0"
})

contextBridge.exposeInMainWorld('fs', {
    writeFile: (path, json, err) => {
        fs.writeJson(path, JSON.parse(json), 'utf-8').then(() => { console.log("success")
        })
        .catch((err) => {
            console.log(err)
        })
    },
    pathJson: (arg) => path.join(__dirname, arg),
    readFile: (path) => {
        const data = fs.readJsonSync(path, {throws: false})
        return data
    }
})

contextBridge.exposeInMainWorld('global_function', {
    setting: () => ipcRenderer.invoke('setting'),
    closeSetting: () => ipcRenderer.invoke('closeSetting')
})