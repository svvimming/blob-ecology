import React from 'react';
import { Link } from "react-router-dom";
import Cull from '../components/cull';
import Oblong from '../components/oblong';

import following from '../assets/following-strangers.png';
import strangers from '../assets/soundfiles/following-strangers.mp3';
import black from '../assets/black.png';

const inc = 6.5;

function FollowingStrangers(props){
  const slices = [];
  for (let i = 0; i < 200; i++) {
    slices.push(i)
  }
  return(
    <div>
      <Link to="/aside" style={{position: 'absolute', width: '100px', top: '250px', left: '1000px'}}>aside</Link>

      <Cull
      x={0}
      y={0}
      width={750}
      height={750}
      meter={props.meter}
      fft={props.fft}
      canvasImg={following}
      movement={0.3}
      shaderNo={0}
      />

      <div className="slippery-wrapper">
        {slices.map(slice => (
          <div
            className="scoreboard"
            key={'slice-' + slice}
            style={{
              width: Math.floor(1400/slices.length) + 'px',
              backgroundPosition: -1 * slice * inc + 'px 0'
            }}>
          </div>
        ))}
      </div>

      <Oblong
      x={700}
      y={720}
      width={100}
      height={100}
      audioPath={strangers}
      startTime={0}
      imgPath={black}
      gain={props.gain}
      />

    </div>
    );
}

export default FollowingStrangers;
