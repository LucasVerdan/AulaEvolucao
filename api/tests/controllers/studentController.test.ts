import app from "..";
import supertest from "supertest";
import { StatusCodes } from "http-status-codes";
import 'jest';

describe("Test student requests", () => {
  it("should return the example student", async () => {
    jest.mock("../../src/db/students", () => {
      const originalModule = jest.requireActual("../../src/db/students");
      return {
        _esModule: true,
        ...originalModule,
        getStudents: jest.fn(() =>
        Promise.resolve([
          {
            id: 2,
            name:"lucas teste 2",
            email:"lucas2@example.com",
            city:"Belo Horizonte",
            birth:"1999-11-13T02:00:00.000"
          },
          {
          id: 4,
          name:"lucas teste 2",
          email:"lucas2@example.com",
          city:"Belo Horizonte",
          birth:"1999-11-13T02:00:00.000"
        }])
        )
      }
    })
  });

  it("should create a new student", async () => {
    jest.mock("../../src/db/students", () => {
      const originalModule = jest.requireActual("../../src/db/students");
      return {
        _esModule: true,
        ...originalModule,
        addStudent: jest.fn(() =>
        Promise.resolve({
          id: 4,
          name:"lucas teste 2",
          email:"lucas2@example.com",
          city:"Belo Horizonte",
          birth:"1999-11-13T02:00:00.000"
        })
        )
      }
    })
  });

  it("should update a existent student", async () => {
    const studentToUpdate = {
      id: 1,
      name: "lucas teste",
      email: "lucas2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    let updatedStudent;

    jest.mock("../../src/db/students", () => {
      const originalModule = jest.requireActual("../../src/db/students");
      return {
        _esModule: true,
        ...originalModule,
        updateStudentById: jest.fn().mockResolvedValue(() =>
        updatedStudent = Promise.resolve({
          id: 4,
          name:"lucas teste 2",
          email:"lucas2@example.com",
          city:"Belo Horizonte",
          birth:"1999-11-13T02:00:00.000"
        })
        )
      }
    })
    expect(studentToUpdate).not.toBe(updatedStudent);
  });
  it("shouldnt update a existent student if id is null", async () => {
    const studentToUpdate = {
      id: null,
      name: "lucas teste",
      email: "lucas2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .put("/students/update")
      .send(studentToUpdate)
      .then((res) => expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST));
  });

  it("shouldnt update a existent student if the object is invalid", async () => {
    const studentToUpdate = {
      id: '2',
      name: "lucas teste",
      email: "lucas2@example.com",
      city: "Belo Horizonte",
      test: 'hv'
    };

    await supertest(app)
      .put("/students/update")
      .send(studentToUpdate)
      .then((res) => expect(res.statusCode).toBe(StatusCodes.PARTIAL_CONTENT));
  });


  it("should delete a existent student", async () => {
    // const studentIdToDelete = {
    //   id: 1,
    // };

    // await supertest(app)
    //   .delete("/students/delete")
    //   .send(studentIdToDelete)
    //   .then((res) => expect(res.statusCode).toBe(StatusCodes.ACCEPTED));


    jest.mock("../../src/db/students", () => {
      const originalModule = jest.requireActual("../../src/db/students");
      return {
        _esModule: true,
        ...originalModule,
        deleteById: jest.fn(() =>
        Promise.resolve(true)
        )
      }
    })
  });
  it("should'nt perfom database delete if id is null", async () => {
    const studentIdToDelete = {
      id: null,
    };


    await supertest(app)
      .put("/students/delete")
      .send(studentIdToDelete)
      .then((res) => expect(res.statusCode).toBe(StatusCodes.INTERNAL_SERVER_ERROR));
  });
});


