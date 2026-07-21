// server.js - Backend API Setup
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Replace with your MongoDB connection string

// mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/simple_crud');   this is for local development

mongoose.connect ('mongodb://mongodb:27017/simple_crud');  // for dockerized container where mongodb:27017 is container name used to connect backend con to db container

// const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, PORT } = process.env;
// const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;

// mongoose.connect(MONGO_URI)
//   .then(() => console.log('Connected to MongoDB via discrete credentials!'))
//   .catch((err) => console.error('MongoDB connection error:', err));

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String
}, { timestamps: true });
const Item = mongoose.model('Item', ItemSchema);

// CRUD Routes
app.post('/api/items', async (req, res) => res.status(201).json(await new Item(req.body).save()));
app.get('/api/items', async (req, res) => res.json(await Item.find()));
app.put('/api/items/:id', async (req, res) => res.json(await Item.findByIdAndUpdate(req.params.id, req.body, { new: true })));
app.delete('/api/items/:id', async (req, res) => res.json(await Item.findByIdAndDelete(req.params.id)));


const serverPort = 5000;
app.listen(serverPort, () => {
  console.log(`Backend server tier running on port ${serverPort}`);
});
