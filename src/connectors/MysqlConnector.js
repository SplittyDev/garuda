const {ipcRenderer} = window.require('electron')

let connectionId = 0

export default class MysqlConnector {
    constructor(connectionInfo) {
        this.id = connectionId++
        this.connectionInfo = connectionInfo
        this.hasProvider = false
    }

    async ensureProvider() {
        if (this.hasProvider) {
            return
        }
        const gotProvider = new Promise((resolve) => {
            ipcRenderer.on(`mysql(${this.id})::gotProvider`, () => {
                console.log('Received Mysql instance.')
                resolve()
            })
        })
        console.log('Requesting Mysql instance...')
        ipcRenderer.send('mysql::getProvider', {id: this.id})
        await gotProvider
        this.hasProvider = true
    }

    async connect() {
        await this.ensureProvider()
        const reply = new Promise((resolve) => {
            ipcRenderer.on(`mysql(${this.id})<-connect`, (e, {err}) => {
                resolve({
                    success: !err,
                    err: err,
                })
            })
        })
        ipcRenderer.send(`mysql(${this.id})->connect`, {
            connectionInfo: this.connectionInfo,
        })
        return await reply
    }

    async disconnect() {
        await this.ensureProvider()
        ipcRenderer.send(`mysql(${this.id})->disconnect`, {
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