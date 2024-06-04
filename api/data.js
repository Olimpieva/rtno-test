const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async (req, res) => {
  try {
    await client.connect();
    const db = client.db("chats");
    const collection = db.collection("info");
    const data = await collection.find({}).toArray();
    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await client.close();
  }
};
