const express = require('express');
const router = express.Router();//we use rount beacues app is use in main file
//app.get is use for displaing information in web page
//we use '/' for main home pages 
//(req , res) are rount handler
router.get('/',(req , res)=>{
    res.render('index',{ title:'My Express app',message:'hello'});//we use this to display our index.pug page or our html page
});

module.exports = router; 
