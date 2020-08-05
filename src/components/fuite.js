import React from 'react';

class Fuite extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      link: this.props.link
    }
  }

  render(){
    const styling = {left: this.props.x+'px', top: this.props.y+'px', width: this.props.w+'px', height: this.props.h+'px'};

    const element = (this.props.text!=null) ?
        <p
        onClick={this.props.route}
        className={"click-me"}
        >
          {this.props.text}
        </p>
      :
        <img
        onClick={this.props.route}
        className={"click-me swell"}
        style={{width: this.props.w+'px', height: this.props.h+'px'}}
        src={this.props.imgPath}
        alt="okieee">
        </img>;

      return(
        <div className={"abso "+this.props.classList} style={styling}>
          {element}
        </div>
      )

  }
}

export default Fuite;
