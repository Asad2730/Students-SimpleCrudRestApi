import { type Request, type Response } from 'express';
import Student, { type IStudent } from '../models/student';
import mongoose from 'mongoose';



//we have 100 records now we cant really send them all at once
//so we will use pagination (limit and skip)
//if somebody is requesting localhost:8000/api/students then page = 0
//localhost:8000/api/students = localhost:8000/api/students?p=0

export const getStudents = async (req: Request, res: Response) => {
    try {

        const page = req.query.p as any || 0;
        const studentsPerPage = 10
        let students = await Student.find()
            .sort({ id: 1 })
            .skip(parseInt(page) * studentsPerPage)
            .limit(studentsPerPage)

        res.status(200).json(students)
    } catch (ex) {
        res.status(500).json({ message: `Error getting students ${ex}` })
    }
}



export const getStudentById = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id)

        if (!isNaN(id)) {
            let student = await Student.findOne({ id: id })
            !student ? res.status(404).json('Student not found') : res.status(200).json(student)
        } else {
            res.status(400).json({ error: 'id must be a number' })
        }
    } catch (ex) {
        res.status(500).json({ message: `Error getting student ${ex}` })
    }
}

export const createStudent = async (req: Request, res: Response) => {
    try {
        const student: IStudent = req.body
        const count = await Student.countDocuments()
        await Student.create({

            id: count + 1,
            first_name: student.first_name,
            last_name: student.last_name,
            email: student.email,
            dob: student.dob

        })


        res.status(201).json('created new student record!')
    } catch (ex) {
        res.status(500).json({ message: `Error creating student ${ex}` })
    }
}



export const updateStudent = async (req: Request, res: Response) => {
    try {
        let id:any = req.params.id
        let updates = req.body
        if (mongoose.Types.ObjectId.isValid(id))  {
            const objectId = new mongoose.Types.ObjectId(id)
            const student = await Student.findOneAndUpdate(
                 objectId,
                { $set: updates },
                { new: true, runValidators: true }
            )
            !student ? res.status(404).json('Student not found') : res.status(200).json(student)
        } else {
            res.status(400).json({ error: 'Invalid id format' })
        }
    } catch (ex) {
        res.status(500).json({ message: `Error updating student ${ex}` })
    }
}


export const deleteStudent = async (req: Request, res: Response) => {
    try {
        let id: any = req.params.id
        if (mongoose.Types.ObjectId.isValid(id)) {
            const objectId = new mongoose.Types.ObjectId(id);
            const result = await Student.deleteOne(objectId)
            result.deletedCount === 0 ? res.status(404).json('Student not found') : res.status(204).json(`student record delete were id was ${id}`)
        } else {
            res.status(400).json({ error: 'Invalid id format' })
        }
    } catch (ex) {
        res.status(500).json({ message: `Error deleting student ${ex}` })
    }
}













