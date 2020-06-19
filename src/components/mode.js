import React from 'react';
import Map from './map';

class Mode extends React.Component {

  render(props){

    return (
      <div className="weltanschauung" ref={this.modeRef}>
        <div className="clip-border-left"></div>
        <div className="clip-border-right"></div>
        <div className="clip-border-top"></div>
        <div className="clip-border-bottom"></div>
        <div className="zoom-select">
          <a href="index.html" className="fuites"></a>
        </div>
          <Map onTerritorySelect={this.modeChange}/>
      </div>
    );
  }
}

export default Mode;
