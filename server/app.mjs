import dotenv from 'dotenv';
dotenv.config({ path: process.env.NODE_ENV === 'production' ? '.env.production' : '.env' });

import express from 'express';
import cors from 'cors';
import postRoutes from './src/routes/postRoutes.mjs';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello TechUp!");
});

app.use("/posts", postRoutes);


app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});

export default app;