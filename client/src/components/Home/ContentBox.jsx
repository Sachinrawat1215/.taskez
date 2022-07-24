import { useState, useEffect } from 'react'
import { saveCardData, getAllCards, updateCard, getCardData, deleteCard } from '../../api/service';

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
         settodoDisplay('none');
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
         setinprogressDisplay('none');
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
         setcompletedDisplay('none');
      }
   }

   const [cards, setcards] = useState([]);
   const [todoBorder, settodoBorder] = useState('white');
   const [progressBorder, setprogressBorder] = useState('white');
   const [completedBorder, setcompletedBorder] = useState('white');
   const [showDetailedCard, setshowDetailedCard] = useState(false);

   useEffect(() => {
      const getCards = async () => {
         const res = await getAllCards();
         setcards(res);
      }
      getCards();
   }, [todoBorder, progressBorder, completedBorder, showDetailedCard, todoDisplay, inprogressDisplay, completedDisplay]);

   let todocard = cards && cards.filter(card => card.status === 'todo').length;
   let inprogresscard = cards && cards.filter(card => card.status === 'progress').length;
   let completedcard = cards && cards.filter(card => card.status === 'completed').length;

   // Drag and Drop Code


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
      await updateCard({ id: e.dataTransfer.getData('cardId'), status: 'todo' });
   }

   const progressDragDropped = async (e) => {
      setprogressBorder('white');
      await updateCard({ id: e.dataTransfer.getData('cardId'), status: 'progress' });
   }

   const completedDragDropped = async (e) => {
      setcompletedBorder('white');
      await updateCard({ id: e.dataTransfer.getData('cardId'), status: 'completed' });
   }

   // Handling detailed card
   const [rightVal, setrightVal] = useState('');
   const [cardData, setcardData] = useState([]);

   const showBigCard = async (value, id) => {
      const res = await getCardData(id);
      window.scrollTo(0, 0);
      setcardData(res);
      setshowDetailedCard(value);
   }

   const hideDetailedCard = () => {
      setrightVal('-532px');
      setshowDetailedCard(false);
   }

   const handleDelete = async (id) => {
      const confirm = window.confirm('Are you sure you want to delete this card?');
      console.log(confirm);
      if (confirm) {
         await deleteCard(id);
         hideDetailedCard();
      }else{
         return;
      }
   }

   useEffect(() => {
      if (showDetailedCard) {
         setrightVal('0px');
      } else {
         setrightVal('-532px');
      }
   }, [showDetailedCard]);

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
            {cards && cards.map((card, index) => {
               if (card.status === 'todo') {
                  todocard++;
                  return (<div draggable="true" onDragStart={(e) => todoDragStart(e, card._id)} key={index} className="content-card" onClick={() => showBigCard(true, card._id)}>
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
            {cards && cards.map((card, index) => {
               if (card.status === 'progress') {
                  return (<div draggable="true" onDragStart={(e) => progressDragStart(e, card._id)} key={index} className="content-card" onClick={() => showBigCard(true, card._id)}>
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
            {cards && cards.map((card, index) => {
               if (card.status === 'completed') {
                  return (<div draggable="true" onDragStart={(e) => completedDragStart(e, card._id)} key={index} className="content-card" onClick={() => showBigCard(true, card._id)}>
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

         <div style={{ right: rightVal }} className='card-content-container'>
            <div className='icons'>
               <i onClick={() => handleDelete(cardData._id)} style={{display: cardData.email === localStorage.getItem('taskez') ? 'inline' : 'none'}} className="far fa-trash-alt"></i>
               <i onClick={hideDetailedCard} className="far fa-times"></i>
            </div>
            <h1>{cardData.title}</h1>
            <div className="card-content">
               <div className="detail">
                  <p>Created By</p>
                  <div className="content">
                     <img src={cardData.image} alt="" />
                     <p>{cardData.name}</p>
                  </div>
               </div>
               <div className="detail">
                  <p>Description</p>
                  <div className="content">
                     <p>{cardData.description}</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ContentBox;