const {ipcMain} = require('electron')
const mysql = require('mysql2')

module.exports = class MysqlConnector {
    constructor() {
        ipcMain.on('mysql->connect', this.connect)
        ipcMain.on('mysql->disconnect', this.disconnect)
    }

    connect(e, {connectionInfo}) {
        console.dir(connectionInfo)
        this.connection = mysql.createConnection({
            host: connectionInfo.host,
            port: connectionInfo.port,
            user: connectionInfo.user,
            password: connectionInfo.pass,
            database: connectionInfo.db,
        })
        this.connection.connect(err => {
            e.sender.send('mysql<-connect', {err: err})
        })
    }

    disconnect(e, {connectionInfo}) {
        this.connection.close()
    }
}