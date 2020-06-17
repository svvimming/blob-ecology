import React from 'react';
import Map from './map';
import Fuites from './fuites';

class Mode extends React.Component {
  constructor(props){
    super(props);
    this.modeRef = React.createRef();
    this.modeChange = this.modeChange.bind(this);
    this.state = {
      zoomedOut: false,
      scrollRatio: {
        left: 0,
        top: 0
      }
    };
  }

  componentDidUpdate(){
    this.modeRef.current.scrollLeft = this.state.scrollRatio.left*10.0;
    this.modeRef.current.scrollTop = this.state.scrollRatio.top*10.0;
  }

  modeChange(x, y){
    this.setState({
      zoomedOut: !this.state.zoomedOut,
      scrollRatio: {
        left: x,
        top: y
      }
    });
  }

  render(props){
    if (this.state.zoomedOut){
      var currentMode = (<Map onTerritorySelect={this.modeChange}/>);
    } else {
      var currentMode = (<Fuites modeSelect={this.modeChange}/>);
    }
    return (
      <div className="weltanschauung" ref={this.modeRef}>
        <div className="clip-border-left"></div>
        <div className="clip-border-right"></div>
        <div className="clip-border-top"></div>
        <div className="clip-border-bottom"></div>
        <div className="zoom-select">
          <a href="index.html" className="fuites">fuites</a>
        </div>
          {currentMode}
      </div>
    );
  }
}

export default Mode;
