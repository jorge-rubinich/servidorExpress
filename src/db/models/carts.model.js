import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    clientId: {type: String, required: true, maxlength: 50},
    products: [{
        product: {type: Schema.Types.ObjectId, ref: 'products'},
        quantity: {type: Number, default: 1}
    }]   
})

const cartModel = mongoose.model("carts", cartSchema) 

export default cartModel