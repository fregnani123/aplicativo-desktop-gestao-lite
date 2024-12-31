const { app, ipcMain, BrowserWindow, Menu } = require('electron');
const path = require('path');
const startServer = require(path.join(__dirname, '../Server/server'));

// Registra o manipulador uma única vez para evitar duplicação
ipcMain.handle('get-app-data-path', () => {
    return process.env.APPDATA;  // Retorna o caminho APPDATA para o renderer
});

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
        icon: path.join(__dirname, '../style/img/menu-aberto.png') // Caminho para o ícone
    });

    // Carregar o arquivo HTML
    mainWindow.loadFile(path.join(__dirname, '../public/index.html'));
    mainWindow.maximize();
}

app.whenReady().then(() => {
     // Remove o menu globalmente
     Menu.setApplicationMenu(null);
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