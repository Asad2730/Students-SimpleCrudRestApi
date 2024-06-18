import * as mongoose from 'mongoose';
import express from "express";
import studentEndPoints from './src/routes/student';

const app = express()
const PORT = 8000
const uri = 'mongodb+srv://asad:123@cluster0.yvrgnu3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/test'

async function start(){
    try{    
    await mongoose.connect(uri)    
    app.use(express.json())
    app.use('/api/students',studentEndPoints)
    app.listen(PORT,()=>console.log(`Server Running on port ${PORT}`))
    }catch(ex){
      console.error(`Failed to establish connection with MongoDb ${ex}`)
    }
}

start()