import express from 'express';
import { createStudent, deleteStudent, getStudentById, getStudents, updateStudent } from '../controllers/student';
const studentEndPoints = express.Router()


studentEndPoints.get('/',getStudents)
studentEndPoints.post('/',createStudent)
studentEndPoints.get('/:id',getStudentById)
studentEndPoints.patch('/:id',updateStudent)
studentEndPoints.delete('/:id',deleteStudent)

export default studentEndPoints;