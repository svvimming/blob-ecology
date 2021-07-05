import React from 'react';
import { Link } from "react-router-dom";
import Archipelago from '../components/archipelago';
import Oblong from '../components/oblong';
import Cull from '../components/cull';
import Letter from '../components/letter';

import irridescent from '../assets/radial/irridescent.png';
import squidge from '../assets/nban-squidge.png';
import dots from '../assets/radial/dots3.png';

import chandelier from '../assets/soundfiles/chandelier.mp3';
import glassy from '../assets/soundfiles/glassy.mp3';
import slopoke from '../assets/soundfiles/slopoke.mp3';
import psychic from '../assets/soundfiles/rightandleft.mp3';

import octo from '../assets/octo.png';
import orbitals from '../assets/orbitals.gif';

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

export default ALongWalk;
