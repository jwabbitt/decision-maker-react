import React, { Component } from 'react'
import AddOption from './AddOption'
import DisplayOption from './DisplayOption'

class Question extends Component {
    constructor() {
        super()
        this.state = {
            options: [],
            currentOption: { key: 0, title: '', questionId: 0 }
        }
    }

    handleInput = (e) => {
        const {name, value, id} = e.target
        const questionId = parseInt(id)
        const itemKey = Date.now()
        console.log("handleInput in Options... ", e.target)
        this.setState({
          [name]: {key: itemKey, title: value, questionId: questionId }
        })
      }
      

    createNewOption = e => {
      e.preventDefault()
      const newOption = this.state.currentOption
      if (newOption.title !== '') {
        console.log(`new option: ${newOption}`)
        const options = [...this.state.options, newOption]
        this.setState({
          options: options,
          currentOption: {key: 0, title: '', questionId: 0}
        })
      }
    }

    deleteOption = key => {
      const filteredOptions = this.state.options.filter(option => {
        return option.key !== key
      })
      this.setState({
        options: filteredOptions
      })
    }

    makeDecision = options => {
      if(options.length > 0) {
        let decision = options[Math.floor(Math.random()*options.length)];

        alert(`${this.props.title}\nRandom Decision Made:\n${decision.title}`)
      } else {
        alert("No options added to question.  Please add options first.")
      }
    }

    render() {
      console.log("Question Key: ", this.props.questionKey)
        return (
            <div key={this.props.questionKey}>
                {this.props.title}
                <button className="makeDecision" onClick={() => this.makeDecision(this.state.options)}>Make Decision</button>
                <button className="delete" onClick={() => this.props.deleteQuestion(this.props.questionKey)}>
                    X
                </button>
                <AddOption 
                    currentOption={this.state.currentOption || {}}
                    inputOptionElement={this.inputOptionElement}
                    questionKey={this.props.questionKey} 
                    createNewOption={this.createNewOption}
                    handleInput={this.handleInput}
                />
                <DisplayOption
                    questionKey={this.props.questionKey}
                    optionList={this.state.options}
                    deleteOption={this.deleteOption}

                />
            </div>
        )
    }
}

export default Question