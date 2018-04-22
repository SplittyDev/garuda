import React from 'react'
import styled from 'styled-components'
import {observer} from 'mobx-react'

import Button from './Button'
import Row from './Row'

const Header = observer(({className, store, title}) => (
    <header className={className}>
        <Row gap="2rem">
            {
                title !== 'Welcome' ? (
                    <Button type="image" fontSize="1.5rem" onClick={() => store.goWelcome()}>
                        <i className="fas fa-arrow-left"/>
                    </Button>
                ) : null
            }
            <h1>{title}</h1>
        </Row>
    </header>
))

export default styled(Header)`
    min-width: 500px;
    overflow: hidden;
    padding: 2rem 2rem;
    color: hsl(0,0%,95%);
    background-color: hsl(0,0%,15%);

    h1 {
        margin: 0 0;
        padding: 0 0;
        font-size: 1.5rem;
        text-overflow: ellipsis;
        overflow: hidden;
    }
`
