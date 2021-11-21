const router = require('express').Router()
const Category = require('../models/category')

router.post('/', async(req, res)=>{
    try{
        const category = new Category(req.body)
        await category.save()
        res.send(category)
    } catch (e){
        res.status(400).json()
    }
})

// Carts page
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const category = await Category.findById(id)
        
        await category.populate({
            path: 'books',
            select: 'author title description price rate comments'
        })

        res.json(category.books)
    } catch (e) {
        res.status(500).json()
    }
})

router.get('/',async (req, res)=>{
    try{
        const categories = await Category.find()
        res.send(categories)
    } catch (e) {
        res.status(404).json()
    }
})

module.exports = router