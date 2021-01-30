const express = require('express');
const router = new express.Router();


const catageryes =[
    {id:1 , name:'Action'},
    {id:2 , name:'Nature'},
    {id:3 , name:'Wallpaper'},
    {id:4 , name:'Travel'},
    {id:5 , name:'Anime'},  
];


router.get('/',(req , res)=>{
    res.send(catageryes);
});

router.post('/',(req,res) => {
     const {error}= validateCatagary(req.body);
     if (error) return res.status(400).send(error.details[0].message);
     
     const catagery ={
     id: catageryes.length +1 ,
     name: req.body.name
    };  
    catageryes.push(catagery);
    res.send(catagery);
 }); 

router.put('/:id',(req,res)=>{
    const catagery = catageryes.find(c=>c.id === parseInt(req.params.id));
    if(!catagery)res.status(404).send('Invalid catagary');    
    const result = validateCatagary(req.body);
    const {error} = validateCatagary(req.body);
    if(error) return res.status(400).send('Invalid catagary');
    catagery.name = req.body.name;
    res.send(catagery);
});

function validateCatagary(catagery){
    const schema={
        name: Joi.string().min(3).required()
    };
  return Joi.validate(catagery, schema);
     
}

router.delete('/:id',(req , res)=>{
    const catagery = catageryes.find(c=>c.id === parseInt(req.params.id));
    if(!course)res.status(404).send('Invalid Catagery');
    
    const index = catageryes.indexOf(catagery);
    catageryes.splice(index,1);

    res.send(catagery);
});


router.get('/:id', (req,res)=>{
    const catagery = catageryes.find(c=>c.id === parseInt(req.params.id));
    if(!catagery)res.status(404).send('Invalid Catagery');
    res.send(catagery);
});

module.exports = router;
