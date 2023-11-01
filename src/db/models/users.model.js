import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    
        first_name: {type: String, required: true, maxlength: 50, unique: true},
        last_name: {type: String, required: true, maxlength: 50},
        email: {type: String, required: true, maxlength: 100},
        password: {type: String, required: true, maxlength: 20, unique: true},
        role: {type: String, default: "user", maxlength: 100},
        timestamp: {type: Date, default: Date.now()}

})

const userModel = mongoose.model("users", userSchema)  

export default userModel