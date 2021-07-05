import React from 'react';
import { Link } from "react-router-dom";

const slices = [];
const inc = 6.5;

function Slippery(props){
  for (let i = 0; i < 200; i++) {
    slices.push(i)
  }
  return(
    <div>
      <Link to="/aside" style={{position: 'absolute', width: '100px', top: '250px', left: '1000px'}}>aside</Link>

      <div className="slippery-wrapper">
        {slices.map(slice => (
          <div
            className="scoreboard"
            key={'slice-' + slice}
            style={{
              width: Math.floor(window.innerWidth/slices.length) + 'px',
              backgroundPosition: -1 * slice * inc + 'px 0'
            }}>
          </div>
        ))}
      </div>
    </div>
    );
}

export default Slippery;
