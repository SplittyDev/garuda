import React from 'react'
import styled from 'styled-components'

const Row = ({className, id, onClick, children}) => (
    <div id={id} className={className} onClick={onClick}>
        {children}
    </div>
)

export default styled(Row)`
    display: flex;
    flex-flow: row;
    flex-grow: ${props => props.grow ? 1 : 0};
    justify-content: ${props => props.justifyContent || 'inherit'};
    >:not(:first-child) {
        margin-left: ${props => `calc(${props.gap} / 2)` || '0'};
    }
    >:not(:last-child) {
        margin-right: ${props => `calc(${props.gap} / 2)` || '0'};
    }
`