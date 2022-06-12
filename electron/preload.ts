import { contextBridge, ipcRenderer } from 'electron'
import Store from 'electron-store'

const store = new Store()

contextBridge.exposeInMainWorld('electronAPI', {
    ipcSend: <T>(channel: string, msg: T) => ipcRenderer.send(channel, msg),
    ipcOnce: <T>(channel: string, callback: (msg: T) => void) => ipcRenderer.once(channel, (event, messages: T) => {
        callback(messages)
    }),
    ipcOn: <T>(channel: string, callback: (msg: T) => void) => ipcRenderer.on(channel, (event, messages: T) => {
        callback(messages)
    }),
    getStore: <T = string>(key: string): T => {
        return store.get(key) as T
    }

})

