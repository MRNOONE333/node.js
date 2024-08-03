const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf-8' });
/*The 'data' term itself cannot be changed because it is a predefined event name in Node.js streams. 
where as the the parameter chunk is just a variable name, can be aanything  xyz.....
*/
readStream.on('data', (chunk) => {
    console.log('---NEW CHUNK start---');
    console.log(chunk);
    console.log('---NEW CHUNK end---');
    
});

const writeStream = fs.createWriteStream('./docs/blog4.txt');

readStream.on('data',(chunk)=>{
    writeStream.write('\nNew Chunkstart\n');
    writeStream.write(chunk);
    writeStream.write('\nNew Chunkend\n');
});

// does the same work in less syntax
const writeStream2 = fs.createWriteStream('./docs/blog5.txt');

readStream.pipe(writeStream2);