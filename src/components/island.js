import React from 'react';

class Island extends React.Component{
  constructor(props){
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.state = {
      x: this.props.x + Math.random()*this.props.density,
      y: this.props.y + Math.random()*this.props.density,
      w: 10+Math.random()*this.props.width,
      h: 10+Math.random()*this.props.height,
      imgPos: {x: -1*this.props.imgW*Math.random(), y: -1*this.props.imgH*Math.random()},
      classlist: "appear "+this.props.classList
    };
  }

  handleMouseHover(){
    this.setState({classlist: "disappear "+this.props.classList});
    setTimeout((offX, offY) => {
      this.setState({
        x: this.state.x + 6*offX,
        y: this.state.y + 6*offY,
        classlist: "appear "+this.props.classList
      });
    }, 400, this.props.mouseData().x, this.props.mouseData().y);
  }

    render(props){
      return(
        <div
        className={this.state.classlist}
        style={{
          left: this.state.x+'px',
          top: this.state.y+'px',
          width: this.state.w+'px',
          height: this.state.h+'px',
          backgroundPosition: this.state.imgPos.x+'px '+this.state.imgPos.y+'px'
        }}
        onMouseEnter={() => {this.props.onHoverSelect(); this.handleMouseHover();}}
        >
        </div>
      );
    }
}

export default Island;
