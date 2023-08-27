import * as mongoose from 'mongoose';


export class Class {
  constructor(
    public id: string,
    public className: string,
    public dateCreated: string,
    public assignedTeacherId: string,
    ) {}
  }
  
  export const classSchema = new mongoose.Schema({
    className: { type: String, },
    dateCreated: {type: String},
    assignedTeacherId: {type: String},
  });