import React from 'react'
import { observer } from 'mobx-react'

import View from './View'
import Connections from './Connections'
import ConnectionEditor from './ConnectionEditor'

const Workspace = ({store, workspace}) => {
    let workspaceContent = null
    switch (workspace.id) {
        case 'welcome': {
            workspaceContent = (
                <Connections store={store} dataSource={store.connections}/>
            )
            break
        }
        case 'edit-connection': {
            workspaceContent = (
                <ConnectionEditor store={store} connection={store.editingConnection}/>
            )
            break
        }
        default: {
            workspaceContent = (
                <div>
                    <h2>OOPSIE WOOPSIE!!</h2>
                    <p>
                        Uwu We made a fucky wucky!! A wittle<br/>
                        fucko boingo! The code monkeys at our<br/>
                        headquarters are working VEWY HAWD<br/>
                        to fix this!
                    </p>
                </div>
            )
            break
        }
    }
    return (
        <View store={store} title={workspace.title || '404'}>
            {workspaceContent}
        </View>
    )
}

export default observer(Workspace)