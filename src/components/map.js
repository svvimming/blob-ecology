import React from 'react';
import Blob from './blob';
const twoD = [];
const container = 1000;
const blobSize = 200;

for(let i=0; i<Math.ceil(container/blobSize)+1; i++){
  twoD[i] = [];
  for(let j=0; j<Math.ceil(container/blobSize)+1; j++){
    twoD[i][j] = {
      x: i*blobSize -100,
      y: j*blobSize -100
    }
  }
}

const blobs = [].concat(...twoD);
console.log(blobs);

class Map extends React.Component {
  render(props) {
    const dim = {
      width: container+'px',
      height: container+'px'
    }
  return (
      <div className="weltanschauung" style={dim}>
      {blobs.map((blob, index) => (
          <Blob
          key={'blob'+index}
          x={blob.x}
          y={blob.y}
          />
        )) }
      </div>
    );
}
}

export default Map;
