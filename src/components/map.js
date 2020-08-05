import React from 'react';
import Tone from 'tone';
import Cull from './cull';
import Archipelago from './archipelago';
import Letter from './letter';
import Fuite from './fuite';
import Oblong from './oblong';

import irridescent from '../assets/radial/irridescent.png';
import octo from '../assets/octo.png';
import feet from '../assets/feet.png';
import squidge from '../assets/nban-squidge.png';
import mewr from '../assets/radial/mew-sat-r.png';

import chandelier from '../assets/soundfiles/chandelier.mp3';
import slopoke from '../assets/soundfiles/slopoke.mp3';
import svvities from '../assets/soundfiles/svvities.mp3';

const smoothing = 0.3;
const windowSize = 16;

class Map extends React.Component {
  constructor(props){
    super(props);
    this.reRoute = this.reRoute.bind(this);
    this.state = {
      route: 0,
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

  reRoute(newRoute){
    this.setState({
      route: newRoute
    });
  }

  render(props) {
    if(this.state.route === 0){
      var page = (
          <div className="weltanschauung">

          {/* shader number is 0=culling, 1=squiggly */}
            <Cull
            x={0}
            y={0}
            width={750}
            height={1500}
            meter={this.state.meter}
            fft={this.state.fft}
            canvasImg={irridescent}
            movement={0.3}
            shaderNo={0}
            />

              <Archipelago x={730} y={440} w={40} h={40}
              imgW={866}
              imgH={1000}
              amount={10}
              density={100}
              classList={"yell"}
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

                <Fuite x={100} y={100} w={100} h={100}
                classList={'nanum'}
                text={'how not to fall prey to the archive?'}
                imgPath={null}
                route={() => this.reRoute(2)}
                />

                <Fuite x={550} y={1370} w={700*0.1} h={500*0.1}
                classList={'nanum'}
                text={null}
                imgPath={squidge}
                route={() => this.reRoute(1)}
                />

              <Oblong
              x={260}
              y={800}
              width={80}
              height={80}
              audioPath={slopoke}
              imgPath={octo}
              gain={this.state.gain}
              />

              <div className={"bottom"}>hola</div>
            </div>
        );
      }

      if(this.state.route === 1){
        var page = (
          <div className="weltanschauung">

              <Fuite x={900} y={150} w={200} h={200}
              classList={'nanum'}
              text={null}
              imgPath={feet}
              route={() => this.reRoute(0)}
              />

              {/* shader number is 0=culling, 1=squiggly */}
              <Cull
              x={200}
              y={400}
              width={700}
              height={500}
              meter={this.state.meter}
              fft={this.state.fft}
              canvasImg={squidge}
              movement={1.0}
              shaderNo={1}
              />
          </div>);
      }

      if(this.state.route === 2){
        var page = (
          <div className="weltanschauung">

          <Letter
          x={120}
          y={300}
          trans={'rotate3d(0, 1, 0, 45deg)'}
          orient={10}
          fontsize={55}
          rand={35}
          characters={['k', 'i', 'n', 'g', 'd', 'o', 'm', 'c', 'o', 'm', 'e', 'f', 'a', 'l', 'l', 'i', 'n', 'g']}
          />

              {/* shader number is 0=culling, 1=squiggly */}
              <Cull
              x={50}
              y={-350}
              width={1700}
              height={1100}
              meter={this.state.meter}
              fft={this.state.fft}
              canvasImg={mewr}
              movement={0.3}
              shaderNo={0}
              classList={"fortyfive"}
              />

              <Fuite x={1000} y={850} w={100} h={100}
              classList={'nanum seafoam'}
              text={'in a sweeping motion'}
              imgPath={null}
              route={() => this.reRoute(0)}
              />


                      <Archipelago x={730} y={440} w={80} h={80}
                      imgW={818}
                      imgH={553}
                      amount={4}
                      density={300}
                      classList={"sinkcin"}
                      audioPath={svvities}
                      gain={this.state.gain}
                      />

          </div>
        );
      }


    return (page);
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
