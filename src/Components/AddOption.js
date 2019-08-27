import React, { Component } from 'react'

class AddOption extends Component {
    componentDidUpdate() {
        //this.props.inputOptionElement.current.focus()
    }

    render() {
        return(
            <div className="addOption">
                <label>Add options:</label>
                    <input
                        type="text"
                        placeholder="Option"
                        ref={this.props.inputOptionElement}
                        name="currentOption"
                        id={this.props.questionKey}
                        value={this.props.currentOption.title}
                        onChange={e => this.props.handleInput(e)}
                        onKeyDown={e => {e.keyCode === 13 && this.props.createNewOption(e)}}
                    />
                
            </div>
        )
    }
}

export default AddOption