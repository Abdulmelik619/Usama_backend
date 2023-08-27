import * as mongoose from 'mongoose';


export class Abscent {
  constructor(
    public id: string,
    public student_id: string,
    public class_id: string,
    public date: string,
    ) {}
  }
  
  export const abscentSchema = new mongoose.Schema({
    student_id: { type: String, },
    class_id: {type: String},
    date: {type: String},
  });