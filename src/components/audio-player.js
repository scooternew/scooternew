import React from "react"
import Dropzone from "react-dropzone"
import AudioSpectrum from "./audio-spectrum"
import SimpleEqKnob from "./eq-knob"
import soundFile from "./JustShopping.mp3" // remove from this directory and find by graphQL

export default class AudioPlayer extends React.Component {
  constructor(props) {
    super(props);

    // Refs for connecting all the filters together.
    // TODO(newmans): Figure out how to connect them all programmatically.
    // The end goal should be, define the chain in HTML within a div, and
    // this component will automatically connect their AudioNodes.
    this.knob1Ref = React.createRef();
    this.knob2Ref = React.createRef();
    this.knob3Ref = React.createRef();
    this.spectrumRef = React.createRef();

    // You can currently play a single audio file and have another audio file staged in the drop zone.
    this.stagedAudioFile = null;

    // TODO(newmans): Put audio context, file info, playback status, etc. into shared state object.
    // State about the audio playing.
    this.playbackStarted = false;

    // React state
    this.state = {
      audioContext: new AudioContext(),
      audioSource: null,
      displayFilePath: "Default song.mp3"
    }

    this.startPlayback = this.startPlayback.bind(this); // TODO(newmans): Better understand this.
    this.handleFileUpload = this.handleFileUpload.bind(this); // TODO(newmans): Better understand this.
    this.handleFilterUpdate = this.handleFilterUpdate.bind(this); // TODO(newmans): Better understand this.
    //this.makePlaybackStatus = this.makePlaybackStatus.bind(this); // TODO(newmans): Better understand this.
  }

  decodeAudio(file) {
    if (this.state.audioContext != null) {
      console.log('About to decode file for audio playback: ' + file);
      var audioCtx = this.state.audioContext; 
      audioCtx.decodeAudioData(
          file,
          (buffer) => {
            // Stop any previous playback
            if (this.state.audioSource != null) {
              console.log("Stopping currently playing audio");
              this.state.audioSource.stop();
            }

            // Create new audio source (file from the drag and drop area)
            var source = audioCtx.createBufferSource();
            this.setState({audioSource: source});

            // Basic params
            source.loop = true; 
            source.buffer = buffer;

            // Connects the source to all the filters to the destination (speakers)
            this.buildFilterChain();

            // start playing from buffer at position 0
            source.start(0);

            console.log("Playback started");
            this.startedPlayback = true; // update playback state
         },
         (e) => {
           console.log("Error decoding audio: " + e);
         }
      );
    }

  }

  startPlayback = () => {
    if (this.stagedAudioFile != null) {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => this.decodeAudio(reader.result)
      reader.readAsArrayBuffer(this.stagedAudioFile);
    } else {
      var request = new XMLHttpRequest();
      request.open('GET', soundFile, true);
      request.responseType = 'arraybuffer';
      request.onload = () => this.decodeAudio(request.response)
      request.send();
    }
  }

  buildFilterChain() {
    var source = this.state.audioSource;
    var dest = this.state.audioContext.destination;

    // TODO(newmans): Figure out how to make this programmatic.
    var highPass = this.knob1Ref.current.getFilter();
    var bandPass = this.knob2Ref.current.getFilter();
    var lowPass = this.knob3Ref.current.getFilter();
    var spectrum = this.spectrumRef.current.getFilter();

    // Wire everything up.
    var filterChain = [highPass, lowPass, spectrum, dest];
    for (const filter of filterChain) {
      console.log("Connecting filter " + source + " to filter " + filter);
      source.connect(filter);
      source = filter;
    }
  }

  handleFilterUpdate = (sourceFilter) => {
    // No-op currently
  }

  handleFileUpload = (acceptedFiles) => {
    console.log(acceptedFiles);
    // Stage the file, playback on button press.
    this.stagedAudioFile = acceptedFiles[0];
    // TODO(newmans): Use file reader to get file path.
    console.log(acceptedFiles);
    this.setState({displayFilePath: this.stagedAudioFile.name});

  }
  
  makePlaybackButtonText = () => {
    return "Play";
  }

  render() {
    // Enforce one "single" filter chain.
    return (
      <div>
        <Dropzone onDrop={this.handleFileUpload}>
          {({getRootProps, getInputProps}) => (
            <section>
              <div id="file-dragger" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>{this.state.displayFilePath}</p>
              </div>
            </section>
          )}
        </Dropzone>
        <button onClick={this.startPlayback}>{this.makePlaybackButtonText()}</button>
        <br />
        <br />
        <div id="filterChain">
          <SimpleEqKnob
              audioContext={this.state.audioContext}
              ref={this.knob1Ref}
              type="highpass"
              min="20"
              max="1000"
              onUpdateFilter={this.handleFilterUpdate} />
          <br />
          <SimpleEqKnob
              audioContext={this.state.audioContext}
              style={{display: `none`}}
              ref={this.knob2Ref}
              type="bandpass"
              min="200"
              max="1000"
              onUpdateFilter={this.handleFilterUpdate} />
          <br />
          <SimpleEqKnob
              audioContext={this.state.audioContext}
              ref={this.knob3Ref}
              type="lowpass" 
              min="1000" 
              max="20000" 
              onUpdateFilter={this.handleFilterUpdate} />
          <br />
          <AudioSpectrum audioContext={this.state.audioContext} ref={this.spectrumRef} />
        </div>
      </div>
    )
  }
}

