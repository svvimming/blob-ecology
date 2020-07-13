import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";

import cullImg from '../assets/cull1.png';

class Ellipsoid extends React.Component {
  componentDidMount() {
    // === THREE.JS CODE START ===
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, this.props.width/this.props.height, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(this.props.width, this.props.height);
    renderer.setClearColor( 0xffffff, 0);
    this.mount.appendChild( renderer.domElement );
    var geometry = new THREE.SphereBufferGeometry(2.05, 20, 20);
    var skin = new THREE.TextureLoader();
    var material = new THREE.MeshBasicMaterial({ map: skin.load(cullImg), transparent: true });
    var ellip = new THREE.Mesh( geometry, material );
    ellip.scale.y = 1.8;
    scene.add( ellip );
    camera.position.z = 5;
    var animate = function () {
      requestAnimationFrame( animate );
      ellip.rotation.y += 0.001;
      renderer.render( scene, camera );
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
  }
  render() {
    return (
      <div className={"oval"} ref={ref => (this.mount = ref)}/>
    )
  }
}

export default Ellipsoid;
