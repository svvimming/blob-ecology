import React from 'react';
import Tone from 'tone';
import Oblong from './oblong';
import Cull from './cull';
import Culldrip from './culldrip';
import Archipelago from './archipelago';
import Letter from './letter';

import cullingBottom from '../assets/culling-bottom.png';
import cullingTop from '../assets/culling-top-low-res-top-left-corner.png';
import radial1 from '../assets/radial/radial1.png';
import radial2 from '../assets/radial/radial2.png';
import radial3 from '../assets/radial/radial3.png';
import radial4 from '../assets/radial/radial4.png';
import irridescent from '../assets/radial/irridescent.png';

import {plobs, globs} from './blobdata';
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
      still: globs,
      gloopy: plobs,
      zoom: 1.0,
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
          styleClass={"irridescent"}
          width={500}
          height={1000}
          meter={this.state.meter}
          fft={this.state.fft}
          canvasImg={irridescent}
          movement={0.3}
          />



            <Archipelago
            left={730}
            top={440}
              audioPath={chandelier}
              gain={this.state.gain}
              />

              <Letter/>

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
