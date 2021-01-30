//promise :- Holds the eventual result of an asynchronous operation
//if async operation is run the it fulfilled or it async opration reject 
const p =new Promise((resole,reject)=>{//creating promise we should give two parameters(resolve and reject)
    //async work e.g calling server, database, display time etc.
   setTimeout(()=>{
//resole(1); //if we want to give information the this function is use`
                         reject(new Error('messages'));// if we want to give error to user then this function is use
   
                    },2000);
});  

    p.then(result =>console.log('Result',result));
    p.catch(err => console.log('Error',err.message)); 