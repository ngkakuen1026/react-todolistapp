import { useEffect, useState } from 'react'
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiCheckboxBlankLine, RiCheckboxLine } from "react-icons/ri";
import { IoTrashOutline } from 'react-icons/io5';
import { MdGTranslate, MdNightlight, MdSunny } from "react-icons/md";
import { v4 as uuid } from 'uuid';
import { useTranslation } from 'react-i18next';

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

  const [isNightTheme, setIsNightTheme] = useState(false);

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

  function toggleTheme(){
    setIsNightTheme(!isNightTheme);
  }

  const [currentLanguage, setCurrentLanguage] = useState("en");

  const [t, i18n] = useTranslation("global");

  function handleLanguageChange(lang) {
    i18n.changeLanguage(lang);
    setCurrentLanguage(lang);
  }

  function toggleLanguage () {
    const newLanguage = currentLanguage === "en" ? "zh" : "en";
    handleLanguageChange(newLanguage);
  }

  return (
    <div className={`p-5 min-h-screen ${isNightTheme ? 'bg-dark-mode' : 'bg-white'}`}>

      <div className='header flex justify-between pb-5'>
        <h1 className={`text-3xl ${isNightTheme ? 'text-white' : 'text-black'}`}>{t("header.title")}</h1>
        <div className='icon-group'>
          <MdSunny className={`w-10 h-10 ml-8 inline-block cursor-pointer ${isNightTheme ? 'text-white' : 'hidden'}`} onClick={toggleTheme} />
          <MdNightlight className={`w-10 h-10 ml-8 inline-block cursor-pointer ${isNightTheme ? 'hidden' : ''}`} onClick={toggleTheme} />
          <MdGTranslate className={`w-10 h-10 ml-8 inline-block cursor-pointer ${isNightTheme ? 'fill-white' : 'fill-black'}`} onClick={toggleLanguage} />
        </div>
      </div>
      <div className='header flex justify-between pb-5'>
        <h1 className={`text-3xl ${isNightTheme ? 'text-white' : 'text-black'}`}>{t("header.mytasks")}</h1>
        <button className={`flex items-center hover:opacity-50 ${isNightTheme ? 'text-white' : 'text-black'}`} onClick={() => handlePopUp("open")}>
          <h1 className='text-center text-3xl pr-2'>{t("header.addtask")}</h1>
          <IoIosAddCircleOutline className='w-10 h-10'/>
        </button>
      </div>

      {
        popUp &&
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className={`pop-up py-2 px-6 border-2 border-gray-600 rounded-lg max-w-full m-5 w-full ${isNightTheme ? 'bg-dark-mode' : 'bg-white'}`}>
            <h1 className={`text-center text-3xl py-5 ${isNightTheme ? 'text-white' : 'text-black'}`}>{t("body.popup.addtask")}</h1>
            <input 
              type='text'
              value={newTaskText}
              onChange={(e) => {setNewTaskText(e.target.value)}}
              className={`pop-up-input border-2 border-gray-300 rounded-lg w-full h-64 text-black px-4 text-3xl`}
            />
            <div className='py-5 items-center flex justify-center gap-5'>
              <button 
                className='bg-red-400 hover:bg-red-500 rounded-xl px-5 py-3 items-center'
                onClick={() => {handlePopUp("close")}}
              >
                {t("body.popup.cancel")}
              </button>
              <button 
                className='bg-green-400 hover:bg-green-500 rounded-xl px-5 py-3 items-center text-lg'
                onClick={handleAddTask}
              >
                {t("body.popup.addtask")}
              </button>
            </div>
          </div>
        </div>
      }

      <hr/>
      <div className='py-5'>
        {
          toDoList.length == 0 ?
            <h1 className={`text-3xl ${isNightTheme? 'text-white' : 'text-black'}`}>{t("body.tasktext")}</h1>:
            <h1 className={`text-3xl ${isNightTheme? 'text-white' : 'text-black'}`}>{t("body.tasktext1")} {toDoList.length} {t("body.tasktext2")}</h1>
        }
      </div>
      <hr/>

      <div className="toDoList flex flex-col-reverse">
        {toDoList.map(listItem => {
          return (
            <>
              <div className={`header flex justify-between items-center my-2 py-8 px-4 rounded-lg ${isNightTheme? 'bg-gray-200 hover:bg-gray-300' : 'bg-gray-200 hover:bg-gray-300'} `} >
                <ul>
                  <li className='text-2xl flex items-center' key={listItem.id}>
                    {listItem.isCompleted ?
                      <RiCheckboxLine className='w-10 h-10 cursor-pointer mr-2' onClick={() => toggleComplete(listItem.id)} />:
                      <RiCheckboxBlankLine className='w-10 h-10 cursor-pointer mr-2' onClick={() => toggleComplete(listItem.id)} />
                    }
                    {
                      listItem.isCompleted ?
                      <span className='line-through'>{listItem.text}</span> :
                      <span>{listItem.text}</span>
                    }
                  </li>
                  {listItem.isCompleted &&
                    <h1 className={`text-lg italic text-left items-center`}>{t("body.completed")}</h1> 
                  }
                </ul>
                <IoTrashOutline className='w-10 h-10 cursor-pointer' onClick={() => handleDeleteTask(listItem.id)} />
              </div>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default App
