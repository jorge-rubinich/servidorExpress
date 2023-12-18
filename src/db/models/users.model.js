import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    
        first_name: {type: String, required: true, maxlength: 50},
        last_name: {type: String, required: true, maxlength: 50},
        email: {type: String, required: true, maxlength: 100, unique: true},
        password: {type: String, required: true, maxlength: 100},
        role: {type: String, default: "user", maxlength: 15},
        timestamp: {type: Date, default: Date.now()},
        Age: {type: Number, required: true, maxlength: 3}
}
)

const userModel = mongoose.model("users", userSchema)  

export default userModel