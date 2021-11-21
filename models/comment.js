const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    // ownerId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // },
    ownerName: {
        type: String,
        required: true,
        ref: 'User'
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment
