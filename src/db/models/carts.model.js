import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({

    email: {type: String, required: true, maxlength: 100},
    products: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'products'},
        quantity: {type: Number, default: 1}
    }]   
})

const cartModel = mongoose.model("carts", cartSchema) 

export default cartModel