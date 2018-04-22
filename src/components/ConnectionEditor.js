import React, {Component} from 'react'
import styled from 'styled-components'

import Button from './Button'
import Row from './Row'
import Column from './Column'
import Grid from './Grid'
import ContentEditable from './ContentEditable'

import {sample} from 'lodash'

const connectionPrefixes = [
    'Aesthetic',
    'Amazing',
    'Attractive',
    'Awesome',
    'Beautiful',
    'Cool',
    'Dishy',
    'Exciting',
    'Extraordinary',
    'Exquisite',
    'Fabulous',
    'Funky',
    'Glorious',
    'Gorgeous',
    'Impressive',
    'Incredible',
    'Invaluable',
    'Juicy',
    'Lovely',
    'Perfect',
    'Ravishing',
    'Seductive',
    'Sexy',
    'Stunning',
    'Surprising',
    'Unbelievable',
]

const uuidv4 = () => (
    ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        // eslint-disable-next-line
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    )
)

class ConnectionEditor extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: uuidv4(),
            name: `${sample(connectionPrefixes)} Connection`,
            ...(props.connection || {})
        }
    }

    testConnection = () => {
    }

    saveConnection = () => {
        let connection = {
            id: this.state.id,
            name: this.state.name,
            host: this.state.host || 'localhost',
            port: this.state.port !== undefined ?this.state.port : 3306,
            user: this.state.user || 'root',
            pass: this.state.pass || null,
        }
        this.props.store.addOrUpdateConnection(connection);
        this.props.store.goWelcome();
    }

    removeConnection = () => {
        this.props.store.removeConnection(this.props.connection);
        this.props.store.goWelcome();
    }

    render() {
        return (
            <form className={this.props.className}>
                <ContentEditable
                    onChange={e => this.setState({...this.state, name: e.target.value})}
                    html={this.state.name}
                    id="connection-name"
                />
                <Grid gap="1rem" cols={2} collapse="500px">
                    <Column>
                        <label for="host">Host</label>
                        <input
                            onChange={e => this.setState({...this.state, host: e.target.value})}
                            value={this.state.host}
                            name="host"
                            type="text"
                            placeholder="localhost"
                            autoFocus
                        />
                    </Column>
                    <Column>
                        <label for="port">Port</label>
                        <input
                            onChange={e => this.setState({...this.state, port: e.target.value})}
                            value={this.state.port}
                            name="port"
                            type="number"
                            min="0"
                            max="65565"
                            placeholder="3306"
                        />
                    </Column>
                </Grid>
                <Grid gap="1rem" cols={3} collapse="750px">
                    <Column>
                        <label for="user">Username</label>
                        <input
                            onChange={e => this.setState({...this.state, user: e.target.value})}
                            value={this.state.user}
                            name="user"
                            type="text"
                            placeholder="root"
                        />
                    </Column>
                    <Column>
                        <label for="pass">Password</label>
                        <input
                            onChange={e => this.setState({...this.state, pass: e.target.value})}
                            value={this.state.pass}
                            name="pass"
                            type="password"
                            placeholder="super secret password"
                        />
                    </Column>
                    <Column>
                        <label for="db">Database/Schema</label>
                        <input
                            onChange={e => this.setState({...this.state, db: e.target.value})}
                            value={this.state.db}
                            name="db"
                            type="text"
                            placeholder="none"
                        />
                    </Column>
                </Grid>
                <div className="buttons">
                    <Row gap="1rem">
                        <Button onClick={this.testConnection} type="neutral">Test Connection</Button>
                        <Button onClick={this.saveConnection} type="positive" grow={true}>Save</Button>
                        {
                            this.props.store.editingConnection ? (
                                <Button onClick={this.removeConnection} type="negative">Delete&nbsp;<i className="fas fa-trash"/></Button>
                            ) : null
                        }
                    </Row>
                </div>
            </form>
        )
    }
}

export default styled(ConnectionEditor)`
    padding: 0 1rem;

    #connection-name {
        outline: none;
        font-size: 1.75rem;
        padding-left: 1rem;
        border-left: 3px solid hsl(0,0%,60%);
        color: hsl(0,0%,70%);
        transition: 250ms ease-in-out;
    }

    #connection-name:focus, #connection-name:hover {
        border-left: 3px solid hsl(198,50%,60%);
        color: hsl(0,0%,20%);
    }

    label {
        font-size: 1.1rem;
        margin-bottom: .25rem;
    }

    input {
        font-size: 1rem;
        padding: .5rem .5rem;    
        border: none;
        box-shadow: 0 0 2px 0 hsl(0,0%,0%), 0 0 0 1px hsl(0,0%,95%);
        border-radius: .25rem .25rem;
        outline: none;
        transition: 250ms ease-in-out;
    }

    input:hover, input:focus {
        box-shadow: 0 0 2px 0 hsl(0,0%,0%), 0 0 0 1px hsl(0,0%,75%);
    }

    >* {
        margin-top: 1rem;
    }

    >.buttons {
        margin-top: 2rem;
    }
`