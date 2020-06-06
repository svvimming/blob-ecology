import React from 'react';
import Tone from 'tone';
import errlymixx from "../assets/a-long-walk-to-somewhere-close-errlymixx.mp3";

class Fuites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      player: null
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
        // Create instrument
        this.setState({
        player: new Tone.Player(errlymixx, this.handleClick)
      });
    }

  handleClick() {
      this.state.player.toMaster();
      this.state.player.start();
  }

  render(props) {
    const dimensions = {
      width: this.props.diameter+'px',
      height: this.props.diameter+'px'
    }
      return(
        <div
        className="player"
        style={dimensions}>
        </div>
      );
  }
}

export default Fuites;
