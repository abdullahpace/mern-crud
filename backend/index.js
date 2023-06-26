const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/userdb');
  console.log('db connected');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model('User', userSchema);
const server = express();
server.use(cors());
server.use(bodyParser.json());

server.use(cors());
server.use(bodyParser.json());
server.listen(8080, () => {
  console.log('server started');
});

// server.get('/demo', (req, res) => {
//   res.send('hello');
// });
server.get('/users', async (req, res) => {
  const docs = await User.find({});
  res.json(docs);
});
server.post('/demo', async (req, res) => {
  let user = new User();
  user.username = req.body.username;
  user.password = req.body.password;
  const doc = await user.save();
  // console.log(req.body);
  res.json(doc);
});
