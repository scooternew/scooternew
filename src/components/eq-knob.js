import React from "react"

export default class SimpleEqKnob extends React.Component {
  // Simple EQ knob: low, band, or high pass. Lets you
  // specify a range of frequencies and the type.
  // Updating Q is not yet supported.

  constructor(props) {
    super(props);

    this.state = {
      frequency: this.computeDefaultValue(),
      q: 0
    }

    this.baseFilter = null;
    if (this.props.audioContext != null) {
      console.log("Generating EQ knob: [type=" + this.props.type + ", min=" + this.props.min + ", max=" + this.props.max+"]");
      this.baseFilter = this.props.audioContext.createBiquadFilter();
      this.baseFilter.type = this.props.type;
      this.baseFilter.frequency.value = this.computeDefaultValue();
    }
  }

  computeDefaultValue = () => {
    // TODO(newmans): Check for undefined prop (use low pass by default)
    if (this.props.type === "lowpass") {
      return this.props.max;
    } else if (this.props.type === "highpass") {
      return this.props.min;
    } else if (this.props.type === "bandpass") {
      return Math.floor((this.props.min + this.props.max) / 2);
    } else {
      console.log("Only low pass, high pass, or bandpass EQs are supported so far");
      return -1;
    }
  }

  computeTitle = () => {
    // TODO(newmans): Check for undefined prop (use low pass by default)
    if (this.props.type === "lowpass") {
      return "Low pass"
    } else if (this.props.type === "highpass") {
      return "High pass";
    } else if (this.props.type === "bandpass") {
      return "Band pass";
    } else {
      console.log("Only low pass, high pass, or bandpass EQs are supported so far");
      return -1;
    }
  }

  getFilter = () => {
    return this.baseFilter;
  }
  
  handleChangeFrequency = (event) => {
    if (this.baseFilter != null) {
      this.baseFilter.frequency.value = event.target.value;
      this.setState({ frequency: event.target.value });
    }
    this.props.onUpdateFilter(this.baseFilter);
  }

  render() {
    return (
      <div style={this.props.style}>
        <p>{this.computeTitle()}</p>
        <p>Value={this.state.frequency}</p>
        <span>Min: {this.props.min}</span>
        <input type="range"
            step="1"
            min={this.props.min}
            max={this.props.max}
            defaultValue={this.computeDefaultValue()}
            onChange={this.handleChangeFrequency} />
        <span>Max: {this.props.max}</span>
      </div>
    )
  }
}

