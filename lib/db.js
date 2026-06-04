import mongoose from "mongoose";

let isConnected = false;

export default async function DBconnect() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.DB);

    isConnected = true;
    console.log("DB Connected");
  } catch (err) {
    console.log(err.message);
  }
}