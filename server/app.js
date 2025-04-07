const express = require('express');
const mongoose = require('mongoose');
const roomRoutes = require('./routes/roomRoutes.js');
const app = express();

const port = 3000;

app.use('/routes', roomRoutes);
app.use(express.json()); 

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