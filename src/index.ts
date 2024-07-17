import express from 'express';
import dotenv from 'dotenv';
import user_router from './rest/user_api';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import post_router from './rest/post_api';

var cors = require('cors');

dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

const corsOptions = {
  origin: 'http://localhost:3000', // your frontend's origin
  credentials: true, // allow credentials
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', user_router);
app.use('/api', post_router);

mongoose
  .connect(process.env.ATLAS_URI!)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
    // app.use('/api', user_router);
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB Atlas', error);
  });
