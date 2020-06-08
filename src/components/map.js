import React from 'react';
import Blob from './blob';
const twoD = [];
const container = 1000;
const blobSize = 2000;
const blobAmt = 6;
const colorlist = ["red", "cherry", "purple", "green", "mauve", "orangeRed"];

for(let i=0; i<blobAmt; i++){
  twoD[i] = [];
  for(let j=0; j<blobAmt; j++){
    twoD[i][j] = {
      x: i*blobSize -100,
      y: j*blobSize -100
    }
  }
}

const blobs = [].concat(...twoD);

class Map extends React.Component {
  render(props) {
    const dim = {
      width: container+'px',
      height: container+'px'
    }
  return (
      <div className="weltanschauung" style={dim}>
      <p>scroll around!</p>
      {blobs.map((blob, index) => (
          <Blob
          key={'blob'+index}
          id={'blob'+index}
          x={blob.x}
          y={blob.y}
          diameter={blobSize*1.25}
          color={colorlist[Math.floor(Math.random()*colorlist.length)]}
          imgPath={process.env.PUBLIC_URL + '/assets/cull/cull'+Math.floor(Math.random()*6)+'.png'}
          audioPath={process.env.PUBLIC_URL + '/assets/a-long-walk-to-somewhere-close-errlymixx.mp3'}
          />
        )) }
      </div>
    );
}
}

export default Map;
