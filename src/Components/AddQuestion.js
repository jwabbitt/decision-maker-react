import React, { Component } from 'react'

class AddQuestion extends Component {
    componentDidUpdate() {
        //this.props.inputElement.current.focus()
    }

    render() {
        return (
            <div className="addQuestion">
                <label>Add Questions:</label>
                    <input
                        type="text"
                        placeholder="Question"
                        ref={this.props.inputElement}
                        name="currentQuestion"
                        value={this.props.currentQuestion.title}
                        onChange={e => this.props.handleInput(e, 'question')}
                        onKeyDown={e => {e.keyCode ===13 && this.props.createNewQuestion(e)}}
                    />
            </div>
        )
    }
}

export default AddQuestion