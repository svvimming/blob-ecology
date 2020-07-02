const colorlist = ["red", "cherry", "purple", "green", "mauve", "orangeRed"];
const canvasLinks = ['/assets/algae.jpg', '/assets/scrapchi.png', '/assets/grim.jpeg', '/assets/icecast.jpeg', '/assets/manytimes.png', '/assets/resonance.jpeg', '/assets/pedaling.jpeg'];
const blobs = [];

blobs[0] = {
  x: 0.15*window.innerWidth,
  y: 0.25*window.innerHeight,
  diameter: 200,
  rotation: 90*Math.random(),
  radii: [60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15, 60*Math.random()+15],
  color: colorlist[Math.floor(Math.random()*colorlist.length)],
  clip: 'polygon(26% 14%, 44% 13%, 60% 19%, 78% 28%, 88% 43%, 90% 58%, 88% 72%, 85% 83%, 74% 89%, 59% 91%, 36% 86%, 21% 72%, 14% 55%, 13% 36%, 15% 21%)'
}

export {blobs}
