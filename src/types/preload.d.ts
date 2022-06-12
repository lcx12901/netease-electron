export interface IElectronAPI {
    // 发送消息到主进程
    ipcSend: <T>(channel: string, msg: T) => void
    ipcOnce: <T>(channel: string, callback: (msg: T) => void) => void
    ipcOn: <T>(channel: string, callback: (msg: T) => void) => void
    getStore: <T = string>(key: string) => T
}

declare global {
    interface Window {
        electronAPI: IElectronAPI
    }
}
