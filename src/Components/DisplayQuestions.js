import React, { Component } from 'react'
import Question from './Question'

class DisplayQuestions extends Component {
    inputOptionElement = React.createRef();
    createQuestions = (question) => {
        return (
            <div key={question.key}>
                <Question 
                    questionKey={question.key}
                    title={question.title}
                    options={question.options}
                    deleteQuestion={this.props.deleteQuestion}
                />
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