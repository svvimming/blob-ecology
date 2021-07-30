import React from 'react';
import { Link } from "react-router-dom";
import Cull from '../components/cull';

import tiny from '../assets/radial/tiny-world.png';

function TinyWorld(props){
  return(
    <div className="weltanschauung">

        {/* shader number is 0=culling, 1=squiggly */}
        <Cull
        x={0}
        y={0}
        width={1000}
        height={1000}
        meter={props.meter}
        fft={props.fft}
        canvasImg={tiny}
        movement={0.3}
        shaderNo={0}
        />

    </div>
  );
}

export default TinyWorld;
