import React from "react"

export default class AudioSpectrum extends React.Component {
    constructor(props) {
      super(props);

      this.analyzer = null;
      this.timeBuffer = null;
      this.frequencyBuffer = null;

    }
    componentDidMount() {
        //this.setupAnalyzer();
    }
    componentDidUpdate() {
      ///////////////////////////
      // TODO(newmans): This is super ugly. Must find a better way to update state, unless componentDidUpdate is normal.
      ///////////////////////////
      if (this.props.audioContext != null && this.props.audioSource != null) {
        console.log("Audio context and audio source are not null! We can analyze them now.");
      }
    }
    setupAnalyzer(audioNode) {
      console.log("Audio spectrum componentDidUpdate()");
      console.log("Props audioContext: " + this.props.audioContext);
      console.log("Props audioSource: " + this.props.audioSource);
      console.log("Props audioContext: " + this.props.audioContext);
      console.log("Props prev filter: " + this.props.prevFilter);
      console.log("Passed-in audio node (high pass filter): " + audioNode);

      this.analyzer = this.props.audioContext.createAnalyser(); // should only need to create once, as long as audiocontext remains the same.

      // Important line: this connects the output of audio signal (the biquad high pass filter node) to the analyzer.
      // Analyzer should reflect post-filtered sound, not original source.
      audioNode.connect(this.analyzer)
      
      this.analyzer.fftSize = 4096;

      var bufferLength = this.analyzer.frequencyBinCount;
      this.timeBuffer = new Uint8Array(bufferLength);
      this.frequencyBuffer = new Uint8Array(bufferLength);

      // put into own method
      this.analyzer.getByteTimeDomainData(this.timeBuffer);
      this.analyzer.getByteFrequencyData(this.frequencyBuffer);

      this.drawSpectrum();
    }

    drawSpectrum = () => {
      requestAnimationFrame(this.drawSpectrum);
      this.analyzer.getByteTimeDomainData(this.timeBuffer);
      this.analyzer.getByteFrequencyData(this.frequencyBuffer);
      var bufferLength = this.analyzer.frequencyBinCount;

      const width = 500;
      const height = 500;
      const canvasCtx = this.refs.canvas.getContext('2d');

      // First branch is time-domain, second is frequency domain.
      if (false) {
        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, width, height);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        canvasCtx.beginPath();


        var sliceWidth = width * 1.0 / bufferLength;
        var x = 0;

        for(var i = 0; i < bufferLength; i++) {

          var v = this.timeBuffer[i] / 128.0;
          var y = v * height/2;

          if(i === 0) {
            canvasCtx.moveTo(x, y);
          } else {
            canvasCtx.lineTo(x, y);
          }

          x += sliceWidth;
        }

        canvasCtx.lineTo(width, height/2);
        canvasCtx.stroke();
      } else {
        canvasCtx.fillStyle = 'rgb(200, 200, 200)';
        canvasCtx.fillRect(0, 0, width, height);

        var barWidth = (width / bufferLength) * 2.5;
        var barHeight;
        x = 0;

        for(i = 0; i < bufferLength; i++) {
          barHeight = this.frequencyBuffer[i];

          canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ', 50, 50)';
          canvasCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

          x += barWidth + 1;
        }
      }
    }

    render() {
        return (
            <canvas ref="canvas" width={500} height={500}/>
        );
    }
}
