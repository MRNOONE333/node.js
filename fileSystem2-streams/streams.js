const fs = require('fs');

const readStream = fs.createReadStream('./docs/blog3.txt', { encoding: 'utf-8' });

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