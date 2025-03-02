import mongoose from "mongoose";
import dbConnect from "@/lib/db";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    passwordHash: String,
    role: { type: String, enum: ["Employee", "Manager"] },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } },
);
const User = mongoose.models.User ?? mongoose.model("User", userSchema);

export async function GET(request: Request) {
  await dbConnect();

  // find and return all users
  const users = await User.find();
  return Response.json(users);
}

export async function POST(request: Request) {
  await dbConnect();

  // get user data to save
  const body = await request.json();

  // create new user
  const user = new User({
    name: body.name,
    email: body.email,
    passwordHash: body.passwordHash,
    role: body.role,
  });

  // save and return new or updated user
  const savedUser = await user.save();
  return Response.json(savedUser);
}
