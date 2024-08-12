const express = require('express');
const morgan = require('morgan');
const blogRoutes = require('./routes/blogRoutes');
const app = express();
const mongoose = require('mongoose');

const { result } = require('lodash');
const { render } = require('ejs');

// connect mongo DB-
const dbURI = 'mongodb://user100:test100@newcluster-shard-00-00.fjctl.mongodb.net:27017,newcluster-shard-00-01.fjctl.mongodb.net:27017,newcluster-shard-00-02.fjctl.mongodb.net:27017/?ssl=true&replicaSet=atlas-1idhaz-shard-0&authSource=admin&retryWrites=true&w=majority&appName=newcluster';
//  mongodb://user100:<password>@newcluster-shard-00-00.fjctl.mongodb.net:27017,newcluster-shard-00-01.fjctl.mongodb.net:27017,newcluster-shard-00-02.fjctl.mongodb.net:27017/?ssl=true&replicaSet=atlas-1idhaz-shard-0&authSource=admin&retryWrites=true&w=majority&appName=newcluster

mongoose.connect(dbURI,  { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('<<<>>>>Connected to MongoDB'))
  .catch(err => console.log('---------??????????-----Failed to connect to MongoDB', err));
// if the above shows failed to connect whitelist IP to - 0.0.0.0/0

//register new engine
app.set('view engine', 'ejs');

// if thee folder has a different name than views.
// app.set('views','myviews');

app.listen(3000);


// middle ware and static files (which we will make public) 
app.use(express.static('public'));
//can use any file which is inside the public folder- 
// css used in - html header.ejs
//use link to access -- http://localhost:3000/styles.css
app.use(morgan('dev'));
// for updation on mongo
app.use(express.urlencoded({ extended: true }));


//listen for request
app.get('/',(req,res)=>{
    //for html- 
    // res.send('<p>express</p>');
    // res.sendFile('./views/index.html',{root: __dirname});

    // commenting it now bcz not required any more -  passing data from mongo-DB 
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];

      
    //for ejs-
    // res.render('index' , {name: '-- this text is rendered through EJS --',blogs});

    res.redirect('/blogs');

});

app.get('/about',(req,res)=>{
    // res.send('<p>express</p>');
    // res.sendFile('./views/about.html',{root: __dirname});


    res.render('about');
});

// blogs routes- 
app.use('/blogs',blogRoutes);


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
