import React, { Component } from 'react'
import AddOption from './AddOption'
import DisplayOption from './DisplayOption'

class Question extends Component {
    constructor(props) {
        super(props)
        this.state = {
            options: props.options || [],
            currentOption: { key: 0, title: '', questionId: 0 },
            hideOptions: false
        }
    }

    handleInput = (e) => {
        const {name, value, id} = e.target
        const questionId = parseInt(id)
        const itemKey = Date.now()
        this.setState({
          [name]: {key: itemKey, title: value, questionId: questionId }
        })
      }
      

    createNewOption = e => {
      e.preventDefault()
      const newOption = this.state.currentOption
      if (newOption.title !== '') {
        const options = [...this.state.options, newOption]
        this.setState({
          options: options,
          currentOption: {key: 0, title: '', questionId: 0}
        })
        this.props.createNewOption(newOption)
      }
    }

    deleteOption = (key, id) => {
      const filteredOptions = this.state.options.filter(option => {
        return option.key !== key
      })
      this.setState({
        options: filteredOptions
      })
      this.props.deleteOption(key, id)
    }

    makeDecision = options => {
      if(options.length > 0) {
        let decision = options[Math.floor(Math.random()*options.length)];

        alert(`${this.props.title}\nRandom Decision Made:\n${decision.title}`)
      } else {
        alert("No options added to question.  Please add options first.")
      }
    }

    showHideOptions() {
      this.setState(prevState => {
        const newState = !prevState.hideOptions
        return { hideOptions: newState}
      })
    }

    render() {
        return (
            <div key={this.props.questionKey}>
                <button className="delete" onClick={() => this.props.deleteQuestion(this.props.questionKey)}>&#10006;
                </button><span className="questionTitle">{this.props.title}</span>
                <button className="makeDecision" onClick={() => this.makeDecision(this.state.options)}>Make Decision</button>
                <button className="showHideOptions" onClick={() => this.showHideOptions()}>
                  {this.state.hideOptions ? "Show Options" : "Hide Options"}
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
                    optionPropList={this.props.options}
                    deleteOption={this.deleteOption}
                    hideOptions={this.state.hideOptions}

                />
                <hr></hr>
            </div>
        )
    }
}

export default Question