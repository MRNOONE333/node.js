const express = require('express');

const app = express();


// register new engine
app.set('view engine', 'ejs');

// if thee folder has a different name than views.
// app.set('views','myviews');

app.listen(3000);




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
    res.render('index' , {name: '-- this text is rendered through EJS --'}, blogs);
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
// use in last of file js compiles line by line.
app.use((req,res)=>{
    // not enough--
    // res.sendFile('./views/404.html',{root: __dirname});

    // enough-
    // res.status(404).sendFile('./views/404.html',{root: __dirname});
    res.status(404).render('404');
});
