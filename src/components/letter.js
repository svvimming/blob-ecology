import React from 'react';
import Draggable from 'react-draggable';

const fonts = ['anton', 'arvo', 'courier', 'merriweather', 'nanum', 'source-code'];

class Letter extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      letters: ['how', 'not', 't', 'o', 'f', 'a', 'l', 'l', 'p', 'r', 'e', 'y', 'to', 't', 'h', 'e', 'a', 'r', 'c', 'h', 'i', 'v', 'e', '?']
    }
  }

      render() {

          return (
            <div className={"testarch"}>
              {this.state.letters.map((element, index) => (
              <Draggable handle=".handle" key={"drag"+index}>
              <div className={"handle"} key={"handle"+index}>
                <p
                key={"letter"+index}
                className={"testcnv "+fonts[Math.floor(Math.random()*fonts.length)]}
                style={{
                  left: (50*index+Math.random()*40)+'px',
                  top: (30*Math.sin(0.25*index)+ Math.random()*10)+'px',
                  fontSize: (25+(Math.floor(35*Math.random())))+'px',
                  transform: 'rotate3d('+Math.random()+', '+Math.random()+', '+Math.random()+', 10deg)'
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
