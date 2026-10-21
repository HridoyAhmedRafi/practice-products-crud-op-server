import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import "dotenv/config";

const app = express();
app.use(cors());
app.use(express.json());
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
const mongoClient = await connectToMongoDB();
const db = mongoClient.db("practice-products-crud-op");
const products = db.collection("products");

app.get("/", (req, res) => {
  res.send({ message: "API is running" });
});

app.post("/products", async (req, res) => {
  const product = req.body;
  console.log("product form server", product);
  const result = await products.insertOne(product);
  res.send(result);
});

app.listen(PORT, (req, res) => {
  console.log(`Server is running on PORT ${PORT}`);
});
