import {Schema, model} from 'mongoose'

const collection="messages"

const chatSchema = new Schema({
    user: String,
    message: String,

},
{
    timestamps: true 
  }
)


const chatModel = model(collection, chatSchema)

export default chatModel