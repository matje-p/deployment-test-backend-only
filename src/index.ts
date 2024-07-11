// src/index.ts
import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  // console.log("hello world");
  res.send("Hello World");
});

app.listen(port, () => {
  // console.log(`Server is running on port ${port}`);
});
