import React, { Component } from 'react';
// import { Note } from './note.js';
import { Referrable } from './referrable.js'
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
    // this.testNote = {title:"first", text:"sometext", x: 100, y:100, id:this.noteId++};
    this.notes = [];
    this.state = {notes:[]};
    // this.state= {notes :[this.testNote]};
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
      // var posA = "M" + this.currentLine.start.x + " " + this.currentLine.start.y;
      // var posB = "L" + this.currentLine.end.x + " " + this.currentLine.end.y;
      // this.path.setAttribute("d", posA + posB);
      this.note.style.left = pos.x + "px";
      this.note.style.top = pos.y + "px";
      console.log("note:",this.note);
      this.setState({notes: this.state.notes.concat([
              this.note
          ])})

      this.note.addEventListener("mouseup", this.noteMouseUp)
      // this.movelatestNoteTo(pos);
    }
    //send event to parent for processing
    // this.onMoveEvent(e);

  }

  noteMouseUp=(e)=>{
    this.mouseup(e);
    this.note.removeEventListener("mouseup", this.noteMouseUp);
  }

  mouseup=(e)=>{
    console.log("mouseup")
    this.svgDomRef.removeEventListener("mousemove", this.mousemove);
    this.svgDomRef.removeEventListener("mouseup",this.mouseup);
    this.path = null;
  }

  onMouseDown=(e)=>{
    console.log(e)
    console.log(this.svgDomRef);
    // this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    // this.path.setAttribute("fill", "none");
    // this.path.setAttribute("stroke", "#000");
    // this.path.setAttribute("stroke-width", 2);
    this.rect = this.svgDomRef.getBoundingClientRect();
    // this.svgDomRef.appendChild(this.path);
    var pos = this.getMousePosition(e);
    this.currentLine.start = pos;
    let note = {title:"note!", text:"note-text", x:pos.x, y:pos.y, id:this.noteId++};
    // this.movelatestNoteTo(pos);
    // this.lineBuffer.push(this.path)
    // this.note = {title:"note!", text:"note-text", x:pos.x, y:pos.y, id:this.noteId++}
    this.notes= this.notes.concat([note]);
    this.setState({notes: this.state.notes.concat([
            note
        ])})
    // this.setState({notes:this.state.notes.concat([this.note])})
    // console.log(this.notes)

    this.svgDomRef.addEventListener("mousemove", this.mousemove);

    this.svgDomRef.addEventListener("mouseup",this.mouseup);
  }

  movelatestNoteTo=(pos)=>{
    var note = this.state.notes.pop()
    note.x = pos.x;
    note.y = pos.y;
    this.setState({notes: this.state.notes.concat([note])})
  }

  refer=(r)=>{
    console.log(r);
    this.note = r;
  }

  render(){
    return <div id={"tausta"} ref={r=>this.svgDomRef=r} onMouseDown={this.onMouseDown} style={{width:"100vw", height:"100vh"}}>
    {
      this.state.notes.map(n=>{
        return <Bubble key={n.id} title={n.title} text={n.text} x={n.x} y={n.y}></Bubble>
        // return <Referrable key={n.id} refer={this.refer}></Referrable>
      })
    }

    </div>
  }
}
