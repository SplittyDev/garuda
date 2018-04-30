import React from 'react'
import styled from 'styled-components'

const Column = ({className, id, onClick, children}) => (
    <div id={id} className={className} onClick={onClick}>
        {children}
    </div>
)

export default styled(Column)`
    display: flex;
    flex-flow: column;
    flex-grow: ${props => props.grow ? 1 : 0};
`