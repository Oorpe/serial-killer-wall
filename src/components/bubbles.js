import React, { Component } from 'react';

export class Bubbles extends Component{
  constructor(props){
    super(props)
    this.state = props
    console.log(this.state)
  }
  render(){
    return (<div className="note-area">
    { this.state.bubbles ?
      (this.state.bubbles.map((bubble, index)=>{
      return <Bubble key={index}
      title={bubble.title}
      text={bubble.text}
      x={bubble.x || 0}
      y={bubble.y || 0}
      ></Bubble>
    })): ""

  }
    </div>)
  }
}

export class Bubble extends Component{
  constructor(props){
    super(props)
    this.state = props;
  }
  render(){
    return <div className="Bubble" style={{top:this.state.y, left:this.state.x}}>
      <p>{this.state.title}</p>
      <p>{this.state.text}</p>
    </div>
  }
}
