import { SimpleStateBuffer } from './actionBuffer.js';

describe("state store with undo-redo",()=>{
  it("keeps state objects", ()=>{
    var b = new SimpleStateBuffer();
    b.push({kissa:"siru"})
    .push({kissa:"nukka"})
    .getState(x=>{
      console.log("state:",x);
      expect(x).toEqual({kissa:"nukka"})
    })
  })
  it("allows undo", ()=>{
    var b = new SimpleStateBuffer();
    b.push({kissa:"siru"})
    .push({kissa:"nukka"})
    .getState(x=>{
      console.log("state:",x);
      expect(x).toEqual({kissa:"nukka"})
    })

    b.undo()
    .getState(x=>{
      console.log("state:",x);
      expect(x).toEqual({kissa:"siru"})
    })
  })

  it("allows redo", ()=>{
    var b = new SimpleStateBuffer();
    b.push({kissa:"siru"})
    .push({kissa:"nukka"})
    .getState(x=>{
      console.log("state:",x);
      expect(x).toEqual({kissa:"nukka"})
    })

    b.undo()
    .getState(x=>{
      console.log("state:",x);
      expect(x).toEqual({kissa:"siru"})
    })

    b.redo()
    .getState(x=>{
      console.log("state:",x);
      expect(x).toEqual({kissa:"nukka"})
    })
  })

  it("allows looking at the history array", ()=>{
    var b = new SimpleStateBuffer();
    b.push({kissa:"siru"})
    .push({kissa:"nukka"})
    .getArr(arr=>{
      console.log(arr)
      expect(arr).toEqual([{kissa:"siru"},{kissa:"nukka"}])
    })
  })

  it("allows looking at the redo history array", ()=>{
    var b = new SimpleStateBuffer();
    b.push({kissa:"siru"})
    .push({kissa:"nukka"})
    .undo()
    .undo()
    .getRedoArr(arr=>{
      console.log(arr)
      expect(arr).toEqual([{kissa:"nukka"},{kissa:"siru"}])
    })
  })

  it("allows redo after addition", ()=>{
    var b = new SimpleStateBuffer();
    b.push({kissa:"siru"})
    .push({kissa:"nukka"})
    .undo()
    .push({koira: "ninja"})
    .redo()
    .getState(st=>{
      console.log(st)
      expect(st).toEqual({kissa:"nukka"})
    })
  })
})
