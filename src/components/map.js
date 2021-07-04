import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Tone from 'tone';

import ALongWalk from '../pages/ALongWalk';
import Rollingunrolling from '../pages/Rollingunrolling';
import Nban from '../pages/Nban';
import Aside from '../pages/Aside';

const smoothing = 0.3;
const windowSize = 16;
const fadetime = 5;
const paths = ["/alongwalk", "/nban", "/rollingunrolling", "/aside"];
const trackPaths = [
  "aside.mp3",
  "broken-sweaty.mp3",
  "call-it-blind.mp3",
  "every-moon.mp3",
  "forgot-the-leaves.mp3",
  "found-some-in-the-forest.mp3",
  "ghosts-too-heavy-to-fly.mp3",
  "meantime.mp3",
  "morning-in-outer-space.mp3",
  "mythology-of-labour.mp3",
  "pink-sky.mp3",
  "shells.mp3",
  "somedays-return.mp3",
  "witness-of-these-walls.mp3"
];

class Map extends React.Component {
  constructor(props){
    super(props);
    // this.fetchBuffer = this.fetchBuffer.bind(this);
    // this.startPlaybackA = this.startPlaybackA.bind(this);
    this.loadPlayer = this.loadPlayer.bind(this);
    this.sayhi = this.sayhi.bind(this);
    this.saybye = this.saybye.bind(this);
    this.state = {
      redirect: paths[0],//paths[Math.floor(Math.random()*paths.length)],
      follower: new Tone.Follower(smoothing),
      meter: new Tone.Meter(),
      gain: new Tone.Gain(4.0),
      fft: new Tone.FFT(windowSize),
      init: false,
    };
    // this.interval = 0;
    // this.buffers = [];
    // this.players = [];
    // this.index = 0;
    this.player = false;
  }

  loadPlayer () {
    const path = trackPaths[Math.floor(Math.random() * trackPaths.length)];
    this.player = new Tone.Player({
      "url": process.env.PUBLIC_URL + '/assets/tracks/test.mp3',
      "onload": this.sayhi,
      "onstop": this.saybye
    });
    console.log(this.player);

    // this.player.onstop = this.sayhi;
  }

  sayhi () {
    this.player.connect(this.state.gain);
    this.player.toMaster();
    this.player.start(0);
    this.player.onstop = this.saybye
    console.log('hi');
    setTimeout(() => {
    console.log('byebye')
      this.loadPlayer()
    }, this.player.buffer.duration * 1000)
  }

  saybye () {
    console.log('bye');
  }

  // fetchBuffer () {
  //   const then = Date.now();
  //   const path = trackPaths[Math.floor(Math.random() * trackPaths.length)];
  //   console.log(path)
  //   this.buffers[this.index] = new Tone.Buffer(
  //     process.env.PUBLIC_URL + '/assets/tracks/' + path,
  //     () => { this.startPlaybackA(then) }
  //   );
  // }
  //
  // startPlaybackA (then) {
  //   const now = Date.now();
  //   this.players[this.index] = new Tone.Player(this.buffers[this.index]);
  //   const duration = this.buffers[this.index].duration * 1000;
  //   const start = this.index === 0 ? 0 : Math.max((duration / 2) - (now - then), 0);
  //
  //   this.players[this.index].connect(this.state.gain);
  //   this.players[this.index].toMaster();
  //   this.players[this.index].start(0);
  //
  //   this.index ++;
  //   console.log(this.index);
  //   console.log(this.buffers);
  //   if (this.players.length > 2) {
  //     this.players[this.index - 2].dispose();
  //   }
  //   setTimeout(() => {
  //     this.fetchBuffer();
  //   }, start + (duration / 2))
  // }

  componentDidMount() {
    this.state.follower.connect(this.state.meter);
    this.state.gain.connect(this.state.fft);
    this.state.gain.connect(this.state.follower);

    window.addEventListener('click', () => {
      // this.fetchBuffer();
      this.loadPlayer();
    })
  }

  componentWillUnmount(){
    this.state.follower.dispose();
    this.state.meter.dispose();
    this.state.gain.dispose();
    this.state.fft.dispose();
    if (this.state.init) { window.removeEventListener('click', this.state.init); }
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
