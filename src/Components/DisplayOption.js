import React, { Component } from 'react'

class DisplayOption extends Component {
    inputOptionElement = React.createRef();
    createOptions = option => {
        const hideOptionsStyle = {
            display: "none"
        }
        const showOptionsStyle = {
            display: "inherit"
        }
        
        return (
            <div key={option.key} className="displayOptions" style={this.props.hideOptions ? hideOptionsStyle : showOptionsStyle}>
                <button className="delete" onClick={() => this.props.deleteOption(option.key, option.questionId)}>
                &#10006;
                </button> {option.title}
                
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