import { Document, model, Schema } from 'mongoose'

export interface SubjectInterface extends Document {
  name: string
  description: string
}

export const SubjectSchema = new Schema<SubjectInterface> ({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
})

export const Subject = model<SubjectInterface>("subjects", SubjectSchema)
