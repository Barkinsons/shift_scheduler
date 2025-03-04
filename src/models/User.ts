import mongoose from "mongoose";

export interface Users extends mongoose.Document, mongoose.SchemaTimestampsConfig {
  name: string;
  email: string;
  pwHash: string;
  role: string;
}

const UserSchema = new mongoose.Schema<Users>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  pwHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "Employee"
  }
}, { timestamps: true });

export default mongoose.models.User || mongoose.model<Users>("User", UserSchema);