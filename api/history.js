const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async (req, res) => {
  const id = req.params.id;
  try {
    await client.connect();
    const db = client.db("chats");
    const collection = db.collection("history");
    const data = await collection.find({}).toArray();
    const chat = data.find(item => item.chatId === id);
    res.status(200).json(chat);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await client.close();
  }
};
