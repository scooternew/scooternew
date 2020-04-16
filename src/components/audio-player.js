import React from "react"
import Dropzone from "react-dropzone"
import AudioSpectrum from "./audio-spectrum"
import EqKnob from "./eq-knob"
import soundFile from "./JustShopping.mp3" // remove from this directory and find by graphQL

export default class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);

    this.eqKnob = React.createRef();
    this.audioSpectrum = React.createRef();

    this.state = {
      audioContext: null,
      audioSource: null,
      prevFilter: null,
      started: false,
      buttonText: "Waiting for audio file..."
    }
    this.highPassFilter = null;
    this.audioCtx = null;
    this.currentAudioSource = null;
    this.loadAudio = this.loadAudio.bind(this); // TODO(newmans): Better understand this.
    this.handleFileUpload = this.handleFileUpload.bind(this); // TODO(newmans): Better understand this.
  }

  loadAudio = (files) => {
    console.log("Loading audio from path: " + files[0].path);

    var self = this; // TODO(newmans): *SUPER* not cool. Should not do this.

    // Trying to load file from path in drag and drop...
    const reader = new FileReader()
    reader.onabort = () => console.log('file reading was aborted')
    reader.onerror = () => console.log('file reading has failed')
    reader.onload = () => {
      if (self.audioCtx == null) {
        self.audioCtx = new AudioContext(); // TODO(newmans): Initialize audio ctx outside of this method.
      }

      if (self.highPassFilter == null) {
        // TODO(newmans): Have better state management. Model a filter separately. Look into Redux.
        self.highPassFilter = self.audioCtx.createBiquadFilter();
        self.highPassFilter.type = 'highpass';
        self.highPassFilter.frequency.value = 20;
      }

      console.log("File reader result: " + reader.result);

      self.audioCtx.decodeAudioData(
          reader.result,
          (buffer) => {
                  if (self.currentAudioSource != null) {
                    self.currentAudioSource.stop(); // stop previous audio
                  }

                  self.currentAudioSource = self.audioCtx.createBufferSource(); // creates a sound source
                  var source = self.currentAudioSource;

                  source.loop = true; // loop sounds
                  source.buffer = buffer; // tell the source which sound to play

                  source.connect(self.highPassFilter); // connect the source to the context's destination (the speakers)
                  self.highPassFilter.connect(self.audioCtx.destination); // route from high pass to speakers

                  console.log("abc123, high pass filter: " + self.highPassFilter);
                  self.setState({
                      audioContext: self.audioCtx, // TODO(newmans): bad
                      audioSource: source,
                      prevFilter: self.highPassFilter,
                      started: true,
                      buttonText: "Audio started!"
                  });


                  source.start(0); // start playing

                  this.audioSpectrum.current.setupAnalyzer(self.highPassFilter); // initalize visualizer

          },
          () => {});
    };

    reader.readAsArrayBuffer(files[0]);
  }

  updateFilter = (value) => {
    if (this.highPassFilter != null) {
      this.highPassFilter.frequency.value = value;
    }

  }



  handleFileUpload = (acceptedFiles) => {
    console.log(acceptedFiles);
    this.loadAudio(acceptedFiles);
  }

  toggleAudio = (event) => {
    console.log("button event: " + event);
  }

  render() {
    return (
      <div>
        <Dropzone onDrop={this.handleFileUpload}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div id="file-dragger" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
        <p>{this.state.buttonText}</p>
        <br />
        <br />
        <span>High-pass filter</span>
        <EqKnob ref={this.eqKnob} audioContext={this.state.audioContext} audioSource={this.state.audioSource} onChangeFrequency={this.updateFilter} />
        <AudioSpectrum ref={this.audioSpectrum} audioContext={this.state.audioContext} audioSource={this.state.audioSource} />
      </div>
    )
  }
}

