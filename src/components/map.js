import React from 'react';
import Blob from './blob';
const twoD = [];
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
  constructor(props){
    super(props);
    this.state = {
      children: blobs
    }
    this.handleScroll = this.handleScroll.bind(this);
    this.mapRef = React.createRef();
  }

  handleScroll(event) {
    let scrollLeft = this.mapRef.current.scrollLeft;
    let scrollTop = this.mapRef.current.scrollTop;
    console.log([scrollLeft, scrollTop]);
  };

  render(props) {
  return (
      <div className="weltanschauung" ref={this.mapRef} onScroll={this.handleScroll}>
      <p>scroll around!</p>

        {this.state.children.map((element, index) => (
          <Blob
          key={'blob'+index}
          id={'blob'+index}
          x={element.x}
          y={element.y}
          diameter={blobSize*1.25}
          rotation={90*Math.random()}
          radii={[60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15]}
          color={colorlist[Math.floor(Math.random()*colorlist.length)]}
          imgPath={process.env.PUBLIC_URL + '/assets/cull/cull'+Math.floor(Math.random()*6)+'.png'}
          audioPath={process.env.PUBLIC_URL + '/assets/a-long-walk-to-somewhere-close-errlymixx.mp3'}
          />
        ))}
      </div>
    );
}
}

export default Map;
