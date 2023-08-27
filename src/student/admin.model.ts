import * as mongoose from 'mongoose';


export class Admin {
  constructor(
    public id: string,
    public email: string,
    public hash: string,
    public hashedRt: string ,
    public role: string,
    ) {}
  }
  
  export const adminSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    hash: { type: String },
    hashedRt: { type: String },
    role: { type: String },
  });