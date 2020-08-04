import React from 'react';
import Draggable from 'react-draggable';

const fonts = ['anton', 'arvo', 'courier', 'merriweather', 'nanum', 'source-code'];

class Letter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      letters: this.props.characters
    }
  }

      render() {
        const styling = {left: this.props.x+'px', top: this.props.y+'px', transform: this.props.trans};
          return (
            <div className={"abso"} style={styling}>
              {this.state.letters.map((element, index) => (
              <Draggable handle=".handle" key={"drag"+index}>
              <div className={"handle"} key={"handle"+index}>
                <p
                key={"letter"+index}
                className={"testcnv noselect "+fonts[Math.floor(Math.random()*fonts.length)]+" "+this.props.classList}
                style={{
                  left: (50*index+Math.random()*40)+'px',
                  top: (30*Math.sin(0.25*index)+ Math.random()*10)+'px',
                  fontSize: (this.props.fontsize+(Math.floor(this.props.rand*Math.random())))+'px',
                  transform: 'rotate3d('+Math.random()+', '+Math.random()+', '+Math.random()+', '+this.props.orient+'deg)'
                }}
                >{element}
                </p>
                </div>
                </Draggable>
              ))}
            </div>
          );
      }

}

export default Letter;
