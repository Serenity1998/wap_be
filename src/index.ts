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
  origin: true, // Or use your origin 'https://desolate-reaches-15214.herokuapp.com' explicitly here, whichever works xD
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

// app.use(cors({ origin: /\.vercel\.app$/ }));
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
