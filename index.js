import express from "express";
import { MongoClient } from "mongodb";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

const client = new MongoClient(process.env.MONGO_DB_URI);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}
connectToMongoDB();

app.get("/", (req, res) => {
  res.send({ message: "API is running" });
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT ${PORT}`);
});
