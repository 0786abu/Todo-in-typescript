import { Delete, Edit } from "@mui/icons-material"
import { useState } from "react"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  "@media (max-width:768px)":{
    width: 300,
  },
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const App = () => {
  type Todo = {
    id:number,
    task:string,
    completed: boolean
  }
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Todo[]>([]);
  const [edittask, setEdittask] = useState<string>("");
  const [editid, setEditid] = useState<number | null>()

  const [open, setOpen] = useState(false);
  const handleOpen = (idd:number,taskk:string) => {
    setOpen(true);
    setEditid(idd)
    setEdittask(taskk)
  }
  const handleClose = () => setOpen(false);
  const handleupdate = ()=>{
    const updatedTasks = tasks.map((task)=>{
      if(task.id ===editid){
        return {...task, task: edittask};
      }
      return task;
    })
    setTasks(updatedTasks);
    setOpen(false);
  }


  const handlesubmit = (e: React.FormEvent)=>{
    e.preventDefault();
    if(!task){
      alert("Please enter a task");
      return;
    }
    const newTodo:Todo = {
      id: Math.floor(1000000000 + Math.random()* 9000000000),
      task: task,
      completed: false
    }
    setTasks([...tasks, newTodo]);
    setTask("");
  }

  const togglecompletion = (idd:number)=>{
    const completed = tasks.map((task)=>{
      if(task.id ===idd){
        return {...task, completed:!task.completed};
      }
      return task;
    })
    setTasks(completed);
  }

  const toggledelete = (idd:number)=>{
    const deletetask = tasks.find((task)=>task.id ===idd);
    if(deletetask){
      const updatedTasks = tasks.filter((task)=>task.id!==idd);
      setTasks(updatedTasks);
    }
  }

  return (
    <div>
         <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Update Task
          </Typography>
          <div className=" mt-2">
            <input type="text" value={edittask} onChange={(e)=>setEdittask(e.target.value)} placeholder="Update Task" className=" w-full font-[400] border outline-none h-10 p-2" />
            <button onClick={handleupdate} type="button" className=" px-2 mt-2 py-1 bg-blue-600 text-white rounded-sm h-full">Update</button>
          </div>
        </Box>
      </Modal>
      <div className=" mt-10 mx-2">
        <h2 className=" text-center font-[800] text-4xl">Todo App</h2>
        <form className="form max-w-[600px] mx-auto mt-10" onSubmit={handlesubmit}>
          <div className=" flex items-center">
            <input type="text" value={task} onChange={(e)=>setTask(e.target.value)} placeholder="Enter something..." className=" w-full font-[400] border outline-none h-10 p-2 rounded-tl-lg rounded-bl-lg" />
            <button type="submit" className=" px-4 py-2 bg-blue-600 text-white rounded-tr-lg rounded-br-lg h-full">Add</button>
          </div>
        </form>

        <div className=" mx-2">
        <div className=" mt-20 max-w-[700px] mx-auto">
          {tasks?.length===0 ? (<><h2 className=" text-center text-2xl font-[800] mb-8">No task yet</h2></>):(<h2 className=" text-center text-2xl font-[800] mb-8">Your Todos</h2>)}
          <ul className=" list-none">
           {tasks?.map((todo)=>{
            return(
              <li key={todo.id} className="border p-1 md:p-2 break-words items-center my-4 justify-center flex min-h-[60px] rounded-lg">
              <div className="flex items-center relative w-full pr-20">
              <input onClick={()=>togglecompletion(todo.id)} type="checkbox" className=" min-w-4 min-h-4 mr-4"/>
              <div className=" absolute top-[50%] space-x-2 -translate-y-[50%] right-2">
                <span className=" text-green-500 cursor-pointer" onClick={()=>handleOpen(todo.id,todo.task)}><Edit/></span>
                <span className=" text-red-600 cursor-pointer" onClick={()=>toggledelete(todo.id)}><Delete/></span>
              </div>
              <span className={`w-full break-words text-base font-[300] font-sans ${todo.completed === true ? "line-through" : ""}`}>{todo.task}</span>
              </div>
            </li>
            )
           })}
          </ul>
        </div>
        </div>
      </div>
    </div>
  )
}

export default App