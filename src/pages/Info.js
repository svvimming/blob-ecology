import React from 'react';
import { Link } from "react-router-dom";
import Cull from '../components/cull';

import irridescent from '../assets/radial/irridescent.png';

function Info(props) {
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

      <Link to="/rollingunrolling" style={{position: 'absolute', top: '100px', left: '150px', width: '100px'}}>rollingunrolling</Link>

    </div>
  );
}

export default Info;
