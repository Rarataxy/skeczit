const express = require('express');
const app = express();

const port = 3000;

app.use('/routes', routes);

app.get('/', (req, res) => {
  res.send('Mrawwww~ >:3');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});