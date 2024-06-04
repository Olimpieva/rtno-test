const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = async (req, res) => {
  //   const id = req.params.id;
  try {
    await client.connect();
    const db = client.db("chats");
    const collection = db.collection("users");
    const data = await collection.find({}).toArray();
    const user = data.find(item => item._id === id);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ error: e.message });
  } finally {
    await client.close();
  }
};
