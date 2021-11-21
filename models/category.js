const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        min: [10, 'minimum length is 10 characters'],
        max: [200, 'maximum length is 200 characters']
    }
})

// Set relations between this and books
categorySchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'category'
})

const Category = mongoose.model('Category', categorySchema)

module.exports = Category