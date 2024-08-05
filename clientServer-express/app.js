const express = require('express');

const app = express();

app.listen(3000);

//listen for request
app.get('/',(req,res)=>{
    // res.send('<p>express</p>');
    res.sendFile('./views/index.html',{root: __dirname});
});

app.get('/about',(req,res)=>{
    // res.send('<p>express</p>');
    res.sendFile('./views/about.html',{root: __dirname});
});

// redirect
app.get('/about-me', (req,res)=>{
    res.redirect('/about');
} );


// 404
//use in last of file js compiles line by line.
app.use((req,res)=>{
    // not enough--
    // res.sendFile('./views/404.html',{root: __dirname});

    // enough-
    res.status(404).sendFile('./views/404.html',{root: __dirname});
});
