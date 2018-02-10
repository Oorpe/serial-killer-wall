import React, { Component } from 'react';
import { Note } from './components/note.js';
import { SVGSheet } from './components/svgstuff.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  //while dragging, reposition latest note according to event coords
  onMoveEvent(e){
    // console.log("parent:",e)
  }
  //here, create a new note node with event's coords and append to note list
  onMouseDownEvent(e){

  }
  //here, lock the note in place
  onMouseUpEvent(e){

  }

  render() {
    return (
      <div className="App">

        <SVGSheet onMoveEvent={this.onMoveEvent}></SVGSheet>
      </div>
    );
  }
}

export default App;
