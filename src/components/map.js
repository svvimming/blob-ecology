import React from 'react';
import Blob from './blob';
const twoD = [];
const blobSize = 160;
const blobAmt = 6;
const colorlist = ["red", "cherry", "purple", "green", "mauve", "orangeRed"];
const canvasLinks = ['/assets/algae.jpg', '/assets/scrapchi.png', '/assets/grim.jpeg', '/assets/icecast.jpeg', '/assets/manytimes.png', '/assets/resonance.jpeg', '/assets/pedaling.jpeg'];
const randInds = [];

for(let i=0; i<blobAmt; i++){
  twoD[i] = [];
  for(let j=0; j<blobAmt; j++){
    twoD[i][j] = {
      x: i*window.innerWidth/6,
      y: j*window.innerHeight/6,
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
      isZoomed: false,
      isDraggable: false,
      zoom: 10.0,
      hola: "survol",
      scrollCoords: {left: 0, top: 0}
    }
    this.mapRef = React.createRef();
    this.handleZoom = this.handleZoom.bind(this);
    this.handleChildPositionChange = this.handleChildPositionChange.bind(this);
  }

  componentDidUpdate() {
    if(!this.state.isZoomed){
      this.mapRef.current.scrollLeft = this.state.scrollCoords.left;
      this.mapRef.current.scrollTop = this.state.scrollCoords.top;
    }
    console.log([this.mapRef.current.scrollLeft, this.mapRef.current.scrollTop]);
  }

  handleZoom(){
    if(this.state.isZoomed){
      console.log([this.state.scrollCoords.left, this.state.scrollCoords.top]);
      this.setState({
        isZoomed: false,
        isDraggable: false,
        zoom: 10.0,
        hola: "survol"
      });
    } else {
      this.setState({
        isZoomed: true,
        isDraggable: true,
        zoom: 1.0,
        hola: "explore",
        scrollCoords: {left: this.mapRef.current.scrollLeft, top: this.mapRef.current.scrollTop}
      });
    }
  }

  handleChildPositionChange(x, y){

  }

  render(props) {
  return (
      <div className="weltanschauung" ref={this.mapRef}>
        <div className="clip-border-left"></div>
        <div className="clip-border-right"></div>
        <div className="clip-border-top"></div>
        <div className="clip-border-bottom"></div>
        <div className="zoom-select">
          <button onClick={() => this.handleZoom()}>{this.state.hola}</button>
        </div>
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
          isDraggable={this.state.isDraggable}
          onPositionChange={this.handleChildPositionChange}
          />
        ))}
      </div>
    );
}
}

export default Map;
