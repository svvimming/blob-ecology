import React from 'react';
import { Link } from "react-router-dom";
import Archipelago from '../components/archipelago';
import Oblong from '../components/oblong';

import grate1 from '../assets/grate/1.png';
import grate2 from '../assets/grate/2.png';
import grate3 from '../assets/grate/3.png';
import grate4 from '../assets/grate/4.png';

import aside from '../assets/grate/aside.mp3';
import clunks from '../assets/grate/clunks.mp3';


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

export default Aside;
