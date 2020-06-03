import React from 'react';

class Blob extends React.Component {
  constructor(props){
    super(props);
    this.state = {text: ''};
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
      onMouseOver={() => this.setState({ text: 'hola'})}
      onMouseOut={() =>this.setState({text: ''})}>
      <p>{this.state.text}</p>
      </div>

    );
  }
}

export default Blob;

// Math.random()*100+
