import { BrowserWindow, ipcMain } from 'electron'

/**
 * @description 进程通讯 渲染进程点击顶部关闭,最小化...按钮时,传递 {val}参数,
 * 主进程通过 BrowserWindow.fromWebContents(event.sender)拿到活动窗口的BrowserWindow实例,再通过minimize()等实例方法操作窗口
 * @param {Electron.WebContents} event.sender
 * @param val {'mini'|'big'|'close'}
 * */

export const onNavbar = () => {
    ipcMain.on('navbar', (event, val: string) => {
        /**
         * 通过BrowserWindow.fromWebContents方法拿到window实例
         * event.sender 是发送消息的WebContents实例
         */
        const window = BrowserWindow.fromWebContents(event.sender)

        if (val === 'mini') window?.minimize()
        if (val === 'close') window?.close()
        if (val === 'big') {
            window?.isMaximized() ? window?.unmaximize() : window?.maximize()
            window?.webContents.send('isMaximized', window?.isMaximized())
        }
    })
}
