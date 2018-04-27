import React, {Component} from 'react'

export default class ContentEditable extends Component {
    shouldComponentUpdate(nextProps){
        return nextProps.html !== this.htmlEl.innerHTML
    }

    componentDidUpdate() {
        if (this.htmlEl && this.props.html !== this.htmlEl.innerHTML ) {
           this.htmlEl.innerHTML = this.props.html
        }
    }

    emitChange = () => {
        if (!this.htmlEl) {
            return
        }
        var html = this.htmlEl.innerHTML
        if (this.props.onChange && html !== this.lastHtml) {
            this.props.onChange({
                target: {
                    value: html,
                },
            })
        }
        this.lastHtml = html
    }

    render(){
        return (
            <div
                ref={(e) => this.htmlEl = e}
                id={this.props.id}
                onInput={this.emitChange} 
                onBlur={this.emitChange}
                contentEditable
                dangerouslySetInnerHTML={{__html: this.props.html}}
            ></div>
        )
    }
}