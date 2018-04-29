import React from 'react'
import styled from 'styled-components'

import {Button} from './UI/Controls'

const InfoPairRaw = ({className, name, value}) => (
    <div className={className}>
        <span className="key">{name}</span>
        <span className="value">{value}</span>
    </div>
)

const InfoPair = styled(InfoPairRaw)`
    display: flex;
    flex-flow: row;
    justify-content: flex-start;

    >.key {
        text-transform: uppercase;
        color: hsl(0,0%,50%);
        margin-right: 1rem;
    }

    >.value {
        color: hsl(0,0%,30%);
    }
`

const ConnectionBoxRaw = ({className, store, connection}) => (
    <div className={className}>
        {
            connection ? (
                <div className="inner">
                    <div className="name">{connection.name}</div>
                    <div>
                        {
                            Object.keys(connection).map(key => {
                                const blacklist='id|name|pass'.split('|')
                                const transforms={}
                                const transFunc = transforms[key] || (() => null)
                                const val = transFunc(connection[key]) || connection[key]
                                return !blacklist.includes(key) && val && <InfoPair name={key} value={val}/>
                            })
                        }
                    </div>
                </div>
            ) : (
                <Button
                    type="image"
                    color="hsl(0,0%,80%)"
                    hoverColor="hsl(0,0%,40%)"
                    fontSize="5rem"
                    grow={true}
                    onClick={() => store.goNewConnection()}
                >+</Button>
            )
        }
        {
            connection ? (
                <div className="buttons">
                    <Button type="positive" onClick={() => store.go404()} grow={true}>
                        Connect
                    </Button>
                    <Button type="edit" onClick={() => store.goEditConnection(connection)} fontSize=".8rem">
                        <i className="fas fa-cog"/>
                    </Button>
                </div>
            ) : (null)
        }
    </div>
)

const ConnectionBox = styled(ConnectionBoxRaw)`
    display: flex;
    flex-flow: column;
    justify-content: space-between;
    box-shadow: 0 0 1px 1px hsl(0,0%,80%);
    background-color: hsl(0,0%,92%);
    transition: 100ms ease-in-out;

    &:hover {
        box-shadow: 0 0 0 1px hsl(0,0%,80%);
        background-color: hsl(0,0%,91%);
    }

    >.buttons {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
    }

    >.inner {
        padding: 1rem 1rem;
        display: flex;
        flex-flow: column;
        justify-content: flex-start;
        align-items: center;
        flex-grow: 1;
    }

    .name {
        font-size: 1.1rem;
        text-align: center;
        margin-bottom: 1rem;
    }
`

const Connections = ({className, store, dataSource}) => (
    <div className={className}>
        {
            store.connections.map(con => (
                <ConnectionBox store={store} connection={con}/>
            ))
        }
        <ConnectionBox store={store} connection={null}/> 
    </div>
)

export default styled(Connections)`
    display: grid;
    grid-auto-rows: auto 175px;
    grid-gap: 1rem;

    @media screen and (max-width: 400px) {
        grid-template-columns: repeat(1, 1fr);
    }

    @media screen and (min-width: 401px) and (max-width: 700px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media screen and (min-width: 701px) and (max-width: 1000px) {
        grid-template-columns: repeat(3, 1fr);
    }

    @media screen and (min-width: 1001px) {
        grid-template-columns: repeat(4, 1fr);
    }
`