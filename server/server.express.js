import express from 'express';
//import api from './api.js';

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//app.use('/api', api);

app.listen( () => {
  console.log(`Example app listening on 127.0.0.1:3001`);
})