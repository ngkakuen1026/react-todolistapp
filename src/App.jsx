import { useEffect, useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import { IoTrashOutline } from 'react-icons/io5';
import { MdGTranslate, MdNightlight, MdSunny } from "react-icons/md";
import { v4 as uuid } from 'uuid';

function App() {

  const [toDoList, setToDoList] = useState(() => {
    const storedList = localStorage.getItem("toDoList");
    return storedList ? JSON.parse(storedList) : [];
  });

  useEffect(() => {
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
  }, [toDoList]);

  const [popUp, setPopUp] = useState(false);
  const [newTaskText, setNewTaskText]= useState("");

  function handlePopUp(action) {
    if (action === "open") {
      setPopUp(true)
    }
    if (action === "close") {
      setPopUp(false)
    }
  }

  function handleAddTask() {
    if (newTaskText !== "") {
      setToDoList(currentToDoList => {
          return [
            ...currentToDoList,
            {
              id: uuid(),
              text: newTaskText,
              isCompleted: false
            }
          ]
        }
      )
      setNewTaskText("");
      setPopUp(false);
    }
  }

  function toggleComplete(id) {
    setToDoList(currentToDoList => {
      return currentToDoList.map(item => {
        if (item.id === id) {
          return {
            ...item,
            isCompleted: !item.isCompleted
          }
        }
        return item;
      });
    })
  }

  function handleDeleteTask(id) {
    setToDoList(currentToDoList => {
      return currentToDoList.filter(item => item.id !==id);
    })
  }

  return (
    <div className='p-5'>

      <div className='header flex justify-between pb-5'>
        <h1 className='text-3xl'>To Do List App</h1>
        <div className='icon-group'>
          <MdNightlight className="w-10 h-10 ml-8 inline-block cursor-pointer" />
          <MdGTranslate className="w-10 h-10 ml-8 inline-block cursor-pointer" />
        </div>
      </div>
      <div className='header flex justify-between pb-5'>
        <h1 className='text-center text-3xl'>My Tasks</h1>
        <button className='flex items-cente hover:opacity-50' onClick={() => handlePopUp("open")}>
          <h1 className='text-center text-3xl pr-2'>Add Task</h1>
          <IoIosAddCircleOutline className='w-10 h-10'/>
        </button>
      </div>

      {popUp &&
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="pop-up py-2 px-6 border-2 border-gray-600 rounded-lg bg-white max-w-full m-5 w-full">
            <h1 className='text-center text-3xl py-5'>Add Task</h1>
            <input 
              type='text'
              value={newTaskText}
              onChange={(e) => {setNewTaskText(e.target.value)}}
              className='pop-up-input justify-center border-2 border-gray-300 rounded-lg w-full h-64 '
            />
            <div className='py-5 items-center flex justify-center gap-5'>
              <button 
                className='bg-red-400 hover:bg-red-500 rounded-xl px-5 py-3 items-center text-lg'
                onClick={() => {handlePopUp("close")}}
              >
                Cancel
              </button>
              <button 
                className='bg-green-400 hover:bg-green-500 rounded-xl px-5 py-3 items-center text-lg'
                onClick={handleAddTask}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      }

      <hr className='pb-5'/>

      <div className="toDoList">
        {toDoList.map(listItem => {
          return (
            <ul className='header flex justify-between items-center my-4 py-8 px-4 rounded-lg bg-gray-200 hover:bg-gray-400' key={listItem.id}>
              <li className='text-2xl flex items-center'>
                {listItem.isCompleted ?
                  <RiCheckboxLine className='w-10 h-10 cursor-pointer mr-2' onClick={() => toggleComplete(listItem.id)} />:
                  <RiCheckboxBlankLine className='w-10 h-10 cursor-pointer mr-2' onClick={() => toggleComplete(listItem.id)} />
                }
                {listItem.text}
              </li>
              <IoTrashOutline className='w-10 h-10 cursor-pointer' onClick={() => handleDeleteTask(listItem.id)} />
            </ul>
          )
        })}
      </div>

    </div>
  )
}

export default App
