import mongoose from "mongoose";

export interface Shifts
  extends mongoose.Document,
    mongoose.SchemaTimestampsConfig {
  date: Date;
  startTime: string;
  endTime: string;
  assignedEmployees: string[];
  location: string;
}

const ShiftSchema = new mongoose.Schema<Shifts>(
  {
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    assignedEmployees: {
      type: [String],
      required: true,
      default: [],
    },
    location: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Shift ||
  mongoose.model<Shifts>("Shift", ShiftSchema);
