const twoD = [];
const randInds = [];
const colorlist = ["red", "cherry", "purple", "green", "mauve", "orangeRed"];
const canvasLinks = ['/assets/algae.jpg', '/assets/scrapchi.png', '/assets/grim.jpeg', '/assets/icecast.jpeg', '/assets/manytimes.png', '/assets/resonance.jpeg', '/assets/pedaling.jpeg'];
const blobSize = 160;
const blobAmt = 6;

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
      animate: false,
    }
  }
}

const blobs = [].concat(...twoD);

for (let i=0; i<canvasLinks.length; i++){
  randInds[i] = Math.floor(Math.random()*blobs.length);
}
console.log(randInds);
for (let i=0; i<randInds.length; i++){
  blobs[randInds[i]].image = canvasLinks[i];
  blobs[randInds[i]].animate = true;
}

var plobs =  blobs.filter(function(element) {
  return element.animate;
});

var globs = blobs.filter(function(element) {
  return !element.animate;
});

export {blobs}
