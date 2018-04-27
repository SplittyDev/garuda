import React from 'react'
import styled from 'styled-components'

const Row = ({className, children}) => (
    <div className={className}>
        {children}
    </div>
)

export default styled(Row)`
    display: flex;
    flex-flow: row;
    flex-grow: ${props => props.grow ? 1 : 0};
    >:not(:first-child) {
        margin-left: ${props => `calc(${props.gap} / 2)` || '0'};
    }
    >:not(:last-child) {
        margin-right: ${props => `calc(${props.gap} / 2)` || '0'};
    }
`