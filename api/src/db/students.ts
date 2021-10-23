import { Student } from "../entities/Student";

import { getConnection } from "typeorm";

const students: Student[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    city: "Belo Horizonte",
    birth: new Date("11/13/1999"),
  },
];

/**
 * Add new student to list
 * @param student New student
 * @returns new student
 */
  async function addStudent(student: Student) {
  // const newStudent = {
  //   id: students.length ? students[students.length - 1].id! + 1 : 1,
  //   ...student,
  // };
  const newStudent = new Student();
  newStudent.name = student.name;
  newStudent.email = student.email;
  newStudent.city = student.city;
  newStudent.birth = student.birth;

  const repository = getConnection().getRepository(Student);
  const createdStudent = await repository.save(newStudent);

  // students.push(Object.freeze(newStudent));
  return createdStudent;
}

/**
 * Returns student list
 * @returns Students
 */
const getStudents = () => getConnection().getRepository(Student).find();

const updateStudentById = async (studentToUpdate: Student) => { 
  // const index = students.g
  const repository = getConnection().getRepository(Student);
  
  const updatedStudent = await repository.save(studentToUpdate);

  return updatedStudent;
};

const deleteById = async (studentId: string) => { 
  // const studentIndex = students.findIndex((student) => student.id === studentId);
  // students.splice(studentIndex, 1);

  const repository = getConnection().getRepository(Student);
  const deletedStudent = await repository.delete(studentId);
  return deletedStudent;
};


export { addStudent, getStudents, updateStudentById, deleteById };
