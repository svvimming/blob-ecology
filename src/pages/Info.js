import React from 'react';
import { Link } from "react-router-dom";
import Cull from '../components/cull';
import Letter from '../components/letter';

import mew from '../assets/radial/mew-copy.png';

function Info(props) {
  const name = 'fuit.es'
  const first_paragraph_1 = ' is an online interactive sound installation seeking creative alternatives to new streaming industry standards. This ongoing and collective experimentation situates process as the streamable content proper; music, sound, written and visual works are in an ever shifting process of composition, proliferating variations on themselves with each next iteration. In this sense '
  const first_paragraph_2 = ' acts as a digital ‘anarchive’; a technique for making process a process making machine.'
  const second_paragraph = ' is also a collective; an assemblage of artists from various disciplines brought together by an affinity for how seemingly disparate practices can shape and inflect one another. Recent experimentation has brought the project into a physical iteration as artist in residence with Art Souterrain. In the Art Souterrain context, it is taking on a new dimension as it integrates the physical world with a sound sculpture made by Niko Pageau-Timar.'
  const reflection = 'an absorbing reflection'
  const absorption = ', reflecting absorption of the spills'
  return (
    <div className="weltanschauung info">



    {/* shader number is 0=culling, 1=squiggly */}
      <Cull
      x={0}
      y={-400}
      width={1300}
      height={1600}
      meter={props.meter}
      fft={props.fft}
      canvasImg={mew}
      movement={0.3}
      shaderNo={0}
      classList={"ninety"}
      />

      <Letter
      x={100}
      y={100}
      trans={'rotate3d(0, 1, 0, 45deg)'}
      orient={5}
      fontsize={16}
      rand={24}
      characters={reflection.split('')}
      />

      <div class="info-text-wrapper">
        <div class="info-text">
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <h5><i>Info</i></h5>
          <span class="absorption">{reflection}</span><span class="absorption">{absorption}</span>
          <br></br>
          <br></br>
          <br></br>
          <Link to="/alongwalk" className="info-link">{name}</Link>{first_paragraph_1}<Link to="/alongwalk" className="info-link">{name}</Link>{first_paragraph_2}
          <br></br>
          <br></br>
          <Link to="/alongwalk" className="info-link">{name}</Link>{second_paragraph}
          <br></br>
          <br></br>
          <br></br>
          <a href="mailto:contact@fuit.es" class="info-link" style={{fontSize: '13px'}}>contact us</a>
          <br></br>
          <br></br>
          <br></br>
          <span class="copyright">© 2021 fuit.es. All rights reserved.</span>
        </div>
      </div>

    </div>
  );
}

export default Info;
