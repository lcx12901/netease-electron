import { app, BrowserWindow, session, ipcMain } from 'electron'
import * as path from 'path'
import Store from 'electron-store'
import installExtension, {VUEJS_DEVTOOLS} from 'electron-devtools-installer'
import {onNavbar} from "./utils/onNavbar"

let windowId = {
    main: 0
}

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1020,
        height: 670,
        minWidth: 1020,
        minHeight: 670,
        transparent: true,
        frame: false,
        show: false, // 页面加载完再显示窗口
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join(__dirname, '../electron/preload.js'),
        },
    })
    windowId.main = win.id
    if (app.isPackaged) {
        win.loadFile(path.join(__dirname, '../index.html')).then(r => {});
    } else {
        //  Use ['ENV_NAME'] avoid vite:define plugin
        const url = `http://${process.env['VITE_DEV_SERVER_HOST']}:${process.env['VITE_DEV_SERVER_PORT']}`;

        win.loadURL(url).then(r => {})
    }

    win.webContents.on('did-frame-finish-load', () => {
        installExtension(VUEJS_DEVTOOLS)
            .then((name) => console.log(`Added Extension:  ${name}`))
        win.webContents.openDevTools()
        win.webContents.once('devtools-opened', () => {
            win.focus()
        })
    })

    win.on('ready-to-show', async () => {
        win.show()
    })

    // 取消顶部导航栏右键菜单
    win.hookWindowMessage(278, () => {
        win.setEnabled(false)
        setTimeout(() => win.setEnabled(true), 100)
        return true
    })
    win.on('will-move', (event) => {
        if (win.isMaximized()) {
            win.unmaximize()
            win?.webContents.send('isMaximized', false)
        }
    })

};
app.whenReady().then(() => {
    // 创建窗口
    createWindow()
    // 绑定窗口按钮事件
    onNavbar()
    // 初始化本地存储
    Store.initRenderer()
    // 获取主窗口实例
    const mainWindow = BrowserWindow.fromId(windowId.main)
    // 监听窗口尺寸改变
    mainWindow?.on('resized', () => {
        mainWindow?.webContents.send('isMaximized', mainWindow.isMaximized())
    })

    app.on('activate', () => {

        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})
