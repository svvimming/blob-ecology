import React from 'react';

class Fuite extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      link: this.props.link,
      text: this.props.text
    }
  }

  render(){
    const styling = {left: this.props.x+'px', top: this.props.y+'px', width: this.props.width+'px', height: this.props.height+'px', transform: this.props.trans};

      return(
        <div className={"abso "+this.props.classList} style={styling}>
          <p className={"click-me"}>{this.state.text}</p>
        </div>
      )

  }
}

export default Fuite;
