const express = require('express');
const morgan = require('morgan');

const app = express();


// register new engine
app.set('view engine', 'ejs');

// if thee folder has a different name than views.
// app.set('views','myviews');

app.listen(3000);


// middle waer and static files (which we will make public) 
app.use(express.static('public'));
//can use any file which is inside the public folder- 
// css used in - html header.ejs
//use link to access -- http://localhost:3000/styles.css
app.use(morgan('dev'));


//listen for request
app.get('/',(req,res)=>{
    //for html- 
    // res.send('<p>express</p>');
    // res.sendFile('./views/index.html',{root: __dirname});


    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];

      
    //for ejs-
    res.render('index' , {name: '-- this text is rendered through EJS --',blogs});
});


app.use((req,res , next)=>{
    console.log("new request..");
    console.log('host:',req.hostname);
    console.log('path:', req.path);
    console.log('method:', req.method);
    next();
});

app.use((req,res , next)=>{
    console.log('in the next middle ware ... ');
    next();
});


app.get('/about',(req,res)=>{
    // res.send('<p>express</p>');
    // res.sendFile('./views/about.html',{root: __dirname});


    res.render('about');
});

// redirect
// app.get('/about-me', (req,res)=>{
//     res.redirect('/about');
// } );


app.get('/blogs/create',(req,res)=>{
    res.render('create');
});



//404
//   .use function is used a s a middle-ware.
// use in last of file js compiles line by line.
app.use((req,res)=>{
    // not enough--
    // res.sendFile('./views/404.html',{root: __dirname});

    // enough-
    // res.status(404).sendFile('./views/404.html',{root: __dirname});
    res.status(404).render('404');
});
