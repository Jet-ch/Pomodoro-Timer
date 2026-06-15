// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
//Creates a safe bridge between the webpage and electron's main process, its like a middle man

const { contextBridge, ipcRenderer } = require('electron');

//Creates a safe API that the webpage can use
contextBridge.exposeInMainWorld('electronAPI', {
    navigate: (page) => {
        ipcRenderer.invoke('navigate', page);
    },
    setSessionData: (key, value) => {
        return ipcRenderer.invoke('set-session-data', key, value);
    },
    getSessionData: (key) => {
        return ipcRenderer.invoke('get-session-data', key);
    },
    clearSessionData: () => {
        return ipcRenderer.invoke('clear-session-data');
    },
    closeApp: () => ipcRenderer.invoke('close-app'),
    minimizeApp: () => ipcRenderer.invoke('minimize-app')  // add this
});


closeApp: () => ipcRenderer.invoke('close-app')