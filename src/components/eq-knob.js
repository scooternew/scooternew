import React from "react"

export default class EqKnob extends React.Component {
  min = 20;
  max = 5000;
  state = {
    current: 20,
  }
  
  handleChangeFrequency = (event) => {
    this.props.onChangeFrequency(event.target.value);
  }

  render() {
    return (
      <input type="range"
            id="low-pass"
            step="1"
            min={this.min}
            max={this.max}
            onChange={this.handleChangeFrequency} />
    )
  }
}

