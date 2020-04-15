import React from "react"

export default class EqKnob extends React.Component {
  min = 20;
  max = 5000;
  state = {
    current: 20,
  }
  
  handleUpdateSlider = (event) => {
    const value = event.target.value;
    this.props.onUpdateFilter(value);
  }

  render() {
    return (
      <input type="range"
            id="low-pass"
            step="1"
            min={this.min}
            max={this.max}
            onChange={this.handleUpdateSlider} />
    )
  }
}

