import React from 'react';
import { Link } from "react-router-dom";
// import Tone from 'tone';
import Cull from '../components/cull';
import Archipelago from '../components/archipelago';
import Letter from '../components/letter';
import Oblong from '../components/oblong';

import mew from '../assets/radial/mew.png';
import grate1 from '../assets/grate/1.png';
import ovaling from '../assets/soundfiles/ovaling-short.mp3';
import bubble from '../assets/bubble.png';
import svvities from '../assets/soundfiles/svvities.mp3';

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

export default Rollingunrolling;
