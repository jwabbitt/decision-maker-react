import React, { Component } from 'react';
import './App.css';
import AddQuestion from './Components/AddQuestion'
import DisplayQuestions from './Components/DisplayQuestions'

class App extends Component {
  constructor() {
    super()
    //parse localStorage to see if 'questions' exist
    this.state = {
      questions: [],
      currentQuestion: {key:0, title:'', options: []}
    }
    this.storage = localStorage
    this.storageName = 'decision-maker'
    this.db = JSON.parse(this.storage.getItem(this.storageName) || '{}')
    this.deleteOption = this.deleteOption.bind(this);
  }

  componentDidMount() {
    if(Object.keys(this.db).length !== 0) {
      const questions = this.db['questions']
      this.setState({
        questions: questions
      })
    }
  }

  saveLocalStorage = () => {
    this.storage.setItem(this.storageName, JSON.stringify(this.db));
  }

  updateLocalStorage = (key, data) => {
    this.db[key] = data;
    this.saveLocalStorage();
  }

  removeFromLocalStorage = (key, data) => {
    delete this.db[key];
    this.saveLocalStorage();
  }

  handleInput = (e) => {
    const {name, value, id} = e.target
    const questionId = parseInt(id)
    const itemKey = Date.now()
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
      const questions = [...this.state.questions, newQuestion]
      this.setState({
        questions: questions,
        currentQuestion: {key: 0, title: '', options: []},
        currentOption: {key: 0, title: '', questionId: 0}
      })
      this.updateLocalStorage('questions', questions)
    }
    
  }
  
  deleteQuestion = key => {
    const filteredQuestions = this.state.questions.filter(question => {
      return question.key !== key
    })
    this.setState({
      questions: filteredQuestions
    })
    this.updateLocalStorage('questions', filteredQuestions)
  }

  createNewOption = (newOption) => {
    let questions = this.state.questions.map(question => {
      if(question.key === newOption.questionId) {
        question.options.push({key: newOption.key, title: newOption.title, questionId: newOption.questionId})
      }
      return question
    })
    this.setState( {questions} )
    this.updateLocalStorage('questions', questions)
  }

  deleteOption(key, id) {
    let questions = this.state.questions.map(question => {
      if(question.key === id) {
        question.options = question.options.filter(o => o.key !== key)
      }
      return question
    })
    this.setState( {questions} )
    this.updateLocalStorage('questions', questions)
  }

  inputElement = React.createRef();

  render() {
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
          deleteOption={this.deleteOption}
        />
      </div>
    )
  }
  
}

export default App;
