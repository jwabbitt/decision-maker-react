import React, { Component } from 'react'

class DisplayQuestions extends Component {
    createQuestions = question => {
        return (
            <div key={question.key}>
                {question.title}
                <button className="delete" onClick={() => this.props.deleteQuestion(question.key)}>
                    X
                </button>
            </div>
        )
    }

    render() {
        const questionList = this.props.questionList
        const listQuestions = questionList.map(this.createQuestions)

        return <div className="questionList">{listQuestions}</div>
    }
}

export default DisplayQuestions