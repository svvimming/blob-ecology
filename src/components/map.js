import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Tone from 'tone';
import Cull from './cull';
import Archipelago from './archipelago';
import Letter from './letter';
import Oblong from './oblong';

import irridescent from '../assets/radial/irridescent.png';
import squidge from '../assets/nban-squidge.png';
import mew from '../assets/radial/mew.png';
import dots from '../assets/radial/dots3.png';

import grate1 from '../assets/grate/1.png';
import grate2 from '../assets/grate/2.png';
import grate3 from '../assets/grate/3.png';
import grate4 from '../assets/grate/4.png';

import octo from '../assets/octo.png';
import orbitals from '../assets/orbitals.gif';
import bubble from '../assets/bubble.png';

import chandelier from '../assets/soundfiles/chandelier.mp3';
import glassy from '../assets/soundfiles/glassy.mp3';
import slopoke from '../assets/soundfiles/slopoke.mp3';
import svvities from '../assets/soundfiles/svvities.mp3';
import psychic from '../assets/soundfiles/rightandleft.mp3';
import ovaling from '../assets/soundfiles/ovaling-short.mp3';
import clunks from '../assets/grate/clunks.mp3';
import aside from '../assets/grate/aside.mp3';

const smoothing = 0.3;
const windowSize = 16;
const paths = ["/alongwalk", "/nban", "/rollingunrolling", "/aside"];

function ALongWalk(props) {
  return (
    <div className="weltanschauung">

    {/* shader number is 0=culling, 1=squiggly */}
      <Cull
      x={0}
      y={0}
      width={750}
      height={1500}
      meter={props.meter}
      fft={props.fft}
      canvasImg={irridescent}
      movement={0.3}
      shaderNo={0}
      />

      <Cull
      x={500}
      y={1400}
      width={972}
      height={1600}
      meter={props.meter}
      fft={props.fft}
      canvasImg={dots}
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
          gain={props.gain}
          />

                        <Letter
                        x={400}
                        y={500}
                        trans={'rotate3d(0, 1, 0, 45deg)'}
                        orient={10}
                        fontsize={25}
                        rand={35}
                        characters={['a', 'l', 'o', 'n', 'g', ' ', 'w', 'a', 'l', 'k', 'to', 's', 'o', 'm', 'e', 'w', 'h', 'e', 'r', 'e', ' ', 'c', 'l', 'o', 's', 'e', '?']}
                        />

                        <Letter
                        x={270}
                        y={1300}
                        trans={'rotate3d(0.7, 1, 0.2, 45deg)'}
                        orient={10}
                        fontsize={25}
                        rand={35}
                        characters={['k', 'i', 'n', 'g', 'd', 'o', 'm', 'c', 'o', 'm', 'e', ' ', 'f', 'a', 'l', 'l', 'i', 'n', 'g']}
                        />

                        <Letter
                        x={470}
                        y={2400}
                        trans={'rotate3d(-0.2, 1, -0.5, 45deg)'}
                        orient={10}
                        fontsize={30}
                        rand={35}
                        characters={['in', ' ', 'a,', ' ', 's', 'w', 'e', 'e', 'p', 'i', 'n', 'g', 'm', 'o', 't', 'i', 'o', 'n']}
                        />


        <Oblong
        x={260}
        y={800}
        width={80}
        height={80}
        audioPath={glassy}
        startTime={Math.random()}
        imgPath={octo}
        gain={props.gain}
        />

          <Archipelago x={800} y={1500} w={40} h={40}
          imgW={320}
          imgH={680}
          amount={9}
          density={100}
          classList={"slant"}
          audioPath={slopoke}
          gain={props.gain}
          />

          <Oblong
          x={830}
          y={2450}
          width={80}
          height={80}
          audioPath={psychic}
          startTime={0.0}
          imgPath={orbitals}
          gain={props.gain}
          />

          <Link to="/nban" style={{position: 'absolute', top: '1370px', left: '550px', color: '#083182'}}>
              <img
              src={squidge}
              alt="oopsie"
              style={{width: '70px', height: '50px'}}
              >
              </img>
          </Link>

          <Link to="/rollingunrolling" style={{position: 'absolute', top: '100px', left: '150px', width: '100px'}}>rollingunrolling</Link>


        <div className={"bottom"}>hola</div>
      </div>
  );
}

function Nban(props){
  return(
    <div className="weltanschauung">

        {/* shader number is 0=culling, 1=squiggly */}
        <Cull
        x={600}
        y={400}
        width={700}
        height={500}
        meter={props.meter}
        fft={props.fft}
        canvasImg={squidge}
        movement={1.0}
        shaderNo={1}
        classList={"slither"}
        />

        <Link to="/alongwalk" style={{position: 'absolute', top: '150px', left: '900px', color: '#083182'}}>a long walk to somewhere close</Link>

    </div>
  );
}

function Rollingunrolling(props){
  return(
    <div className="weltanschauung">

    <Letter
    x={120}
    y={300}
    trans={'rotate3d(0, 1, 0, 45deg)'}
    orient={10}
    fontsize={55}
    rand={35}
    characters={['r', 'o', 'l', 'l', 'i', 'n', 'g', 'u', 'n', 'r', 'o', 'l', 'l', 'i', 'n', 'g', 'g', 'g']}
    />

        {/* shader number is 0=culling, 1=squiggly */}
        <Cull
        x={50}
        y={-350}
        width={1700}
        height={1100}
        meter={props.meter}
        fft={props.fft}
        canvasImg={mew}
        movement={0.3}
        shaderNo={0}
        classList={"fortyfive"}
        />

        <Link to="/alongwalk" style={{position: 'absolute', width: '100px', top: '850px', left: '1000px', color: '#497373'}}>a long walk to somewhere close</Link>
        <Link to="/aside" style={{position: 'absolute', top: '1100px', left: '600px'}}>
            <img
            src={grate1}
            alt="oopsie"
            style={{width: '50px', height: '50px'}}
            >
            </img>
        </Link>


                <Archipelago x={730} y={440} w={80} h={80}
                imgW={818}
                imgH={553}
                amount={4}
                density={300}
                classList={"sinkcin"}
                audioPath={svvities}
                gain={props.gain}
                />

                <Archipelago x={130} y={840} w={25} h={25}
                imgW={894}
                imgH={724}
                amount={8}
                density={300}
                classList={"fungi"}
                audioPath={ovaling}
                gain={props.gain}
                />

                <Oblong
                x={330}
                y={1000}
                width={80}
                height={80}
                audioPath={ovaling}
                startTime={0.0}
                imgPath={bubble}
                gain={props.gain}
                />

    </div>
  );
}

function Aside(props){
  return(
    <div className="weltanschauung mustard">

                <Oblong
                x={300}
                y={300}
                width={300}
                height={300}
                audioPath={aside}
                startTime={0.0}
                imgPath={grate1}
                gain={props.gain}
                classList={"click-me"}
                />

                <Oblong
                x={300}
                y={300}
                width={300*0.89}
                height={300*0.85}
                audioPath={aside}
                startTime={0.2353}
                imgPath={grate2}
                gain={props.gain}
                classList={"click-me"}
                />

                <Oblong
                x={300}
                y={300}
                width={300*0.81}
                height={300*0.72}
                audioPath={aside}
                startTime={0.48}
                imgPath={grate3}
                gain={props.gain}
                classList={"click-me"}
                />

                <Oblong
                x={300}
                y={300}
                width={300*0.70}
                height={300*0.60}
                audioPath={aside}
                startTime={0.6765}
                imgPath={grate4}
                gain={props.gain}
                classList={"click-me"}
                />

                  <Archipelago x={160} y={100} w={30} h={30}
                  imgW={2304}
                  imgH={2304}
                  amount={40}
                  density={1000}
                  classList={"hellfun"}
                  audioPath={clunks}
                  gain={props.gain}
                  />

                  <Archipelago x={260} y={200} w={100} h={100}
                  imgW={2304}
                  imgH={2304}
                  amount={20}
                  density={100}
                  classList={"hellfun"}
                  audioPath={clunks}
                  gain={props.gain}
                  />

                  <Link to="/alongwalk" style={{position: 'absolute', width: '100px', top: '250px', left: '1000px', color: 'white'}}>a long walk to somewhere close</Link>


              </div>
        );
}

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      redirect: paths[0],//paths[Math.floor(Math.random()*paths.length)],
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

  componentWillUnmount(){
    this.state.follower.dispose();
    this.state.meter.dispose();
    this.state.gain.dispose();
    this.state.fft.dispose();
  }

  render(props) {
    return (
      <Router>
        <div id="router">
          <Switch>
            <Route path="/alongwalk">
              <ALongWalk meter={this.state.meter} fft={this.state.fft} gain={this.state.gain}/>
            </Route>
            <Route path="/nban">
              <Nban meter={this.state.meter} fft={this.state.fft} gain={this.state.gain}/>
            </Route>
            <Route path="/rollingunrolling">
              <Rollingunrolling meter={this.state.meter} fft={this.state.fft} gain={this.state.gain}/>
            </Route>
            <Route path="/aside">
              <Aside meter={this.state.meter} fft={this.state.fft} gain={this.state.gain}/>
            </Route>

            <Route>
              <Redirect to={this.state.redirect}/>
            </Route>

          </Switch>
        </div>
      </Router>
    );
  }
}


export default Map;
