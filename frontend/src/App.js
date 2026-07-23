// src/App.js - Frontend CRUD Interface
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// const API_URL = 'http://localhost:5000/api/items';
// const API_URL = 'http://backend-service:5000/api/items';
const API_URL = '/api/items';

function App() {
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', id: null });

  const fetchItems = async () => {
    const res = await axios.get(API_URL);
    setItems(res.data);
  };

  useEffect(() => { fetchItems(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.id) await axios.put(`${API_URL}/${form.id}`, form);
    else await axios.post(API_URL, form);
    setForm({ title: '', description: '', id: null });
    fetchItems();
  };

  const startEdit = (item) => setForm({ ...item, id: item._id });

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchItems();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>MERN CRUD</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} />
        <input placeholder="Description" value={form.description} onChange={e => setForm({...form, description: e.target.value})} />
        <button type="submit">{form.id ? 'Update' : 'Add'}</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item._id}>
            {item.title} - {item.description}
            <button onClick={() => startEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default App;
