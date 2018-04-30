import React, {Component} from 'react'
import styled from 'styled-components'

import DatabaseEntry from './DatabaseEntry'

class Sidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            databases: [],
        }
        console.log('Querying databases...')
        this.refreshDatabases()
    }

    refreshDatabases = () => {
        this.props.mysql.queryDatabases().then(({success, err, results}) => {
            const promises = results
                .map(x => x.Database)
                .map(x => [x, this.props.mysql.queryDatabaseTables(x)])
            Promise.all(promises).then(async (results) => {
                const databases = [];
                for (const promise of Object.values(results)) {
                    let [name, tables] = await promise
                    databases.push([name, await tables])
                }
                this.setState({
                    ...this.state,
                    databases: databases,
                })
            })
        })
    }

    render() {
        return (
            <aside className={this.props.className}>
                {
                    this.state.databases.map(([dbName, dbTables]) => {
                        return <DatabaseEntry key={dbName} dbName={dbName} dbTables={dbTables}/>
                    })
                }
            </aside>
        )
    }
}

export default styled(Sidebar)`
    & * {
        user-select: none;
    }
`