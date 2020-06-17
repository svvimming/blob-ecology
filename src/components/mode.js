import React from 'react';
import Map from './map';
import Fuites from './fuites';

class Mode extends React.Component {
  constructor(props){
    super(props);
    this.modeRef = React.createRef();
  }
  render(props){
    return (
      <div className="weltanschauung" ref={this.modeRef}>
        <div className="clip-border-left"></div>
        <div className="clip-border-right"></div>
        <div className="clip-border-top"></div>
        <div className="clip-border-bottom"></div>
        <div className="zoom-select">
          <a href="index.html" className="fuites">fuites</a>
        </div>
          <Fuites/>
      </div>
    );
  }
}

export default Mode;
