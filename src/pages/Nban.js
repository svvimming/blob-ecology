import React from 'react';
import { Link } from "react-router-dom";
import Cull from '../components/cull';

import squidge from '../assets/nban-squidge.png';

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

export default Nban;
