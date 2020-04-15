import React from "react"
import EqKnob from "./eq-knob"
import soundFile from "./JustShopping.mp3" // remove from this directory and find by graphQL

export default class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      songBuffer: null,
      started: false,
      buttonText: "Click to start audio!"
    }
    this.highPassFilter = null;
    this.audioCtx = null;
    this.loadAudio = this.loadAudio.bind(this); // TODO(newmans): Better understand this.
  }

  loadAudio = () => {
    if (this.state.started) {
      // TODO(newmans): Gate by this everywhere. FSM / state mangaement. Don't buffer audio more than once.
      return;
    }
    var request = new XMLHttpRequest();
    request.open("GET", soundFile, true);

    request.responseType= 'arraybuffer';

    var self = this; // TODO(newmans): *SUPER* not cool. Should not do this.

    request.onload = function() {
      if (self.audioCtx == null) {
        self.audioCtx = new AudioContext(); // TODO(newmans): Initialize audio ctx outside of async request.
      }

      if (self.highPassFilter == null) {
        // TODO(newmans): Have better state management. Model a filter separately. Look into Redux.
        self.highPassFilter = self.audioCtx.createBiquadFilter();
        self.highPassFilter.type = 'highpass';
        self.highPassFilter.frequency.value = 20;
      }

      self.audioCtx.decodeAudioData(
          request.response,
          (buffer) => {
                  self.setState({
                      songBuffer: buffer,
                      started: true,
                      buttonText: "Audio started!"
                  });

                  var source = self.audioCtx.createBufferSource(); // creates a sound source
                  source.buffer = buffer; // tell the source which sound to play
                  source.connect(self.highPassFilter); // connect the source to the context's destination (the speakers)
                  self.highPassFilter.connect(self.audioCtx.destination)
                  source.start(0);
          },
          () => {});
    };

    request.onerror = () => {}
    request.send();
  }

  updateFilter = (value) => {
    if (this.highPassFilter != null) {
      this.highPassFilter.frequency.value = value;
    }

  }

  render() {
    return (
      <div>
        <button onClick={this.loadAudio}>{this.state.buttonText}</button>
        <br />
        <br />
        <span>High-pass filter</span>
        <EqKnob onUpdateFilter={this.updateFilter} />
      </div>
    )
  }
}

