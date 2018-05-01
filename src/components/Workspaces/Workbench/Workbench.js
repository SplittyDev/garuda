import React, {Component} from 'react'
import styled from 'styled-components'

import MysqlConnector from '../../../connectors/MysqlConnector'

import {Column, Row} from '../../UI/Layout'
import Sidebar from './Sidebar'
import QueryEditor from './QueryEditor'

class Workbench extends Component {
    constructor(props) {
        super(props)
        this.state = {
            connecting: true,
            connected: false,
            err: null,
            mysql: new MysqlConnector(this.props.connection),
        }
        this.state.mysql.connect().then(({success, err}) => {
            this.setState({
                ...this.state,
                connecting: false,
                connected: success,
                err: err,
            })
        })
    }

    render() {
        if (this.state.connecting) {
            return (
                <div className={this.props.className}>
                    Connecting&hellip;
                </div>
            )
        } else if (!this.state.connecting && !this.state.connected) {
            return <div className={this.props.className}>Error</div>   
        }
        return (
            <div className={this.props.className}>
                <Row>
                    <Sidebar mysql={this.state.mysql}/>
                    <QueryEditor mysql={this.state.mysql}/>
                </Row>
            </div>
        )
    }
}

export default styled(Workbench)`
`