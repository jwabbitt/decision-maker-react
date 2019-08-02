import React, { Component } from 'react';
import './App.css';
import AddQuestion from './Components/AddQuestion'
import DisplayQuestions from './Components/DisplayQuestions'

class App extends Component {
  constructor() {
    super()
    this.state = {
      questions: [],
      currentQuestion: {key:0, title:'', options: []}
    }
  }

  handleInput = (e) => {
    const {name, value, id} = e.target
    const questionId = parseInt(id)
    const itemKey = Date.now()
    console.log("this ran and... ", e.target)
    if (name === 'currentQuestion') {
      this.setState({
        [name]: {title: value, key: itemKey, options: []}
      })
    } else if (name === 'currentOptions') {
      
      this.setState({
        [name]: {...this.state.currentOptions, [questionId]:{ title: value, key: itemKey, questionId: questionId } }
      })
    }
  }

  createNewQuestion = e => {
    e.preventDefault()
    const newQuestion = this.state.currentQuestion
    if (newQuestion.title !== '') {
      console.log(`new question: ${newQuestion}`)
      const questions = [...this.state.questions, newQuestion]
      this.setState({
        questions: questions,
        currentQuestion: {key: 0, title: '', options: []},
        currentOption: {key: 0, title: '', questionId: 0}
      })
    }
    console.log()
  }

  deleteQuestion = key => {
    const filteredQuestions = this.state.questions.filter(question => {
      return question.key !== key
    })
    this.setState({
      questions: filteredQuestions
    })
  }

 

  inputElement = React.createRef();

  render() {
    console.log(JSON.parse(JSON.stringify(this.state)))
    return (
      <div className="App">
        <AddQuestion
          createNewQuestion={this.createNewQuestion}
          inputElement={this.inputElement}
          handleInput={this.handleInput}
          currentQuestion={this.state.currentQuestion}
        />
        <DisplayQuestions
          questionList={this.state.questions}
          handleInput={this.handleInput}
          deleteQuestion={this.deleteQuestion}
          currentOptions={this.state.currentOptions}
          createNewOption={this.createNewOption}
        />
      </div>
    )
  }
  
}

export default App;
