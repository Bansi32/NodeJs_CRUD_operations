const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        minlength:3
    },
    username: {
        type: String,
        required: true,
        unique: [true, "Username already present"]
    },
    password: {
        type: String,
        require:true
    }
});

const User = new mongoose.model('User', userSchema);

module.exports = User;