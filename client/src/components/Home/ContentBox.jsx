import { useState, useEffect } from 'react'
import ShowCardDetail from './ShowCardDetail';
import { saveCardData, getAllCards, updateCard } from '../../api/service';

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

   function CardData(title, description, status) {
      return {
         title: title,
         description: description,
         status: status,
         name: localStorage.getItem('taskez-name'),
         image: localStorage.getItem('taskez-image'),
         email: localStorage.getItem('taskez'),
      }
   }

   const [todoTitle, settodoTitle] = useState('');
   const [todoDescription, settodoDescription] = useState('');

   const addTodo = async () => {
      if (todoTitle === '' || todoDescription === '') {
         alert('Please fill all fields');
      } else {
         alert('Todo added successfully');
         const res = await saveCardData(CardData(todoTitle, todoDescription, 'todo'));
         console.log(res);
         settodoTitle('');
         settodoDescription('');
      }
   }

   const [progressTitle, setprogressTitle] = useState('');
   const [progressDescription, setprogressDescription] = useState('');

   const addProgress = async () => {
      if (progressTitle === '' || progressDescription === '') {
         alert('Please fill all fields');
      } else {
         alert('Progress added successfully');
         const res = await saveCardData(CardData(progressTitle, progressDescription, 'progress'));
         console.log(res);
         setprogressTitle('');
         setprogressDescription('');
      }
   }

   const [completedTitle, setcompletedTitle] = useState('');
   const [completedDescription, setcompletedDescription] = useState('');

   const addCompleted = async () => {
      if (completedTitle === '' || completedDescription === '') {
         alert('Please fill all fields');
      } else {
         alert('completed added successfully');
         const res = await saveCardData(CardData(completedTitle, completedDescription, 'completed'));
         console.log(res);
         setcompletedTitle('');
         setcompletedDescription('');
      }
   }

   const [cards, setcards] = useState([]);

   useEffect(() => {
      // let allCard = document.getElementsByClassName('content-card');
      // console.log(allCard);
      const getCards = async () => {
         const res = await getAllCards();
         // console.log(res);
         setcards(res);
      }
      getCards();
   }, []);

   let todocard = cards.filter(card => card.status === 'todo').length;
   let inprogresscard = cards.filter(card => card.status === 'progress').length;
   let completedcard = cards.filter(card => card.status === 'completed').length;

   // Drag and Drop Code
   const [todoBorder, settodoBorder] = useState('white');
   const [progressBorder, setprogressBorder] = useState('white');
   const [completedBorder, setcompletedBorder] = useState('white');

   const todoDragStart = (e, id) => {
      e.dataTransfer.setData('cardId', id);
   }

   const progressDragStart = (e, id) => {
      e.dataTransfer.setData('cardId', id);
   }

   const completedDragStart = (e, id) => {
      e.dataTransfer.setData('cardId', id);
   }

   const todoDragOver = (e) => {
      e.preventDefault();
      settodoBorder('gray');
   }

   const progressDragOver = (e) => {
      e.preventDefault();
      setprogressBorder('gray');
   }

   const completedDragOver = (e) => {
      e.preventDefault();
      setcompletedBorder('gray');
   }

   const todoDragDropped = async (e) => {
      settodoBorder('white');
      await updateCard({id: e.dataTransfer.getData('cardId'), status: 'todo' });
   }

   const progressDragDropped = async (e) => {
      setprogressBorder('white');
      await updateCard({id: e.dataTransfer.getData('cardId'), status: 'progress' });
   }

   const completedDragDropped = async (e) => {
      setcompletedBorder('white');
      await updateCard({id: e.dataTransfer.getData('cardId'), status: 'completed' });
   }

   return (
      <div className='content-box'>
         {/* To Do Tray */}
         <div dropabble="true" onDragOver={todoDragOver} onDrop={todoDragDropped} onDragLeave={() => settodoBorder('white')} style={{ border: `2px dashed ${todoBorder}` }} className="content-tray">
            <div className='top'>
               <h3>To Do</h3>
               <p className="todo-count">{todocard}</p>
            </div>
            <div onClick={showTodoAdd} className="add-button">
               <i className="fal fa-plus"></i>
            </div>
            <div style={{ display: todoDisplay, transition: "0.6s ease" }} className="add-content">
               <input type="text" name="title" id="title" placeholder='Give your task a title' value={todoTitle} onChange={(e) => settodoTitle(e.target.value)} />
               <textarea name="description" id="description" placeholder='Description' value={todoDescription} onChange={(e) => settodoDescription(e.target.value)}></textarea>
               <button onClick={addTodo}>Add</button>
            </div>
            {cards.map((card, index) => {
               if (card.status === 'todo') {
                  todocard++;
                  return (<div draggable="true" onDragStart={(e) => todoDragStart(e, card._id)} key={index} className="content-card">
                     <h3>{card.title}</h3>
                     <p>{card.description}</p>
                     <div className="card-writer">
                        <div>
                           <img src={card.image} alt="" />
                           <p>{card.name}</p>
                        </div>
                        <i className="far fa-comment-alt-dots"></i>
                     </div>
                  </div>)
               }
            })}
         </div>

         {/* In Progress Tray */}
         <div dropabble="true" onDragOver={progressDragOver} onDrop={progressDragDropped} onDragLeave={() => setprogressBorder('white')} style={{ border: `2px dashed ${progressBorder}` }} className="content-tray">
            <div className='top'>
               <h3>In Progress</h3>
               <p className="todo-count">{inprogresscard}</p>
            </div>
            <div onClick={showProgressAdd} className="add-button">
               <i className="fal fa-plus"></i>
            </div>
            <div style={{ display: inprogressDisplay, transition: "0.6s ease" }} className="add-content">
               <input type="text" name="title" id="title" placeholder='Give your task a title' value={progressTitle} onChange={(e) => setprogressTitle(e.target.value)} />
               <textarea name="description" id="description" placeholder='Description' value={progressDescription} onChange={(e) => setprogressDescription(e.target.value)}></textarea>
               <button onClick={addProgress}>Add</button>
            </div>
            {cards.map((card, index) => {
               if (card.status === 'progress') {
                  return (<div draggable="true" onDragStart={(e) => progressDragStart(e, card._id)} key={index} className="content-card">
                     <h3>{card.title}</h3>
                     <p>{card.description}</p>
                     <div className="card-writer">
                        <div>
                           <img src={card.image} alt="" />
                           <p>{card.name}</p>
                        </div>
                        <i className="far fa-comment-alt-dots"></i>
                     </div>
                  </div>)
               }
            })}
         </div>

         {/* Completed Tray */}
         <div dropabble="true" onDragOver={completedDragOver} onDrop={completedDragDropped} onDragLeave={() => setcompletedBorder('white')} style={{ border: `2px dashed ${completedBorder}` }} className="content-tray">
            <div className='top'>
               <h3>Completed</h3>
               <p className="todo-count">{completedcard}</p>
            </div>
            <div onClick={showCompletedAdd} className="add-button">
               <i className="fal fa-plus"></i>
            </div>
            <div style={{ display: completedDisplay, transition: "0.6s ease" }} className="add-content">
               <input type="text" name="title" id="title" placeholder='Give your task a title' value={completedTitle} onChange={(e) => setcompletedTitle(e.target.value)} />
               <textarea name="description" id="description" placeholder='Description' value={completedDescription} onChange={(e) => setcompletedDescription(e.target.value)}></textarea>
               <button onClick={addCompleted}>Add</button>
            </div>
            {cards.map((card, index) => {
               if (card.status === 'completed') {
                  return (<div draggable="true" onDragStart={(e) => completedDragStart(e, card._id)} key={index} className="content-card">
                     <h3>{card.title}</h3>
                     <p>{card.description}</p>
                     <div className="card-writer">
                        <div>
                           <img src={card.image} alt="" />
                           <p>{card.name}</p>
                        </div>
                        <i className="far fa-comment-alt-dots"></i>
                     </div>
                  </div>)
               }
            })}
         </div>

         {/* <ShowCardDetail /> */}
      </div>
   )
}

export default ContentBox;