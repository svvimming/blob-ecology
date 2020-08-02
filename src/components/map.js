import React from 'react';
import Tone from 'tone';
import Cull from './cull';
import Archipelago from './archipelago';
import Letter from './letter';
import Fuite from './fuite';

import cullingBottom from '../assets/culling-bottom.png';
import cullingTop from '../assets/culling-top-low-res-top-left-corner.png';
import irridescent from '../assets/radial/irridescent.png';

import chandelier from '../assets/soundfiles/chandelier.mp3';

const smoothing = 0.3;
const windowSize = 16;

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      follower: new Tone.Follower(smoothing),
      meter: new Tone.Meter(),
      gain: new Tone.Gain(4.0),
      fft: new Tone.FFT(windowSize)
    };
  }

  componentDidMount(){
    this.state.follower.connect(this.state.meter);
    this.state.gain.connect(this.state.fft);
    this.state.gain.connect(this.state.follower);
  }

  render(props) {
    return (
      <div className="weltanschauung">

          <Cull
          x={0}
          y={0}
          width={750}
          height={1500}
          meter={this.state.meter}
          fft={this.state.fft}
          canvasImg={irridescent}
          movement={0.3}
          />

            <Archipelago
            x={730}
            y={440}
            amount={10}
            audioPath={chandelier}
            gain={this.state.gain}
            />

              <Letter
              x={400}
              y={500}
              trans={'rotate3d(0, 1, 0, 45deg)'}
              orient={10}
              fontsize={25}
              rand={35}
              characters={['how', 'not', 't', 'o', 'f', 'a', 'l', 'l', 'p', 'r', 'e', 'y', 'to', 't', 'h', 'e', 'a', 'r', 'c', 'h', 'i', 'v', 'e', '?']}
              />

              <Fuite
              x={100}
              y={100}
              width={100}
              height={100}
              trans={'rotate3d(0, 1, 0, 0deg)'}
              orient={0}
              classList={'nanum'}
              text={'how not to fall prey to the archive?'}
              />

              <div className={"bottom"}>hola</div>
        </div>
      );
}
}

export default Map;

// <Culldrip
// styleClass={"culling-bottom"}
// width={600}
// height={282}
// meter={this.state.meter}
// fft={this.state.fft}
// canvasImg={cullingBottom}
// movement={0.3}
// />

      // <div className={"oblong-black"}></div>
      // <div className={"bottom"}>hola</div>


                // <Cull
                // styleClass={"radial1"}
                // width={100}
                // height={182}
                // meter={this.state.meter}
                // fft={this.state.fft}
                // canvasImg={radial1}
                // movement={0.7}
                // />
                // <Cull
                // styleClass={"radial2"}
                // width={300}
                // height={300}
                // meter={this.state.meter}
                // fft={this.state.fft}
                // canvasImg={radial2}
                // movement={0.3}
                // />
                // <Cull
                // styleClass={"radial3"}
                // width={100}
                // height={200}
                // meter={this.state.meter}
                // fft={this.state.fft}
                // canvasImg={radial3}
                // movement={0.3}
                // />
                // <Cull
                // styleClass={"radial4"}
                // width={200}
                // height={300}
                // meter={this.state.meter}
                // fft={this.state.fft}
                // canvasImg={radial4}
                // movement={0.3}
                // />
