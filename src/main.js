const { app, BrowserWindow } = require('electron');
const path = require('path');
const startServer = require(path.join(__dirname,'../Server/server'));


let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, '../Renderer/renderer.js'),
            nodeIntegration: true,
            contextIsolation: false // Dependendo da configuração, isso pode ser necessário
        },
    });

    // Carregar o arquivo HTML
    mainWindow.loadFile(path.join(__dirname,'../public/index.html'));
    mainWindow.maximize();
}

app.whenReady().then(() => {
    startServer();
    createWindow();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});


