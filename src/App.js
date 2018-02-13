import React, { Component } from 'react';
import { Note } from './components/note.js';
import { SVGSheet } from './components/svgstuff.js';
import { Referrable } from './components/referrable.js';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  referral=(r)=>{
    // console.log("refer:",r);
    var pos = 0;
    r.style.top = "0px";
    // setInterval(()=>{
    //   r.style.top = (pos+=1) + "px";
    //   // console.log(pos)
    // },100)
  }
  render() {
    return (
      <div className="App">
        <Referrable refer={this.referral}></Referrable>
        <SVGSheet></SVGSheet>
      </div>
    );
  }
}

export default App;
