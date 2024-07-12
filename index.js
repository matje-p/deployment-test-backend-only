const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3000;
const dataSchema = new mongoose.Schema({
  content: { type: String },
});

const messages = mongoose.model('messages', dataSchema);

app.use(cors());
app.use(express.json());

const mongoUri = 'mongodb+srv://matje-p:ZNZGiQPvB0X86osf@cluster0.g4bap1z.mongodb.net/DeploymentTest?retryWrites=true&w=majority';

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
    res.status(201).json({ message: 'Message added successfully' }); // Return JSON response
  } catch (error) {
    console.error('Error adding message:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Return JSON error response
  }
});

app.get('/all-messages', async (req, res) => {
  try {
    const allMessages = await messages.find();
    res.json(allMessages);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Internal Server Error' }); // Return JSON error response
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
