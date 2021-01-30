//asynchronous is a blocking program
console.log('Before');
getUser(1,getRepositories);//creteing user which can connect to database
console.log('After');


function getRepositories(user){
    getRepositories(user.gitHubUsername, getCommits);
}
function getCommits(repos){
    getCommits(repos, displayCommits);
}

function dislpayCommits(commits){
    console.log(commits);
}

function getUser(id,callback){
    setTimeout(()=>{
        console.log('Reading a user from database..');
        callback({id: id , gitHubUsername:'amey'});
    },2000);//we use 2000 to delay the result for 2 sec.
   
}
//creating repositories of user 
function getRepositories(username,callback){
    setTimeout(()=>{
        console.log('Calling Github api..');
        callback(['repo1', 'repo2' ,'repo3']);//data that store in it which will callback
    },2000);
    
}