//open fileSystem folder separately in vs code.

const fs = require('fs');


// PART1 - reading file......................
fs.readFile('./docs/blog1.txt' , (err,data)=>{
    if(err){
        console.log(err);
    }
    console.log(data.toString());
});

/* this will appear first bcz it fs.readFile is 
asynchronous in nature. 
*/
console.log('first line');


// PART2-  write file......................


fs.writeFile('./docs/blog1.txt' , 'changed text with fs.writeFile function', ()=>{
    console.log('changes text of file -');
})

/* changed  content appers even though the command to print was 
given content first when it was't changed.
*/

// creates a new file also
fs.writeFile('./docs/blog2.txt' , 'created new file with fs.writeFile function', ()=>{
    console.log('created new file --');
})



// PART 3 - Directories...................... 
//create directoryṇ
if(!fs.existsSync('./assets-delThisBeforeRunningCode')){
    fs.mkdir('./assets-delThisBeforeRunningCode', (err)=>{
        if(err){
            console.log(err);
        }
        console.log('created asset folder');
    });
}else{// delete folder - remove dir
    fs.rmdir('./assets-delThisBeforeRunningCode',(err)=>{
        if(err){
            console.log(err);
        }
        console.log('folder  deleted');
    });
}


// PART 4  - Delete files

if(fs.existsSync('./docs/deleteMe.txt')){
    fs.unlink('./docs/deleteMe.txt', (err)=>{
        if(err){
            console.log(err);
        }
        console.log('deleted file');
    });
}


