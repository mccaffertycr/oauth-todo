const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    facebookId:String,
    todos: [{ type: Schema.Types.ObjectId, ref: 'todo' }]
});

module.exports = mongoose.model('user', userSchema);
