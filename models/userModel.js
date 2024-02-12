const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: [true, "Please add your username"]
    },
    
    password: {
        type: String,
        required: [true, "Please add a password"],
        minLength: [6, "Password must be up to 6 characters"]
    },

    role: [{
        type: String,
        required: [true],
        default: "Employee",
        // enum: ["Employee", "Admin", "Manager"]
    }], 
    
},
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema);

module.exports = User;