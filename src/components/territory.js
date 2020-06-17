import React from 'react';

class Territory extends React.Component {
  constructor(props){
    super(props);
    this.handleMouseHover = this.handleMouseHover.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      wasRendered: false
    };
  }

  handleMouseHover() {
    if(!this.state.wasRendered){
      this.setState({
        wasRendered: true
      });
    }
  }

  handleClick() {
    this.props.onTerritorySelect(this.props.x, this.props.y);
  }

  render(props) {
    const orientation = {
      width: this.props.diameter+'px',
      height: this.props.diameter+'px',
      transform: 'translate('+this.props.x+'px, '+this.props.y+'px) rotate('+this.props.rotation+'deg)',
      borderRadius: ' '+this.props.radii[0]+'% '+this.props.radii[1]+'% '+this.props.radii[2]+'% '+this.props.radii[3]+'% / '+this.props.radii[4]+'% '+this.props.radii[5]+'% '+this.props.radii[6]+'% '+this.props.radii[7]+'%'
    }
    const imageStyle = {
      width: this.props.diameter+50+'px',
      height: this.props.diameter+50+'px'
    }

    return(
      <div
        className={"blob "+this.props.color}
        style={orientation}
        onMouseEnter={this.handleMouseHover}
        onClick={this.handleClick}
        >
        { this.state.wasRendered &&
          <img className="blogImg" src={this.props.imgPath} alt="cull" style={imageStyle}/>
        }
      </div>
    );
  }
}

export default Territory;
