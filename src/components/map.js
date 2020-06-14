import React from 'react';
import Blob from './blob';
const twoD = [];
const blobSize = 200;
const blobAmt = 6;
const colorlist = ["red", "cherry", "purple", "green", "mauve", "orangeRed"];
const canvasLinks = ['/assets/algae.jpg', '/assets/scrapchi.png', '/assets/grim.jpeg', '/assets/icecast.jpeg', '/assets/manytimes.png', '/assets/resonance.jpeg', '/assets/pedaling.jpeg'];
const randInds = [];

for(let i=0; i<blobAmt; i++){
  twoD[i] = [];
  for(let j=0; j<blobAmt; j++){
    twoD[i][j] = {
      x: Math.floor(Math.random()*12)*blobSize -100,
      y: Math.floor(Math.random()*12)*blobSize -100,
      diameter: blobSize*1.25,
      rotation: 90*Math.random(),
      radii: [60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15],
      color: colorlist[Math.floor(Math.random()*colorlist.length)],
      image: '/assets/cull/cull'+Math.floor(Math.random()*6)+'.png',
      canvas: false,
      url: null
    }
  }
}

const blobs = [].concat(...twoD);

for (let i=0; i<canvasLinks.length; i++){
  randInds[i] = Math.floor(Math.random()*blobs.length);
  blobs[randInds[i]].canvas = true;
  blobs[randInds[i]].url = canvasLinks[i];
}
console.log(randInds);

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      children: blobs,
      zoom: 10.0
    }
  }

  render(props) {

  return (
      <div className="weltanschauung">
        <div className="clip-border-left"></div>
        <div className="clip-border-right"></div>
        <div className="clip-border-top"></div>
        <div className="clip-border-bottom"></div>
        {this.state.children.map((element, index) => (
          <Blob
          key={'blob'+index}
          id={'blob'+index}
          x={element.x*this.state.zoom}
          y={element.y*this.state.zoom}
          diameter={element.diameter*this.state.zoom}
          rotation={element.rotation}
          radii={element.radii}
          color={element.color}
          imgPath={process.env.PUBLIC_URL + element.image}
          audioPath={process.env.PUBLIC_URL + '/assets/a-long-walk-to-somewhere-close-errlymixx.mp3'}
          />
        ))}
      </div>
    );
}
}

export default Map;
