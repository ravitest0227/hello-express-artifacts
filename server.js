const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the Azure DevOps Demo App!');
});

app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Alex' },
    { id: 2, name: 'Beth' }
  ];
  res.json(users);
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
}

module.exports = app;
