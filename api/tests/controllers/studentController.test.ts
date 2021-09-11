import app from "..";
import supertest from "supertest";
import { StatusCodes } from "http-status-codes";

describe("Test student requests", () => {
  it("should return the example student", async () => {
    await supertest(app)
      .get("/students")
      .expect(200)
      .then((res) =>
        expect(res.body).toMatchObject([
          {
            id: 1,
            name: "John Doe",
            email: "john.doe@example.com",
            city: "Belo Horizonte",
            birth: new Date("11/13/1999").toISOString(),
          },
        ])
      );
  });

  it("should create a new student", async () => {
    const newStudent = {
      name: "John Doe 2",
      email: "john.doe.2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .post("/students")
      .send(newStudent)
      .then((res) => expect(res.body).toMatchObject({ id: 2, ...newStudent }));
  });

  it("should update a existent student", async () => {
    const studentToUpdate = {
      id: 1,
      name: "lucas teste",
      email: "lucas2@example.com",
      city: "Belo Horizonte",
      birth: new Date("11/13/1999").toISOString(),
    };

    await supertest(app)
      .put("/students/update")
      .send(studentToUpdate)
      .then((res) => expect(res.body).toMatchObject({ ...studentToUpdate }));
  });
  it("should delete a existent student", async () => {
    const studentIdToDelete = {
      id: 1,
    };

    await supertest(app)
      .delete("/students/delete")
      .send(studentIdToDelete)
      .then((res) => expect(res.statusCode).toBe(StatusCodes.ACCEPTED));
  });
});
