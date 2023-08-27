import * as mongoose from 'mongoose';


export class Ustaz {
  constructor(
    public id: string,
    public fullName: string,
    public email: string,
    public classId: string,
    public hash: string,
    public hashedRt: string ,
    public avatar: string,
    public role: string,
    ) {}
  }
  
  export const ustazSchema = new mongoose.Schema({
    fullName: { type: String },
    email: { type: String, unique: true },
    classId: { type: String, },
    hash: { type: String },
    hashedRt: { type: String },
    avatar: {type: String},
    role: { type: String },
  });