import React from "react"

export default class AudioSpectrum extends React.Component {
    constructor(props) {
      super(props);

      // TODO(newmans): Move to componentDidMount.
      this.analyzer = null;
      this.setupAnalyzer();

      this.state = {
        frequencyDomain: true
      }
    }

    componentDidMount() {
      this.drawSpectrum();
    }

    getFilter = () => {
      return this.analyzer;
    }

    setupAnalyzer = () => {
      console.log("Generating audio spectrum analyzer (for visualization)");
      if (this.analyzer === null) {
        this.analyzer = this.props.audioContext.createAnalyser(); 
       
        // Params
        this.analyzer.fftSize = 4096;

        this.signalBuffer = new Uint8Array(this.analyzer.frequencyBinCount);
      }
    }

    drawSpectrum = () => {
      if (this.analyzer === null) {
        console.log("Cannot draw spectrum before analyzer is initialized");
        return;
      }

      requestAnimationFrame(this.drawSpectrum);
      var bufferLength = this.analyzer.frequencyBinCount;

      const width = 500;
      const height = 500;
      const canvasCtx = this.refs.canvas.getContext('2d');
      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, width, height);

      if (!this.state.frequencyDomain) {
        // Time domain signal
        this.analyzer.getByteTimeDomainData(this.signalBuffer);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

        canvasCtx.beginPath();

        var sliceWidth = width * 1.0 / bufferLength;
        var x = 0;

        for(var i = 0; i < bufferLength; i++) {

          var v = this.signalBuffer[i] / 128.0;
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
        // Frequency domain signal
        this.analyzer.getByteFrequencyData(this.signalBuffer);

        var barWidth = (width / bufferLength) * 2.5;
        var barHeight;
        x = 0;

        for(i = 0; i < bufferLength; i++) {
          barHeight = this.signalBuffer[i];

          canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ', 50, 50)';
          canvasCtx.fillRect(x, height - barHeight / 2, barWidth, barHeight / 2);

          x += barWidth + 1;
        }
      }
    }
    
    handleToggleDomains = (event) => {
      console.log("Toggling frequency/time domain");
      this.setState({frequencyDomain: !this.state.frequencyDomain});
    }

    getDomainName = () => {
      return this.state.frequencyDomain ? "frequency" : "time";
    }

    render() {
        return (
          <div>
            <canvas ref="canvas" width={500} height={500}/>
            <button onClick={this.handleToggleDomains}>Toggle time/frequency domain</button>
            <p>Domain: {this.getDomainName()}</p>
          </div>
        );
    }
}
