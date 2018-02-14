import React, { Component, PureComponent } from 'react';
// import { Note } from './components/note.js';
// import { SVGSheet } from './components/svgstuff.js';
// import { Referrable } from './components/referrable.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  // refer(e){
  //   console.log("app level refer:",e)
  // }
  click(e){
    console.log(e)
  }
  render() {
    return (
      <div className="App">
      <NoteContainer notes={[]}/>
      </div>
    );
  }
}

const Bt = ({title, click}) => (
  <button onClick={click}>{title}</button>
)
var id = 0;
class NoteContainer extends Component {
  constructor(props){
    super(props);
    this.state = {notes: []}
    this.dragging = false;
    this.noteRect = {width: 0, height: 0}
  }
  componentDidMount(){
    this.onmousedown({clientX: 50, clientY: 50})
  }
  onmousedown=(e)=>{
    // console.log(e)
      this.setState({notes: this.state.notes.concat([
        {
          id: id++,
          text: "new note no."+id,
          pos: {x: e.clientX, y: e.clientY}
        }
      ])})
  }

  addNote=()=>{
    this.setState({notes: this.state.notes.concat([
      {
        id: id++,
        text: "new note no."+id,
        pos: {
          x: window.innerWidth/2 - this.noteRect.width/2,
          y: window.innerHeight/2 - this.noteRect.height/2
        }
      }
    ])})
  }

  /*
  detect box collision
  */
  collision(a, b){
    let res = {x:false, y:false};
      if (a.x < b.x + b.width &&
     a.x + a.width > b.x ){
       res.x = true;
     }

     if(a.y < b.y + b.height &&
     a.height + a.y > b.y) {
      // collision detected!
      res.y = true;
    }
    return res;
  }

  movelatestNoteTo=(clickE)=>{
    let note = this.state.notes.find(n=>n.id == this.draggedNote);

    note.pos.x = (clickE.clientX - this.noteRect.width/2);
    note.pos.y = clickE.clientY - this.noteRect.height/2;
    this.setState({notes: this.state.notes.concat([])})
  }

  noteDrag=(e)=>{
    if(this.dragging){
      this.movelatestNoteTo(e);
    }
  }
  dragEnd=(e)=>{
    e.currentTarget.removeEventListener("mousemove", this.noteDrag)
    e.currentTarget.removeEventListener("mouseup", this.dragEnd)
    this.dragging = false;
    document.querySelector("#container").removeEventListener("mousemove", this.noteDrag)
  }

  onNoteDragStart=(clickE, id)=>{
    clickE.preventDefault()
    this.draggedNote = id;
    this.dragging = true;
    this.noteRect = clickE.currentTarget.getBoundingClientRect()
    // console.log("noteDragStart:",clickE.currentTarget)
    // console.log("rect:",this.noteRect)
    document.querySelector("#container").addEventListener("mousemove", this.noteDrag)
    clickE.currentTarget.addEventListener("mousemove", this.noteDrag)
    clickE.currentTarget.addEventListener("mouseup", this.dragEnd)

  }
  render(){

    return <div id="container">
    <Bt title="nappi" click={this.addNote}/>
    {this.state.notes.map(n=>{
      return <Note key={n.id} {...n} onMouseDown={this.onNoteDragStart}/>
    })}
    </div>
  }
}

const Note = ({id, text, pos, onMouseDown}) => (
  <div onMouseDown={e=>onMouseDown(e,id)} id={"note_"+ id} className="Bubble" style={{left: pos.x, top: pos.y}}>
  <span>{text}</span>
  </div>
)
// class Note extends Component {
//
// }

// const makeDraggable = (Inner) => (props) => (
//   <div style={{position:"absolute"}}>
//   <Inner  {...props}/>
//   </div>
// )
// const Draggable = makeDraggable(Referrable);

// const wrapHOC = (WrappedComponent) => (props) => (
//   <div>
//     <div>header</div>
//     <div><WrappedComponent {...props}/></div>
//     <div>footer</div>
//   </div>
// );
//
// const App2 = ({name}) => <div>Hello {name}</div>;
//
// const WrappedApp = wrapHOC(App2);

export default App;
