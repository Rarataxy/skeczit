const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes.js');
const roomRoutes = require('./routes/roomRoutes.js');
const app = express();
app.use(express.json()); 
app.use(cors());

const port = 3002;
app.use('/user', userRoutes);
app.use('/rooms', roomRoutes);

mongoose.connect('mongodb://localhost:27017/skeczit', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Failed to connect to MongoDB', err));

app.get('/', (req, res) => {
  res.send('Mrawwww~ >:3');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});
