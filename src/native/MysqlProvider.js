const {ipcMain} = require('electron')
const fs = require('fs')
const mysql = require('mysql2')

let providers = []

function log(str) {
    if (process.env.DEBUG) {
        fs.appendFileSync('electron.log', `${str}\n`)
    }
}

ipcMain.on('mysql::disconnectAll', () => {
    providers.forEach(provider => {
        provider.disconnect()
        provider.__dispose()
    })
    providers = []
})

ipcMain.on('mysql::getProvider', (e, {id}) => {
    const provider = new MysqlProvider(id)
    providers.push(provider)
    e.sender.send(`mysql(${id})::gotProvider`)
})

function removeProvider(provider) {
    const i = providers.findIndex(x => x.id === provider.id)
    providers.splice(i, 1)
    provider.__dispose()
}

class MysqlProvider {
    constructor(id) {
        this.id = id
        this.handlers = []
        const $this = this
        this.handle('mysql->connect', (e, args) => {
            $this.connect(e, args)
        })
        this.handle('mysql->query', (e, args) => {
            $this.query(e, args)
        })
        this.handle('mysql->disconnect', (e, args) => {
            $this.disconnect(e, args)
            removeProvider($this)
        })
    }

    getep(name) {
        const delim = ['->', '<-'].filter(x => name.includes(x))[0]
        const head = name.split(delim)[0]
        const tail = name.substring(name.indexOf(delim))
        const ep = `${head}(${this.id})${tail}`
        return ep
    }

    handle(name, handler) {
        const ep = this.getep(name)
        this.handlers.push([ep, handler])
        ipcMain.on(ep, (e, args) => {
            log(`[Main <- Renderer /${ep}]`)
            handler(e, args)
        })
    }

    reply(name, e, data) {
        const ep = this.getep(name)
        log(`[Main -> Renderer /${ep}]`)
        e.sender.send(ep, data)
    }

    connect(e, {connectionInfo}) {
        console.dir(connectionInfo)
        this.connection = mysql.createConnection({
            host: connectionInfo.host,
            port: connectionInfo.port,
            user: connectionInfo.user,
            password: connectionInfo.pass,
            database: connectionInfo.db,
            multipleStatements: true,
        })
        this.connection.connect(err => {
            this.reply(`mysql<-connect`, e, {err: err})
        })
    }

    query(e, {queryId, query, values}) {
        log(`[MySQL::Query] ${query}`)
        this.connection.query(query, values, (err, results, fields) => {
            this.reply(`mysql<-query(${queryId})`, e, {
                success: !err,
                err: err,
                results: results,
                fields: fields,
            })
        })
    }

    disconnect(e) {
        this.connection.close()
    }

    __dispose() {
        for (const [ep, handler] of this.handlers) {
            ipcMain.removeListener(ep, handler)
        }
        this.handlers = null
        this.connection = null
    }
}