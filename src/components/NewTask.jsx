import { useState } from "react";


export default function NewTask({onAdd}) {

const[enteredTask, setEnteredTask] = useState('')

function handleChange(e) {

  setEnteredTask(e.target.value)

}
// Adds the values to the dasks object in App.
function handleClick () {
  //dont allow empty tasks
  if(enteredTask.trim()=== '') {
    return
  }
  // sent the value as an argument through props
    onAdd(enteredTask)
  setEnteredTask('');
}

  return (
    <div className=" flex items-center gap-4">
      <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200"  onChange={handleChange} value={enteredTask}/>
      <button className="text-stone-700 hover:text-stone-950" onClick={handleClick}>Add Task</button>
    </div>
  );
}
