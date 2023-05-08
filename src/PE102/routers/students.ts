import { Request, Response } from "express"
import { Student } from "../schemas/student.js"

export async function add(req: Request, resp: Response) {
  await new Student(req.body).save()
  resp.status(201).send("Created")
}

export async function getAll(req: Request, resp: Response) {
  const parsedStudent = []
  for (const student of await Student.find({})) {
    parsedStudent.push({
      id: student.id,
      name: student.name,
      lastname: student.lastname,
      age: student.age,
      email: student.email,
      subjects: student.subjects
    })
  }
  resp.send(parsedStudent)
}

export async function getByEmail(req: Request, resp: Response) {
  if (typeof req.params.email !== "string") {
    resp.status(400).send("Bad request")
    return
  }
  const student = await Student.findOne({email: req.params.email})
  if (!student) {
    resp.status(404).send("Not found")
    return
  }
  resp.send({
    id: student.id,
    name: student.name,
    lastname: student.lastname,
    age: student.age,
    email: student.email,
    subjects: student.subjects
  })
}

export async function deleteByEmail(req: Request, resp: Response) {
  if (typeof req.params.email !== "string") {
    resp.status(400).send("Bad request")
    return
  }
  const student = await Student.findOne({email: req.params.email})
  if (!student) {
    resp.status(404).send("Not found")
    return
  }
  student.deleteOne()
  resp.send("Deleted")
}
