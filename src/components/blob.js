import React from 'react';
import Territory from './territory';
import Fuites from './fuites';

class Blob extends React.Component {
  constructor(props){
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      isHovering: false,
    };
  }

  handleMouseHover() {
    this.setState(this.toggleHoverState);
  }

  toggleHoverState(state) {
    return {
      isHovering: !state.isHovering,
    };
  }

  render(props) {
    const orientation = {
      width: this.props.diameter+'px',
      height: this.props.diameter+'px',
      transform: 'translate('+this.props.x+'px, '+this.props.y+'px) rotate('+90*Math.random()+'deg)',
      borderRadius: ' '+60*Math.random()+15+'% '+60*Math.random()+15+'% '+60*Math.random()+15+'% '+60*Math.random()+15+'% / '+60*Math.random()+15+'% '+60*Math.random()+15+'% '+60*Math.random()+15+'% '+60*Math.random()+15+'%'
    }
    return(
      <div
      className={"blob "+this.props.color}
      style={orientation}
      onMouseEnter={this.handleMouseHover}
      onMouseLeave={this.handleMouseHover}
      >
      {
        this.state.isHovering &&
        <div>
          <Territory
          className="p5canvas"
          diameter={this.props.diameter}
          imgIndex={this.props.imgIndex}/>
          <Fuites
          diameter={this.props.diameter}/>
        </div>
        }
      </div>

    );
  }
}

export default Blob;

// onMouseOver={() => this.setState({ text: 'hola'})}
// onMouseOut={() =>this.setState({text: ''})}


// <Territory
// className="p5canvas"
// diameter={this.props.diameter}/>
