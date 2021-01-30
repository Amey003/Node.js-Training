const Joi = require('joi');
const express =require('express');
const app = express();
const cat = require('./router/catageryes');

app.use(express.json());
app.use(cat);

const port =process.env.PORT || 3000;
app.listen(port,()=>console.log(`Listening port ${port}...`));
