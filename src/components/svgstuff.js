import React, { Component } from 'react';
// import { Note } from './note.js';
import { Bubble } from './bubbles.js';
export class SVGSheet extends Component{
  constructor(props){
    super(props)
    // console.log(this.svgDomRef)
    this.onMoveEvent = props.onMoveEvent;
    this.path = null; //current workable path object
    this.currentLine = {start: {x:0, y:0}, end:{x:0,y:0}};
    this.lineBuffer = [];
    this.noteId = 1;
    this.note = null; //currently processed note
    this.testNote = {title:"first", text:"sometext", x: 100, y:100, id:this.noteId++};
    // this.notes = [this.testNote];
    this.state= {notes :[this.testNote]};
  }

  // getInitialState(){
  //   return {notes:[this.testNote]}
  // }
  componentDidMount() {
    // console.log(this.svgDomRef)
    this.svgDomRef.setAttribute("width", window.innerWidth)
    this.svgDomRef.setAttribute("height",window.innerHeight)
  }

  getMousePosition = function (e) {
    // console.log(e)
      return {
          x: e.pageX - this.rect.left,
          y: e.pageY - this.rect.top
          // x:e.clientX,
          // y:e.clientY
      }
  };

  mousemove = (e)=>{
    // console.log(e)
    if(this.path){
      var pos = this.getMousePosition(e);
      this.currentLine.end = pos;
      var posA = "M" + this.currentLine.start.x + " " + this.currentLine.start.y;
      var posB = "L" + this.currentLine.end.x + " " + this.currentLine.end.y;
      this.path.setAttribute("d", posA + posB);
      this.note.x = pos.x;
      this.note.y = pos.y;
    }
    //send event to parent for processing
    // this.onMoveEvent(e);

  }

  mouseup=(e)=>{
    console.log("mouseup")
    this.svgDomRef.removeEventListener("mousemove", this.mousemove);
    this.svgDomRef.removeEventListener("mouseup",this.mouseup);
    this.path = null;
  }

  onMouseDown=(e)=>{
    console.log(e)
    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.path.setAttribute("fill", "none");
    this.path.setAttribute("stroke", "#000");
    this.path.setAttribute("stroke-width", 2);
    this.rect = this.svgDomRef.getBoundingClientRect();
    this.svgDomRef.appendChild(this.path);
    var pos = this.getMousePosition(e);
    this.currentLine.start = pos;
    this.lineBuffer.push(this.path)
    this.note = {title:"note!", text:"note-text", x:pos.x, y:pos.y, id:this.noteId++}
    // this.notes= this.notes.concat([this.note]);
    this.setState({notes: this.state.notes.concat([
            this.note
        ])})
    // this.setState({notes:this.state.notes.concat([this.note])})
    // console.log(this.notes)

    this.svgDomRef.addEventListener("mousemove", this.mousemove);

    this.svgDomRef.addEventListener("mouseup",this.mouseup);
  }

  render(){
    return <div style={{width:"100vw", height:"100vh"}}><svg className="svg-sheet"
    ref={r=>{this.svgDomRef = r;}}
    onMouseDown={this.onMouseDown}
    ></svg>
    {
      this.state.notes.map(n=>{
        return <Bubble key={n.id} title={n.title} text={n.text} x={n.x} y={n.y}></Bubble>
      })
    }
    </div>
  }
}
