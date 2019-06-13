import React, { Component } from 'react';
import './App.css';
import AddQuestion from './Components/AddQuestion'
import DisplayQuestions from './Components/DisplayQuestions'

class App extends Component {
  constructor() {
    super()
    this.state = {
      questions: [],
      currentQuestion: {key:'', title:'', options: []},
      currentOption: {key:'', title:''}
    }
  }

  handleInput = (e, item) => {
    const itemTitle = e.target.value
    const itemKey = Date.now()
    if (item === 'question') {
      const currentQuestion = {title: itemTitle, key: itemKey, options: []}
      this.setState({
        currentQuestion
      })
    } else if (item === 'option') {
      const currentOption = {title: itemTitle, key: itemKey}
      this.setState({
        currentOption
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
        currentQuestion: {key: '', title: '', options: []},
        currentOption: {key: '', title: ''}
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
    //console.log(JSON.stringify(this.state))
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
          deleteQuestion={this.deleteQuestion}
        />
      </div>
    )
  }
  
}

export default App;
