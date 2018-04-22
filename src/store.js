import {observable, decorate} from 'mobx'

class Store {
    workspace = {
        id: 'welcome',
        title: 'Welcome',
    }

    constructor() {
        this.connections = JSON.parse(localStorage.getItem('connections') || '[]')
    }

    goWelcome() {
        this.workspace = {
            id: 'welcome',
            title: 'Welcome',
        }
    }

    goNewConnection() {
        delete this.editingConnection;
        this.workspace = {
            id: 'edit-connection',
            title: 'New Connection',
        }
    }

    goEditConnection(connection) {
        this.editingConnection = connection;
        this.workspace = {
            id: 'edit-connection',
            title: 'Edit Connection',
        }
    }

    go404() {
        this.workspace = {
            id: null,
            title: null,
        }
    }

    addOrUpdateConnection(state) {
        if (state.id === (this.editingConnection || {id:-1}).id) {
            delete this.editingConnection
            this.connections[this.connections.findIndex(con => state.id === con.id)] = state
        } else {
            this.connections.push(state)
        }
        localStorage.setItem('connections', JSON.stringify(this.connections))
    }

    removeConnection(connection) {
        delete this.editingConnection
        this.connections.splice(this.connections.findIndex(con => connection.id === con.id), 1)
        localStorage.setItem('connections', JSON.stringify(this.connections))
    }
}

decorate(Store, {
    workspace: observable,
    connections: observable,
})

export default Store