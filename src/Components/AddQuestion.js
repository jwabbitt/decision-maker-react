import React, { Component } from 'react'

class AddQuestion extends Component {
    componentDidUpdate() {
        this.props.inputElement.current.focus()
    }

    render() {
        return (
            <div className="addQuestion">
                <div className="header">
                    <form onSubmit={this.props.createNewQuestion}>
                        <input
                            placeholder="Question"
                            ref={this.props.inputElement}
                            value={this.props.currentQuestion.title}
                            onChange={e => this.props.handleInput(e, 'question')}
                        />
                        <button type="submit">Add Question</button>
                    </form>
                </div>

            </div>
        )
    }
}

export default AddQuestion