import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [notes, setNotes] = useState([]);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:5000/notes');
    setNotes(res.data);
  };

  const submit = async () => {
    try {
      if (editId) {
        await axios.put(
          `http://localhost:5000/notes/${editId}`,
          { message }
        );
        setEditId(null);
      } else {
        await axios.post(
          'http://localhost:5000/notes',
          { message }
        );
      }

      setMessage('');
      fetchNotes();
    } catch (err) {
      console.log(err);
      alert('Operation failed');
    }
  };

  const edit = (note) => {
    setMessage(note.message);
    setEditId(note._id);
  };

  const del = async (id) => {
    await axios.delete(`http://localhost:5000/notes/${id}`);
    fetchNotes();
  };

  return (
    <div className='app-shell'>
      <div className='container'>
        <img src='/notes-illustration.svg' alt='Colorful notes illustration' className='hero-image' />

        <div className='header-row'>
          <div>
            <h2>Notes App</h2>
          </div>
          <span className='pill'>✨ Your colorful thoughts</span>
        </div>

        <div className='composer'>
          <input
            type='text'
            placeholder='Write your colorful note...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button onClick={submit} className='primary-btn'>
            {editId ? 'Update' : 'Add Note'}
          </button>
        </div>

        <div className='notes-list'>
          {notes.length === 0 ? (
            <div className='empty-state'>No colorful notes yet. Add your first spark!</div>
          ) : (
            notes.map((note) => (
              <div className='card' key={note._id}>
                <p>{note.message}</p>

                <div className='card-actions'>
                  <button onClick={() => edit(note)} className='ghost-btn'>
                    Edit
                  </button>

                  <button onClick={() => del(note._id)} className='danger-btn'>
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;