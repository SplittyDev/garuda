const {ipcRenderer} = window.require('electron')

let connectionId = 0
let queryId = 0

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
        return await new Promise((resolve) => {
            ipcRenderer.on(`mysql(${this.id})::gotProvider`, () => {
                console.log('Received Mysql instance.')
                this.hasProvider = true
                resolve()
            })
            console.log('Requesting Mysql instance...')
            ipcRenderer.send('mysql::getProvider', {id: this.id})
        })
    }

    async connect() {
        await this.ensureProvider()
        return await new Promise((resolve) => {
            ipcRenderer.on(`mysql(${this.id})<-connect`, (e, {err}) => {
                resolve({
                    success: !err,
                    err: err,
                })
            })
            ipcRenderer.send(`mysql(${this.id})->connect`, {
                connectionInfo: this.connectionInfo,
            })
        })
    }

    async queryDatabases() {
        return await this.query('SHOW DATABASES')
    }

    async queryDatabaseTables(db) {
        const {fields, results} = await this.query(`SHOW TABLES FROM ${db}`)
        const field = fields[0].name
        return Object.values(results).map(x => x[field])
    }

    async query(sql, values) {
        await this.ensureProvider()
        const qid = queryId++
        return await new Promise((resolve) => {
            ipcRenderer.on(`mysql(${this.id})<-query(${qid})`, (e, args) => {
                console.log(`[Query::recv(${qid})] ${args.results ? 'OK' : `Error: ${args.err.code}`}`)
                resolve(args)
            })
            console.log(`[Query::send(${qid})] ${sql}`)
            ipcRenderer.send(`mysql(${this.id})->query`, {
                query: sql,
                values: values || [],
                queryId: qid,
            })
        })
    }

    async disconnect() {
        if (!this.hasProvider) {
            return
        }
        ipcRenderer.send(`mysql(${this.id})->disconnect`, {
            connectionInfo: this.connectionInfo,
        })
    }
}

export function disconnectAll() {
    ipcRenderer.send(`mysql::disconnectAll`)
}

export async function mysqlTestConnection(connectionInfo) {
    const mysql = new MysqlConnector(connectionInfo)
    const result = await mysql.connect()
    mysql.disconnect()
    return result
}