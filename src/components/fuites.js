import React from 'react';
import Blob from './blob';
import Tone from 'tone';
import {blobData} from './blobdata'

const smoothing = 0.3;
const windowSize = 16; //don't change unless binWidth in animate-cull.js is changed also!

class Fuites extends React.Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      children: blobData,
      zoom: 10.0,
      follower: new Tone.Follower(smoothing),
      meter: new Tone.Meter(),
      gain: new Tone.Gain(4.0),
      fft: new Tone.FFT(windowSize)
    }
  }

  componentDidMount(){
    this.state.follower.connect(this.state.meter);
    this.state.gain.connect(this.state.fft);
    this.state.gain.connect(this.state.follower);
  }

  handleClick() {
    this.props.modeSelect(0, 0);
  }

  render(props) {

  return (
      <span>
        <div className="zoom-select">
          <button onClick={this.handleClick}>survol</button>
        </div>

          {this.state.children.map((element, index) => (
            <Blob
            key={'blob'+index}
            x={element.x*this.state.zoom}
            y={element.y*this.state.zoom}
            diameter={element.diameter*this.state.zoom}
            rotation={element.rotation}
            radii={element.radii}
            color={element.color}
            imgPath={process.env.PUBLIC_URL + element.image}
            audioPath={process.env.PUBLIC_URL + '/assets/a-long-walk-to-somewhere-close-errlymixx.mp3'}
            gain={this.state.gain}
            fft={this.state.fft}
            meter={this.state.meter}
            />
          ))}

      </span>
    );
}
}

export default Fuites;
