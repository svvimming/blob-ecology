import React from 'react';
import Territory from './territory';
import {blobData} from './blobdata';
import arp from '../assets/arp.mp3';
import chandelier from '../assets/chandelier.mp3';
import collectors from '../assets/collectors.mp3';
import comeon from '../assets/comeon.mp3';
import ehorn from '../assets/ehorn.mp3';
import falling from '../assets/falling.mp3';
import flick from '../assets/flick.mp3';
import glassy from '../assets/glassy.mp3';
import mmmwow from '../assets/mmmwow.mp3';
import oiltin from '../assets/oiltin.mp3';
import pluck from '../assets/pluck.mp3';
import squeaky from '../assets/squeaky.mp3';
import svvimming1 from '../assets/svvimming1.mp3';
import svvimming2 from '../assets/svvimming2.mp3';
import svvimming3 from '../assets/svvimming3.mp3';
import svvimming4 from '../assets/svvimming4.mp3';
import svvimming5 from '../assets/svvimming5.mp3';
import tongue from '../assets/tongue.mp3';
import whoops from '../assets/whoops.mp3';
import yes from '../assets/yes.mp3';

const audioLinks = [arp, chandelier, collectors, comeon, ehorn, falling, flick, glassy, mmmwow, oiltin, pluck, squeaky, svvimming1, svvimming2, svvimming3, svvimming4, svvimming5, tongue, whoops, yes];

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      children: blobData,
      zoom: 1.0
    }
  }

  render(props) {
    return (
      <span>
          {this.state.children.map((element, index) => (
            <Territory
            key={'blob'+index}
            x={element.x*this.state.zoom}
            y={element.y*this.state.zoom}
            diameter={element.diameter*this.state.zoom}
            rotation={element.rotation}
            radii={element.radii}
            color={element.color}
            imgPath={process.env.PUBLIC_URL + element.image}
            audioPath={audioLinks[Math.floor(Math.random()*audioLinks.length)]}
            onTerritorySelect={this.props.onTerritorySelect}
            />
          ))}
        </span>
      );
}
}

export default Map;
