import * as mongoose from 'mongoose';
import express from "express";
import studentEndPoints from './src/routes/student';

const app = express()
const PORT = 8000
const uri = '*********************************'

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