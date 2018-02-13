
import Redux from 'redux'; 

// export class ActionBuffer{
//   constructor(cpy){
//     this.arr = cpy.arr || [];
//   }
//   /**
//   undo latest action
//   */
//   undo=()=>{
//
//   }
//
//
// }
//
// /**
//   a buffered action contains a function that, given a state store object,
//    will modify and return the mutated store with the action done
// */
// export class BufferedAction{
//   constructor(props){
//     this.replay = props.replay || ()=>{throw("BufferedAction without replay replayed!")};
//     this.name = props.name || "unnamed action";
//   }
// }

/**
  state buffer class, allow undo-redo with parameterized buffer sizes.
  doesn't do deep copies, if using object references be sure to do your own!
*/
export class SimpleStateBuffer{

  constructor(p){
    this.arr = p || [];
    this.redoArr = []; //this stores all redoable actions
  }
  push=(state)=>{
    this.arr.push(state);
    return this;
  }
  /**
  undo latest change
  */
  undo=()=>{
    this.redoArr.push(this.arr.pop());
    return this;
  }

  redo=()=>{
    this.arr.push(this.redoArr.pop());
    return this;
  }

  getArr=(cb)=>{
    cb(this.arr.slice())
    return this;
  }

  getRedoArr=(cb)=>{
    cb(this.redoArr.slice())
    return this;
  }

  getState=(cb)=>{
    cb(this.arr[this.arr.length -1])
    return this;
  }
}
