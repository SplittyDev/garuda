import React, {Component} from 'react'
import styled from 'styled-components'
import AceEditor from 'react-ace'

import 'brace/mode/mysql'
import 'brace/theme/tomorrow'
import 'brace/ext/language_tools'

class QueryEditor extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className={this.props.className}>
                <AceEditor
                    name="query-editor"
                    mode="mysql"
                    theme="tomorrow"
                    focus={true}
                    fontSize="14px"
                    editorProps={{$blockScrolling: true}}
                    setOptions={{
                        enableBasicAutocompletion: true,
                        enableLiveAutocompletion: true,
                        enableSnippets: true,
                        tabSize: 2,
                    }}
                />
            </div>
        )
    }
}

export default styled(QueryEditor)`
`