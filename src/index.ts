// src/index.ts
import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = process.env.PORT || 3000;

const uri = 'mongodb+srv://matje-p:ZNZGiQPvB0X86osf@cluster0.g4bap1z.mongodb.net/DeploymentTest?retryWrites=true&w=majority';

// Function to connect to MongoDB and retrieve data
async function getDataFromMongoDB() {
  const client = new MongoClient(uri, { });

  try {
    await client.connect();
    const database = client.db('DeploymentTest');
    const collection = database.collection('your-collection-name'); // Replace with your collection name

    // Query to retrieve data
    const data = await collection.find({}).toArray();

    return data;
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  } finally {
    await client.close();
  }
}


app.get('/', (req: Request, res: Response) => {
  // console.log("hello world");
  res.send("Hello World");
});

app.listen(port, () => {
  // console.log(`Server is running on port ${port}`);
});

