import React from 'react'
import styled from 'styled-components'

import Header from './Header'

const View = ({className, store, title, children}) => (
    <div className={className}>
        <Header store={store} title={title}/>
        <div className="workspace">
            {children}
        </div>
    </div>
)

export default styled(View)`
    display: flex;
    flex-flow: column;

    .workspace {
        flex-grow: 1;
        padding: 1rem 1rem;
    }
`