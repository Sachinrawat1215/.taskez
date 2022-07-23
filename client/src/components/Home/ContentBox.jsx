import {useState} from 'react'
import ShowCardDetail from './ShowCardDetail';

const ContentBox = () => {
   const [todoDisplay, settodoDisplay] = useState('none');
   const [inprogressDisplay, setinprogressDisplay] = useState('none');
   const [completedDisplay, setcompletedDisplay] = useState('none');

   const showTodoAdd = () => {
      todoDisplay === 'none' ? settodoDisplay('block') : settodoDisplay('none');
   }

   const showProgressAdd = () => {
      inprogressDisplay === 'none' ? setinprogressDisplay('block') : setinprogressDisplay('none');
   }

   const showCompletedAdd = () => {
      completedDisplay === 'none' ? setcompletedDisplay('block') : setcompletedDisplay('none');
   }

   return (
      <div className='content-box'>
         {/* To Do Tray */}
         <div className="content-tray">
            <div className='top'>
               <h3>To Do</h3>
               <p className="todo-count">2</p>
            </div>
            <div onClick={showTodoAdd} className="add-button">
               <i className="fal fa-plus"></i>
            </div>
            <div style={{display: todoDisplay, transition: "0.6s ease"}} className="add-content">
               <input type="text" name="title" id="title" placeholder='Give your task a title' />
               <textarea name="description" id="description" placeholder='Description'></textarea>
               <button>Add</button>
            </div>
            <div className="content-card">
               <h3>Design App - CodeHunt</h3>
               <p>Lorem ipsum dolor sit, amet consec tetur adipi sicing elit. Aut quam volup tatum ducimus reiciendis non veri tatis dolorum iste soluta rerum sunt!</p>
               <div className="card-writer">
                  <div>
                     <img src="./Images/photo2.png" alt="" />
                     <p>Shreyansh Sharma</p>
                  </div>
                  <i className="far fa-comment-alt-dots"></i>
               </div>
            </div>
         </div>

         {/* In Progress Tray */}
         <div className="content-tray">
            <div className='top'>
               <h3>In Progress</h3>
               <p className="todo-count">2</p>
            </div>
            <div onClick={showProgressAdd} className="add-button">
               <i className="fal fa-plus"></i>
            </div>
            <div style={{display: inprogressDisplay, transition: "0.6s ease"}} className="add-content">
               <input type="text" name="title" id="title" placeholder='Give your task a title' />
               <textarea name="description" id="description" placeholder='Description'></textarea>
               <button>Add</button>
            </div>
            <div className="content-card">
               <h3>Design App - CodeHunt</h3>
               <p>Lorem ipsum dolor sit, amet consec tetur adipi sicing elit. Aut quam volup tatum ducimus reiciendis non veri tatis dolorum iste soluta rerum sunt!</p>
               <div className="card-writer">
                  <div>
                     <img src="./Images/photo2.png" alt="" />
                     <p>Shreyansh Sharma</p>
                  </div>
                  <i className="far fa-comment-alt-dots"></i>
               </div>
            </div>
         </div>

         {/* Completed Tray */}
         <div className="content-tray">
            <div className='top'>
               <h3>Completed</h3>
               <p className="todo-count">2</p>
            </div>
            <div onClick={showCompletedAdd} className="add-button">
               <i className="fal fa-plus"></i>
            </div>
            <div style={{display: completedDisplay, transition: "0.6s ease"}} className="add-content">
               <input type="text" name="title" id="title" placeholder='Give your task a title' />
               <textarea name="description" id="description" placeholder='Description'></textarea>
               <button>Add</button>
            </div>
            <div className="content-card">
               <h3>Design App - CodeHunt</h3>
               <p>Lorem ipsum dolor sit, amet consec tetur adipi sicing elit. Aut quam volup tatum ducimus reiciendis non veri tatis dolorum iste soluta rerum sunt!</p>
               <div className="card-writer">
                  <div>
                     <img src="./Images/photo2.png" alt="" />
                     <p>Shreyansh Sharma</p>
                  </div>
                  <i className="far fa-comment-alt-dots"></i>
               </div>
            </div>
         </div>

         <ShowCardDetail />
      </div>
   )
}

export default ContentBox;