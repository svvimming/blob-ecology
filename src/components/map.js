import React from 'react';
import Territory from './territory';
import {blobData} from './blobdata'

class Map extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      children: blobData,
      zoom: 1.0
    }
    this.setScrollCoords = this.setScrollCoords.bind(this);
  }

  setScrollCoords(x, y){
    var territoryLocationRatio = [x/window.innerWidth, y/window.innerHeight];
    console.log(territoryLocationRatio);
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
          onTerritorySelect={this.setScrollCoords}
          />
        ))}
      </span>
    );
}
}

export default Map;
