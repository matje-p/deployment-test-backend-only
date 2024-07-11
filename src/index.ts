import express, { Request, Response } from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection string
const uri = 'mongodb+srv://matje-p:ZNZGiQPvB0X86osf@cluster0.g4bap1z.mongodb.net/DeploymentTest?retryWrites=true&w=majority';

// Function to connect to MongoDB and retrieve data
async function getDataFromMongoDB() {
  const client = new MongoClient(uri, {  });

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

app.get('/', async (req: Request, res: Response) => {
  try {
    const data = await getDataFromMongoDB();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).send('Error retrieving data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
