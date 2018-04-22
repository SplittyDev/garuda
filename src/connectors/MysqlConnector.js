import mysql from 'mysql'

export default class MysqlConnector {
    constructor(connectionInfo) {
        this.connectionInfo = connectionInfo
        this.connection = mysql.createConnection({
            host: this.connectionInfo.host,
            port: this.connectionInfo.port,
            user: this.connectionInfo.user,
            password: this.connectionInfo.pass,
            database: this.connectionInfo.db,
        })
    }

    async connect() {
        await new Promise((resolve, reject) => {
            this.connection.connect(err => {
                if (err) {
                    return reject(err)
                }
                return resolve()
            })
        })
    }

    disconnect() {
        this.connection.end()
    }
}