import React from 'react';
import Blob from './blob';
import Tone from 'tone';
const twoD = [];
const blobSize = 160;
const blobAmt = 6;
const colorlist = ["red", "cherry", "purple", "green", "mauve", "orangeRed"];
const canvasLinks = ['/assets/algae.jpg', '/assets/scrapchi.png', '/assets/grim.jpeg', '/assets/icecast.jpeg', '/assets/manytimes.png', '/assets/resonance.jpeg', '/assets/pedaling.jpeg'];
const randInds = [];
const smoothing = 0.3;
const windowSize = 16; //don't change unless binWidth in animate-cull.js is changed also!

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
  // blobs[randInds[i]].canvas = true;
  // blobs[randInds[i]].url = canvasLinks[i];
  blobs[randInds[i]].image = canvasLinks[i];
}
console.log(randInds);

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      children: blobs,
      isZoomedOut: false,
      zoom: 10.0,
      hola: "survol",
      scrollCoords: {left: 0, top: 0},
      follower: new Tone.Follower(smoothing),
      meter: new Tone.Meter(),
      gain: new Tone.Gain(4.0),
      fft: new Tone.FFT(windowSize)
    }
    this.mapRef = React.createRef();
    this.handleZoom = this.handleZoom.bind(this);
    this.handleButton = this.handleButton.bind(this);
    this.dummyClick = this.dummyClick.bind(this);
  }

  componentDidMount(){
    this.state.follower.connect(this.state.meter);
    this.state.gain.connect(this.state.fft);
    this.state.gain.connect(this.state.follower);
  }

  componentDidUpdate() {
    console.log([this.state.scrollCoords.left, this.state.scrollCoords.top]);
    if(!this.state.isZoomedOut){
      this.mapRef.current.scrollLeft = (this.state.scrollCoords.left)*10.0;
      this.mapRef.current.scrollTop = (this.state.scrollCoords.top)*10.0;
    }
  }

  handleZoom(x, y){
    if(this.state.isZoomedOut){
      this.setState({
        isZoomedOut: false,
        zoom: 10.0,
        hola: "survol",
        scrollCoords: {left: x, top: y}
      });
    } else {
      this.setState({
        isZoomedOut: true,
        zoom: 1.0,
        hola: " "
      });
    }
  }

  dummyClick(x, y){
    console.log([x, y]);
  }

  handleButton(){
    if(!this.state.isZoomedOut){
      this.handleZoom(0, 0);
    }
  }

  render(props) {
    if (this.state.isZoomedOut){
      var clickBehaviour = this.handleZoom;
    } else {
      var clickBehaviour = this.dummyClick;
    }
  return (
      <div className="weltanschauung" ref={this.mapRef}>
        <div className="clip-border-left"></div>
        <div className="clip-border-right"></div>
        <div className="clip-border-top"></div>
        <div className="clip-border-bottom"></div>
        <div className="zoom-select">
          <a href="index.html" className="fuites">fuites</a>
        </div>
        <div className="zoom-select">
          <button onClick={this.handleButton}>{this.state.hola}</button>
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
          onBlobSelect={clickBehaviour}
          zoomedOut={this.state.isZoomedOut}
          renderDefault={false}
          gain={this.state.gain}
          fft={this.state.fft}
          meter={this.state.meter}
          />
        ))}
      </div>
    );
}
}

export default Map;
