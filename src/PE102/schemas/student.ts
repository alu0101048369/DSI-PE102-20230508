import { Document, model, ObjectId, Schema, Types } from 'mongoose'
import validator from 'validator'

export interface StudentInterface extends Document {
  name: string
  lastname: string
  age: number
  email: string
  subjects: ObjectId[]
}

export const StudentSchema = new Schema<StudentInterface> ({
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: validator.default.isEmail
  },
  subjects: {
    type: [Types.ObjectId],
    required: true,
  }
})

export const Student = model<StudentInterface>("students", StudentSchema)
