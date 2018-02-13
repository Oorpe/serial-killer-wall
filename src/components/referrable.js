import React, { Component } from 'react';

export class Referrable extends Component {
  constructor(props){
    super(props);
    this.refer = props.refer; //parent passes in function that we call with the DOM element once instantiated
  }
  componentDidMount(){
    this.refer(this.r);
  }
  render(){
    return <div className="Bubble" ref={r=>{this.r = r;}}></div>
  }
}
