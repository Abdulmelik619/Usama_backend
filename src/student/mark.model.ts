import * as mongoose from 'mongoose';


export class Mark {
  constructor(
    public id: string,
    public student_id: string,
    public date: String,
    public score: number,
    public end_ayah: number,
    public end_surah: string,
    ) {}
  }
  
  export const markSchema = new mongoose.Schema({
    student_id: { type: String, },
    date: {type: String},
    score: {type: Number},
    end_ayah: {type: Number},
    end_surah: {type: String},
  });