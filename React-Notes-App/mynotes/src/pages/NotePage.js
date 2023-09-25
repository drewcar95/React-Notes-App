import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import notes from '../assets/data'
import { Link } from 'react-router-dom'
import { ReactComponent as ArrowLeft } from '../assets/arrow-left.svg'

const NotePage = () => {
  const noteId = useParams()
  let Id = noteId.id
  // let note = notes.find(note => note.id === Number(noteId.id))
  let [note, setNote] = useState([null])

  useEffect(() => {
    getNote()
  }, [Id]);

  let navigate = useNavigate()

  let getNote = async() => {
    if (Id === 'new') return
    let response = await fetch(`http://localhost:8000/notes/${Id}`)
    let data = await response.json()
    setNote(data)
  }

  let updateNote = async() => {
    await fetch(`http://localhost:8000/notes/${Id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated':new Date() })
    })
  }

  let createNote = async() => {
    await fetch(`http://localhost:8000/notes/`, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated':new Date() })
    })
  }

  let deleteNote = async() => {
    await fetch(`http://localhost:8000/notes/${Id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({note})
    })
    navigate('/');
  }

  let handleSubmit = async() => {
    if(Id !== 'new' && !note.body){
      deleteNote()
        }else if (Id !== 'new') {
          updateNote()
        }else if(Id === 'new' && note !== null){
          createNote()
        }

    await updateNote();
    navigate('/');
  };

  return (
    <div className='note'>
      <div className='note-header'>  
        <h3>
          <Link to="/" >
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {Id !== 'new' ? (
          <button onClick={deleteNote}> Delete </button>
        ): (
          <button onClick={handleSubmit}> Done </button>
        )}
      </div>
        <textarea onChange={(e)=> {setNote({...note, 'body':e.target.value})}} value={note?.body}>
          
        </textarea>
    </div>
  )
}

export default NotePage
