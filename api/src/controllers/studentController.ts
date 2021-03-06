import * as StudentsDB from "../db/students";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {validateUpdateObject } from '../utils';

export class StudentsController {
  async get(_: Request, res: Response) {
    const students = await StudentsDB.getStudents();

    return res.status(StatusCodes.OK).json(students);
  }

  async create(req: Request, res: Response) {
    const newStudent = await StudentsDB.addStudent(req.body);

    return res.status(StatusCodes.CREATED).json(newStudent);
  }

  async update(req: Request, res: Response) {
    if(req.body.id === null) return res.status(StatusCodes.BAD_REQUEST).json();

    if(!validateUpdateObject(req.body)) return res.status(StatusCodes.PARTIAL_CONTENT).json();

     const updatedStudent = await StudentsDB.updateStudentById(req.body);

    return res.status(StatusCodes.CREATED).json(updatedStudent);
  }

  async delete(req: Request, res: Response) {

     await StudentsDB.deleteById(req.body.id);

    return res.status(StatusCodes.ACCEPTED).json();
  }
}
