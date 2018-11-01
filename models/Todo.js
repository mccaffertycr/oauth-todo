const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoSchema = new Schema({
    title: String,
    notes: [],
    completed: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
});

mongoose.model('todo', todoSchema);
