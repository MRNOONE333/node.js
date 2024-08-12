const express = require('express');

const blogController = require('../controllers/blogControlller');

const router = express.Router();



// not in use any more
// app.get('/add-blog' , (req,res)=>{
//     // instance blog of collection Blog------
//     const blog = new Blog({
//         title:'new blog-1',
//         snippet:'my second blog',
//         body:'blog data2 -blog data2 -blog data2 -blog data2 -blog data2 - '
//     });

//     // async task-
//     blog.save()
//     .then((result)=>{
//         res.send(result)
//     })
//     .catch((err)=>{
//         console.log(err);
//     });
// });
// The MongoDB connection URL used in the code (e.g., 'mongodb://user100:test100@newcluster-shard-00-00.fjctl.mongodb.net:27017,...') connects to a MongoDB cluster using the provided credentials. Since no specific database name is included in the URL, MongoDB will default to using the 'test' database. If a new collection is created (like 'Blog' in this code), and the database does not exist yet, MongoDB will automatically create that database (likely 'test') along with the new collection when the first document is inserted (e.g., through blog.save()).

// The MongoDB connection URL (e.g., mongodb://user100:test100@newcluster-shard-00-00.f......) includes the username and password for authentication. If no database name is specified in the URL, MongoDB connects to the default 'test' database. However, MongoDB does not automatically create a new database or collection based on the URL alone; a new database is only created when you explicitly perform an operation, such as inserting a document, in a non-existent database.


// not in use any more
// see = http://localhost:3000/all-blog
// app.get('/all-blog',(req,res)=>{
//     Blog.find()
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{
//             console.log(err);
//         });
// });


// not in use any more
// specific blog
// see = http://localhost:3000/single-blog
// app.get('/single-blog',(req,res)=>{
//     Blog.findById('66b5c550f99a0d86099f6e8d')
//         .then((result)=>{
//             res.send(result);
//         })
//         .catch((err)=>{
//             console.log(err);
//         });
// });





// router.use((req,res , next)=>{
//     console.log("new request..");
//     console.log('host:',req.hostname);
//     console.log('path:', req.path);
//     console.log('method:', req.method);
//     next();
// });

// router.use((req,res , next)=>{
//     console.log('in the next middle ware ... ');
//     next();
// });




// redirect
// app.get('/about-me', (req,res)=>{
//     res.redirect('/about');
// } );

router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/create',blogController.blog_create_get);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_create_delete);


module.exports  = router;