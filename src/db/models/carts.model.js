import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({

    email: {type: String, required: true, maxlength: 100},
    products: [{
        product: {type: mongoose.SchemaTypes.ObjectId, ref: 'products'},
        quantity: {type: Number, default: 1},
        _id: false
    }]   
})

const cartModel = mongoose.model("carts", cartSchema) 

export default cartModel