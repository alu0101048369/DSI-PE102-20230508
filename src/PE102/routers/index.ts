import express from "express"
import { add, deleteByEmail, getAll, getByEmail } from "./students.js"
import { addSubject, deleteSubject, getAllSubjects, getSubjectById } from "./subjects.js"

const app = express()
app.use(express.json())

app.delete("/students/:email", deleteByEmail)
app.get("/students/:email", getByEmail)
app.post("/students", add)
app.get("/students", getAll)

app.delete("/subjects/:id", deleteSubject)
app.get("/subjects/:id", getSubjectById)
app.post("/subjects", addSubject)
app.get("/subjects", getAllSubjects)

app.all("*", (_, resp) => resp.status(404).send({error: "Not Found: Endpoint or Method"}))

app.listen(12345)
