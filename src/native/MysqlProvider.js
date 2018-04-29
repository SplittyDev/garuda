const {ipcMain} = require('electron')
const mysql = require('mysql2')

const providers = []

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
        this.handle('mysql->disconnect', (e, args) => {
            $this.disconnect(e, args)
            removeProvider($this)
        })
    }

    getep(name) {
        const delim = ['->', '<-'].filter(x => name.includes(x))[0]
        const head = name.split(delim)[0]
        const tail = name.substring(name.indexOf(delim))
        return `${head}(${this.id})${tail}`
    }

    handle(name, handler) {
        const ep = this.getep(name)
        this.handlers.push([ep, handler])
        ipcMain.on(this.getep(name), handler)
    }

    reply(name, e, data) {
        e.sender.send(this.getep(name), data)
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
            this.reply(`mysql<-connect`, e, {err: err})
        })
    }

    disconnect(e, {connectionInfo}) {
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