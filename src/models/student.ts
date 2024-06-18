import mongoose from 'mongoose';

export interface IStudent extends mongoose.Document {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    dob: string
}


const StudentSchema = new mongoose.Schema({
    id: { type: Number },
    first_name: { type: String, require: true },
    last_name: { type: String, require: true },
    email: { type: String, require: true },
    dob: { type: String, require: true }
})


const Student = mongoose.model<IStudent>('Student', StudentSchema);
export default Student