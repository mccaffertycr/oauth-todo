const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    todo: String,
    notes: [{ 
      note: {type: String}, 
      timestamp: { 
        type: Date, 
        default: Date.now() 
      }
    }],
    completed: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('todo', todoSchema);
