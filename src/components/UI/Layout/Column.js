import React from 'react'
import styled from 'styled-components'

const Column = ({className, children}) => (
    <div className={className}>
        {children}
    </div>
)

export default styled(Column)`
    display: flex;
    flex-flow: column;
    flex-grow: ${props => props.grow ? 1 : 0};
`