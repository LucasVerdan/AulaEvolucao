import { Joi } from "celebrate";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"
@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  name: string;
  @Column()
  birth: Date;
  @Column()
  email: string;
  @Column()
  city: string;
}

export const StudentSchema = {
  id: Joi.number(),
  name: Joi.string().required(),
  birth: Joi.date().required(),
  email: Joi.string().required().email(),
  city: Joi.string().required(),
};

export const UpdateStudentSchema = {
  name: Joi.string().required(),
  birth: Joi.date().required(),
  email: Joi.string().required().email(),
  city: Joi.string().required(),
};
