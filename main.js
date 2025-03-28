const { app, BrowserWindow, ipcMain } = require("electron/main");
const path = require("path");

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false, // No acceso directo a Node.js en Vue
      contextIsolation: true, // Mantiene seguridad en el renderizado
    },
  });

  //   win.loadFile("index.html");
  win.loadURL("http://localhost:5173");
};

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// 📌 Manejo de eventos IPC (recibe mensaje desde Vue y responde)
ipcMain.on("mensaje-desde-vue", (event, data) => {
  console.log("Mensaje recibido de Vue:", data);

  // Responder a Vue
  event.reply("respuesta-desde-electron", `Electron recibió: ${data}`);
});
