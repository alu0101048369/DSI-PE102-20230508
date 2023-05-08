import { connect } from 'mongoose';
import { Student } from '../schemas/student.js';
import { Subject } from '../schemas/subject.js';

// Connect
await connect("mongodb://user:admin1@localhost:27018");

// Populate
const subjects = [
  {
    name: "SSI",
    description: "Seguridad en Sistemas Informáticos"
  },
  {
    name: "DSI",
    description: "Desarrollo de Sistemas Informáticos"
  },
  {
    name: "UyA",
    description: "Usabilidad y Accesibilidad"
  }
].map(subject => new Subject(subject))

const savedSubjects = []
for (const subject of subjects) {
  savedSubjects.push(await subject.save())
}

const students = [
  {
    name: "Miguel",
    lastname: "Dorta Rodríguez",
    age: 24,
    email: "me@migueldorta.com",
    subjects: [savedSubjects[0]._id, savedSubjects[1]._id, savedSubjects[2]._id]
  },
  {
    name: "Pepito",
    lastname: "Perez",
    age: 20,
    email: "pepitoperez@ull.es",
    subjects: [savedSubjects[1]._id]
  },
  {
    name: "John",
    lastname: "Doe",
    age: 99,
    email: "johndoe@example.com",
    subjects: [savedSubjects[1]._id, savedSubjects[2]._id]
  }
].map(student => new Student(student))

const savedStudents = []
for (const student of students) {
  savedStudents.push(await student.save())
}

// Get all students
for (const doc of await Student.find({})) {
  console.log(`Nombre: ${doc.name} | Apellidos: ${doc.lastname} | Edad: ${doc.age} años | Email: ${doc.email} | IDs de Asignaturas: ${doc.subjects}`)
}

// Get student by email
const johndoe = await Student.findOne({email: "johndoe@example.com"})
if (!johndoe) {
  throw new Error("John Doe Not Found");
}
console.log(`Nombre: ${johndoe.name} | Apellidos: ${johndoe.lastname} | Edad: ${johndoe.age} años | Email: ${johndoe.email} | IDs de Asignaturas: ${johndoe.subjects}`)

// Update student
johndoe.age = 21
await johndoe.save()

// Delete by email
johndoe.deleteOne()

// Get all subjects
for (const doc of await Subject.find({})) {
  console.log(`Nombre: ${doc.name} | Descripción: ${doc.description}`)
}

// Find subject by id
const dsi = await Subject.findById(savedSubjects[1].id)
if (!dsi) {
  throw new Error("DSI not found");
}
console.log(`Nombre: ${dsi.name} | Descripción: ${dsi.description}`)

// Update subject
dsi.description = "Desarrollo de Sistemas Informáticos!!!"
await dsi.save()

// Delete by ID
dsi.deleteOne()

// Get students in all subjects
for (const subject of await Subject.find({})) {
  console.log(`Alumnos de la asignatura ${subject.description}`)
  for (const student of await Student.find({subjects: subject._id})) {
    console.log(`- ${student.name} ${student.lastname}`)
  }
}

// Cleanup
for (const student of await Student.find({})) {
  student.deleteOne()
}
for (const subject of await Subject.find({})) {
  subject.deleteOne()
}
