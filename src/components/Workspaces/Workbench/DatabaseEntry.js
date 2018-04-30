import React, {Component } from 'react'
import styled from "styled-components"

import {Column, Row} from '../../UI/Layout'
import TableEntry from './TableEntry'

class DatabaseEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
        }
    }

    handleExpandUnexpand = () => {
        this.setState({
            ...this.state,
            expanded: !this.state.expanded,
        })
    }

    render() {
        return (
            <div className={this.props.className}>
                <Column>
                    <Row id="header" onClick={this.handleExpandUnexpand} justifyContent="space-between">
                        <div id="rowDbName">
                            <i id="dbSymbol" className="fas fa-database"/>
                            <span id="dbName">{this.props.dbName}</span>
                        </div>
                    </Row>
                    <Column id="tables">
                    {
                        this.state.expanded && this.props.dbTables.map(tableName => {
                            return <TableEntry key={tableName} tableName={tableName}/>
                        })
                    }
                    </Column>
                </Column>
            </div>
        )
    }
}

export default styled(DatabaseEntry)`
    font-size: .9rem;
    flex-grow: 1;

    &:hover {
        cursor: pointer;
    }

    #header {
        padding: .5rem 0;
    }

    #rowDbName {
        flex-grow: 1;
    }

    #dbSymbol {
        margin-right: .5rem;
        color: hsl(0, 0%, 50%);
        font-size: 1.1rem;
        transition: all 150ms ease-in-out;
    }

    &:hover #dbSymbol {
        color: hsl(207, 47%, 45%);
    }

    #tables {
        margin-top: .25rem;
    }
`