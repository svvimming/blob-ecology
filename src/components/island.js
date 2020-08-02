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
      imgPos: {x: -1*866*Math.random(), y: -1*1000*Math.random()},
      classlist: "island appear"
    };
    this.mouseCoords = {x: 0, y:0};
    this.mouseVec = {x:0, y: 0};
  }

  componentDidMount(){
    document.addEventListener('mousemove', this.handleMouseMove, false);
  }

  handleMouseMove = (e) => {
    this.mouseVec = {x: e.pageX - this.mouseCoords.x, y: e.pageY - this.mouseCoords.y};
    this.mouseCoords = {x: e.pageX, y: e.pageY};
  }

  handleMouseHover(){
    this.setState({classlist: "island disappear"});
    setTimeout((offX, offY) => {
      this.setState({
        x: this.state.x + 6*offX,
        y: this.state.y + 6*offY,
        classlist: "island appear"
      });
    }, 400, this.mouseVec.x, this.mouseVec.y);
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
