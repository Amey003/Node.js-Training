//it will give the information about path where file is save etc. if this file
//for more information and different types of path https://nodejs.org/dist/latest-v12.x/docs/api/path.html
//above site will give information about doc in node
const path =require('path');
var pathObj =path.parse(__filename);
console.log(pathObj);