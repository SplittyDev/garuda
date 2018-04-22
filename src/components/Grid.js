import React from 'react'
import styled from 'styled-components'

const Grid = ({className, children, rows, cols}) => (
    <div className={className}>
        {children}
    </div>
)

export default styled(Grid)`
    display: grid;
    grid-gap: ${props => props.gap || 0};
    grid-template-rows: ${props => props.rows ? `repeat(${props.rows}, 1fr)` : 'none'};
    grid-template-columns: ${props => props.cols ? `repeat(${props.cols}, 1fr)` : 'none'};

    @media screen and (max-width: ${props => props.collapse || '0'}) {
        grid-template-rows: ${props => props.rows ? 'repeat(1, 1fr)' : 'none'};
        grid-template-columns: ${props => props.cols ? 'repeat(1, 1fr)' : 'none'};
    }
`