const {ipcRenderer} = window.require('electron')

export default class MysqlConnector {
    constructor(connectionInfo) {
        this.connectionInfo = connectionInfo
    }

    connect() {
        return new Promise((resolve) => {
            ipcRenderer.on('mysql<-connect', (e, {err}) => {
                resolve({
                    success: !err,
                    err: err,
                })
            })
            ipcRenderer.send('mysql->connect', {
                connectionInfo: this.connectionInfo,
            })
        })
    }

    disconnect() {
        ipcRenderer.send('mysql->disconnect', {
            connectionInfo: this.connectionInfo,
        })
    }
}

export async function mysqlTestConnection(connectionInfo) {
    const mysql = new MysqlConnector(connectionInfo)
    const result = await mysql.connect()
    mysql.disconnect()
    return result
}