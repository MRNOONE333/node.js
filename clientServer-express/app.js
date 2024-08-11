const express = require('express');
const morgan = require('morgan');

const app = express();
const mongoose = require('mongoose');
// import Blog which has blogSchema  -
const Blog = require('./models/blog');
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



app.get('/add-blog' , (req,res)=>{
    // instance blog of collection Blog------
    const blog = new Blog({
        title:'new blog-1',
        snippet:'my second blog',
        body:'blog data2 -blog data2 -blog data2 -blog data2 -blog data2 - '
    });

    // async task-
    blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    });
});
// The MongoDB connection URL used in the code (e.g., 'mongodb://user100:test100@newcluster-shard-00-00.fjctl.mongodb.net:27017,...') connects to a MongoDB cluster using the provided credentials. Since no specific database name is included in the URL, MongoDB will default to using the 'test' database. If a new collection is created (like 'Blog' in this code), and the database does not exist yet, MongoDB will automatically create that database (likely 'test') along with the new collection when the first document is inserted (e.g., through blog.save()).

// The MongoDB connection URL (e.g., mongodb://user100:test100@newcluster-shard-00-00.f......) includes the username and password for authentication. If no database name is specified in the URL, MongoDB connects to the default 'test' database. However, MongoDB does not automatically create a new database or collection based on the URL alone; a new database is only created when you explicitly perform an operation, such as inserting a document, in a non-existent database.


// see = http://localhost:3000/all-blog
app.get('/all-blog',(req,res)=>{
    Blog.find()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });
});

// specific blog
// see = http://localhost:3000/single-blog
app.get('/single-blog',(req,res)=>{
    Blog.findById('66b5c550f99a0d86099f6e8d')
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });
});


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

app.get('/blogs',(req,res)=>{
    //createAt:-1 means decending order of creation.
    Blog.find().sort({ createAt:-1})
        .then((result)=>{
            res.render( 'index', {titles:'All Blogs' , blogs: result});
        })
        .catch((err)=>{
            console.log(err);
        })
});

app.post('/blogs',(req,res)=>{
    const blog= new Blog(req.body);

    blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((err)=>{
            console.log(err);
        })
});


app.get('/blogs/create',(req,res)=>{
    res.render('create');
});

app.get('/blogs/:id',(req,res)=>{
    const id = req.params.id;
    
    Blog.findById(id)
        .then(result=>{
            res.render('details',{blog:result})
        }) 
        .catch(err=>{
            console.log(err);
        })
});



app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
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
