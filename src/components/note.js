import React, { Component } from 'react';
import { Bubbles } from './bubbles.js';
export class Note extends Component{
  constructor(props){
    super(props)
  //   this.comments = [
  //     {title:"kissa", text:"on kiva kaveri", x:150, y:150}
  //     ,{title:"koira", text:"on kiva kaveri", x:100, y:100}
  // ]
  this.comments = props.notes;
  }
  render(){
    return <Bubbles className="note-area" bubbles={this.comments}></Bubbles>
  }
}
