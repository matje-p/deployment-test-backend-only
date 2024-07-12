const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  // Add this line

const app = express();
const port = process.env.PORT || 3000;
const dataSchema = new mongoose.Schema({
  content: { type: String },
});

const messages = mongoose.model('messages', dataSchema);

app.use(cors());
app.use(express.json());

const mongoUri = process.env.MONGODB_URI;  // Update this line to read from environment variable

mongoose.connect(mongoUri, {}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.get('/', (req, res) => {
  res.send('Hello World again');
});

app.get('/first-object', async (req, res) => {
  try {
    const firstObject = await messages.findOne();
    if (!firstObject) {
      return res.status(404).send('No data found');
    }
    res.json(firstObject.content);
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.post('/add-message', async (req, res) => {
  try {
    const { content } = req.body;
    const newMessage = new messages({ content });
    await newMessage.save();
    res.status(201).json({ message: 'Message added successfully' });
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/all-messages', async (req, res) => {
  try {
    const allMessages = await messages.find();
    res.json(allMessages);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
