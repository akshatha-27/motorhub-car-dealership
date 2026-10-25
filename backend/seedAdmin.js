import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./src/models/User.js";
import dotenv from "dotenv";

dotenv.config();

async function createAdmin() {
  await mongoose.connect(process.env.MONGODB_URI);

  const email = "admin@motorhub.com";
  const password = "admin123";

  const existingAdmin = await User.findOne({ email });

  if (existingAdmin) {
    console.log("Admin account already exists");
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: "Admin",
      email,
      password: hashedPassword,
      role: "admin",
    });

    console.log("Admin account created successfully");
  }

  await mongoose.disconnect();
}

createAdmin().catch(console.error);
