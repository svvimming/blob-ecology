import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Tone from 'tone';

import ALongWalk from '../pages/ALongWalk';
import Rollingunrolling from '../pages/Rollingunrolling';
import Nban from '../pages/Nban';
import Aside from '../pages/Aside';
import FollowingStrangers from '../pages/FollowingStrangers';
import TinyWorld from '../pages/TinyWorld';

const smoothing = 0.3;
const windowSize = 16;
const paths = ["/alongwalk", "/nban", "/rollingunrolling", "/aside"];

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

  componentDidMount () {
    this.state.follower.connect(this.state.meter);
    this.state.gain.connect(this.state.fft);
    this.state.gain.connect(this.state.follower);
  }

  componentWillUnmount () {
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
            <Route path="/following-strangers">
              <FollowingStrangers meter={this.state.meter} fft={this.state.fft} gain={this.state.gain}/>
            </Route>
            <Route path="/tiny-world">
              <TinyWorld meter={this.state.meter} fft={this.state.fft} gain={this.state.gain}/>
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
