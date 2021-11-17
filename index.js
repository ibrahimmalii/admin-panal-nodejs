//=============================================== Declare Variables =============================//
const express = require('express');
const app = express();
require('./db/mongoose');
const chalk = require('chalk');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')
const cors = require('cors')
const path = require('path')

dotenv.config()
const port = process.env.port || 8080;



var dir = path.join(__dirname, 'public');

app.use(express.static(dir));




//============================================== import routes =================================//
const authRouter = require('./routes/auth')
const userRoute = require('./routes/user')
const mediciceRouter = require('./routes/medicen')



//********Middle wares********//
app.use(cors())
app.use(express.json())
app.use(bodyParser())
app.use('/api/auth', authRouter)
app.use('/api/users', userRoute)
app.use('/api/medicine', mediciceRouter)

const multer = require('multer')
const upload = multer({
    dest: 'images'
})

app.post('/upload', upload.single('image'), (req, res)=>{
    console.log(req.file)
    res.send()
})  



//=============================================== Connect To Server ===========================//
app.listen(port, ()=>console.log(chalk.bold.green.inverse('Server is up on Port', port)));
