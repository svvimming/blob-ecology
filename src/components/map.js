import React from 'react';
import Tone from 'tone';
import AnimateTerritory from './animate-territory';
import Territory from './territory';
import {blobs} from './blobdata';
import arp from '../assets/soundfiles/arp.mp3';
import chandelier from '../assets/soundfiles/chandelier.mp3';
import collectors from '../assets/soundfiles/collectors.mp3';
import comeon from '../assets/soundfiles/comeon.mp3';
import ehorn from '../assets/soundfiles/ehorn.mp3';
import falling from '../assets/soundfiles/falling.mp3';
import flick from '../assets/soundfiles/flick.mp3';
import glassy from '../assets/soundfiles/glassy.mp3';
import mmmwow from '../assets/soundfiles/mmmwow.mp3';
import oiltin from '../assets/soundfiles/oiltin.mp3';
import pluck from '../assets/soundfiles/pluck.mp3';
import squeaky from '../assets/soundfiles/squeaky.mp3';
import svvimming1 from '../assets/soundfiles/svvimming1.mp3';
import svvimming2 from '../assets/soundfiles/svvimming2.mp3';
import svvimming3 from '../assets/soundfiles/svvimming3.mp3';
import svvimming4 from '../assets/soundfiles/svvimming4.mp3';
import svvimming5 from '../assets/soundfiles/svvimming5.mp3';
import tongue from '../assets/soundfiles/tongue.mp3';
import whoops from '../assets/soundfiles/whoops.mp3';
import yes from '../assets/soundfiles/yes.mp3';

const audioLinks = [arp, chandelier, collectors, comeon, ehorn, falling, flick, glassy, mmmwow, oiltin, pluck, squeaky, svvimming1, svvimming2, svvimming3, svvimming4, svvimming5, tongue, whoops, yes];
const smoothing = 0.3;
const windowSize = 16;

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      still: blobs,
      gloopy: [],
      zoom: 1.0,
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

  render(props) {
    return (
      <span>
          {this.state.still.map((element, index) => (
            <Territory
            key={'blob'+index}
            x={element.x*this.state.zoom}
            y={element.y*this.state.zoom}
            diameter={element.diameter*this.state.zoom}
            rotation={element.rotation}
            radii={element.radii}
            color={element.color}
            imgPath={process.env.PUBLIC_URL + element.image}
            audioPath={audioLinks[Math.floor(Math.random()*audioLinks.length)]}
            gain={this.state.gain}
            />
          ))}
          {this.state.gloopy.map((element, index) => (
            <AnimateTerritory
            key={'blob'+index}
            x={element.x*this.state.zoom}
            y={element.y*this.state.zoom}
            diameter={element.diameter*this.state.zoom}
            rotation={element.rotation}
            radii={element.radii}
            color={element.color}
            imgPath={process.env.PUBLIC_URL + element.image}
            audioPath={audioLinks[Math.floor(Math.random()*audioLinks.length)]}
            meter={this.state.meter}
            fft={this.state.fft}
            gain={this.state.gain}
            />
          ))}
        </span>
      );
}
}

export default Map;
