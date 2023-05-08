import { Request, Response } from "express"
import { Subject } from "../schemas/subject.js"

export async function addSubject(req: Request, resp: Response) {
  await new Subject(req.body).save()
  resp.status(201).send("Created")
}

export async function getAllSubjects(req: Request, resp: Response) {
  const parsedSubjects = []
  for (const subject of await Subject.find({})) {
    parsedSubjects.push({
      id: subject.id,
      name: subject.name,
      description: subject.description
    })
  }
  resp.send(parsedSubjects)
}

export async function getSubjectById(req: Request, resp: Response) {
  if (typeof req.params.id !== "string") {
    resp.status(400).send("Bad request")
    return
  }
  const subject = await Subject.findById(req.params.id)
  if (!subject) {
    resp.status(404).send("Not found")
    return
  }
  resp.send({
    id: subject.id,
    name: subject.name,
    description: subject.description
  })
}

export async function deleteSubject(req: Request, resp: Response) {
  if (typeof req.params.id !== "string") {
    resp.status(400).send("Bad request")
    return
  }
  const subject = await Subject.findById(req.params.id)
  if (!subject) {
    resp.status(404).send("Not found")
    return
  }
  subject.deleteOne()
  resp.send("Deleted")
}
