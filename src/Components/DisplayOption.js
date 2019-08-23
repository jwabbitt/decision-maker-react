import React, { Component } from 'react'

class DisplayOption extends Component {
    inputOptionElement = React.createRef();
    createOptions = option => {
        return (
            <div key={option.key}>
                {option.title}
                <button className="delete" onClick={() => this.props.deleteOption(option.key, option.questionId)}>
                    X
                </button>
            </div>
        )
    }

    render() {
        const optionList = this.props.optionList
        const listOptions = optionList.map(this.createOptions)

        return <div className="optionList">{listOptions}</div>
    }
}

export default DisplayOption