const mongoose = require('mongoose');
// constructor function-
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type : String,
        required : true
    },
    snippet:{
        type : String,
        required : true
    },
    body:{
        type : String,
        required : true
    }
},  {Timestamp:true});

// automatically puralize this to blogs in our cluster collection-
const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;