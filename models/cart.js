const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cartSchema = new Schema({
    userId: {
        type: string,
        required: true
    },
    books: [{
        bookId: {
            type: String
        },
        quantity: {
            type: Number,
            default: 1
        }
    }]
},{
    timestamps: true
})