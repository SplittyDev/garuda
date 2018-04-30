import React, {Component } from 'react'
import styled from "styled-components"

import {Column, Row} from '../../UI/Layout'

class TableEntry extends Component {
    constructor(props) {
        super(props)
        this.state = {
            expanded: false,
        }
    }

    render() {
        return (
            <div className={this.props.className}>
                <Column>
                    <Row id="header" justifyContent="space-between">
                        <div id="rowTableName">
                            <i id="tableSymbol" className="fas fa-table"/>
                            <span id="dbName">{this.props.tableName}</span>
                        </div>
                    </Row>
                </Column>
            </div>
        )
    }
}

export default styled(TableEntry)`
    font-size: .75rem;
    padding: .1rem 0 .1rem 1rem;
    border-left: 3px solid hsl(207, 20%, 45%);

    &:hover {
        cursor: pointer;
    }

    #rowTableName {
        flex-grow: 1;
    }

    #tableSymbol {
        margin-right: .5rem;
        color: hsl(0, 0%, 50%);
    }
`