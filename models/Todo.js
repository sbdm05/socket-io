const mongoose = require('mongoose'); 

// structure
const TodoSchema = new mongoose.Schema({
    name: {
        type:String, 
        required: [true, "Requis"], 
        trim: true,
        maxlength: [20, 'ne doit pas dépasser 20 caractères']
    }, 
    completed: {
        type: Boolean, 
        default: false
    }
})

module.exports = mongoose.model('Todo', TodoSchema)