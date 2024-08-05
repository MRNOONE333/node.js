const http = require('http');
const fs= require('fs');
const _ = require('lodash');

///lodash start
const num = _.random(0,15);
console.log(num);

const greet = _.once(()=>{
    console.log('hello once');
})

greet();
greet();
greet();
///lodash end



const server = http.createServer((req,res)=>{
    console.log(req.url,req.method);

    //set header
    // C must be capital here Content-Type or Content-type. 
    res.setHeader('Content-Type', 'text/html');

    // send response
    // res.write('<h1>done this before</h1>');
    // res.write('<u></p>done before</p><u>');



    //set routing path-
    let path= './views/';
    switch(req.url){
        case '/':
            path+='index.html';
            res.statusCode = 200;
            break;
        case '/about':
            path+='about.html';   
            res.statusCode = 200;
            break;

        // redirect
        case '/about-blah':
            res.statusCode = 301;
            res.setHeader('location','/about');
            res.end();
            break;

        default :
            path+= '404.html';
            res.statusCode = 404;
            break; 
    }

    // send HTML file as response

    // for one html file
    //fs.readFile('./views/index.html',(err,data)=>{
    
    // for routing-
        fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            //use if multiple things to be written
            //res.write(data); 
            //res.end();
            
            //or

            res.end(data);

        }
    })
});

server.listen(8000,'localhost',()=>{
    console.log('listning server on port 8000');
});``