const express = require('express');
const Blog= require('../models/blog');


const blog_index = ((req,res)=>{
    //createAt:-1 means decending order of creation.
    Blog.find().sort({ createAt:-1})
    .then((result)=>{
        res.render( 'blogs/index', {titles:'All Blogs' , blogs: result});
    })
    .catch((err)=>{
        console.log(err);
    })
}) 

const blog_details = ((req,res)=>{
    const id = req.params.id;
    
    Blog.findById(id)
        .then(result=>{
            res.render('blogs/details',{blog:result})
        }) 
        .catch(err=>{
            res.status(404).render('404');
        })
})

const blog_create_get =((req,res)=>{
    res.render('blogs/create');
}) 

const blog_create_post =((req,res)=>{
    const blog= new Blog(req.body);

    blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((err)=>{
            console.log(err);
        })
}) 

const blog_create_delete =((req,res)=>{
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
}) 


module.exports = {
    blog_index , 
    blog_details, 
    blog_create_get,
    blog_create_post,
    blog_create_delete
}