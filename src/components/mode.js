import React from 'react';
import Map from './map';

class Mode extends React.Component {

  render(props){

    return (
      <div className="weltanschauung" ref={this.modeRef}>
          <Map/>
      </div>
    );
  }
}

export default Mode;
