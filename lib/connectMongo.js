import { MongoClient } from "mongodb";

let client = null;

export async function connectToDatabase() {
  if (client) {
    return client;
  }

  if (!process.env.MONGODB_URI) {
    console.log("MongoDb URI not found.");
    throw new Error("MongoDb URI not found.");
  }

  try {
    client = await MongoClient.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDb successfully.");

    const db = client.db("CyberDB");

    // Ensure text index exists on the "contents" collection
    await ensureTextIndex(db);

    return client;
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Error connecting to the database.");
  }
}

async function ensureTextIndex(db) {
  const collection = db.collection("contents");

  // Check existing indexes
  const indexes = await collection.indexes();

  // Check if text index already exists
  const textIndexExists = indexes.some(
    (index) => index.key && index.key._fts === "text",
  );

  if (!textIndexExists) {
    // Create text index on title and description fields if it doesn't exist
    await collection.createIndex(
      {
        title: "text",
        description: "text",
        body: "text",
        author: "text",
        tags: "text",
      },
      { name: "TextIndex" },
    );
    console.log("Text index created on 'contents' collection.");
  } else {
    console.log("Text index already exists on 'contents' collection.");
  }
}
