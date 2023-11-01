import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
    
    title: {type: String, required: true, maxlength: 50, unique: true},
    description: {type: String, required: true, maxlength: 100},
    code: {type: String, required: true, maxlength: 14, unique: true},
    thumbnails: {type: String, required: true, maxlength: 100},
    category: {type: String, required: true, maxlength: 50},
    price: {type: Number, required: true},
    status: {type: Boolean, default: true, maxlength: 50},
    stock: {type: Number, default: 0},
    timestamp: {type: Date, default: Date.now()}
})
productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model("products", productSchema)  

export default productModel