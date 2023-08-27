import * as mongoose from 'mongoose';


export class Student {
  constructor(
    public id: string,

    public fullName: string,
    public email: string,
    public country: string,
    public sex: string,
    public kirat_type: string,
    public hash: string,
    public hashedRt: string ,
    public surah_name: string,
    public ayah_number: number,
    public role: string,
    public classId: string,
    public isSaved: boolean, 
    public isPresent: boolean, 
    public avatarUrl: string,
    ) {}
  }
  
  export const studentSchema = new mongoose.Schema({
    fullName: { type: String },
    email: { type: String, unique: true },                  
    country: {type: String},
    sex: {type: String},
    kirat_type: {type: String},
    hash: { type: String },
    hashedRt: { type: String },
    surah_name: { type: String },
    ayah_number: {type: Number},
    role: { type: String },
    classId: {type: String},
    isSaved: {type: Boolean},
    isPresent: {type: Boolean},
    avatarUrl: {type: String},
  });