const express = require('express');
const roomRoutes = require('./routes/roomRoutes.js');
const app = express();

const port = 3000;

app.use('/routes', roomRoutes);
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Mrawwww~ >:3');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});