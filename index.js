// index.js
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;
const dataSchema = new mongoose.Schema({
  // Define the schema fields here based on your data structure
  content: { content: String },
  // Add other fields as needed
});

const messages = mongoose.model('messages', dataSchema);


// module.exports = Data;

// MongoDB connection
const mongoUri = 'mongodb+srv://matje-p:ZNZGiQPvB0X86osf@cluster0.g4bap1z.mongodb.net/DeploymentTest?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {

}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World again');
});

app.get('/first-object', async (req, res) => {
    try {
      const firstObject = await messages.findOne(); // Retrieve the first object from the collection
      if (!firstObject) {
        return res.status(404).send('No data found');
      }
      res.json(firstObject);
    } catch (error) {
      console.error('Error retrieving data:', error);
      res.status(500).send('Internal Server Error');
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
