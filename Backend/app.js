const express = require('express');
const app = express();

var cors = require('cors')

app.use(cors())

app.use(express.json());

const authRouter = require('./auth/auth');
const meteoRouter = require('./meteo/meteo');
const blague = require('./blagues/blague');
// const animalRouter = require('./animal/animal');

app.use('/auth', authRouter);
app.use('/meteo', meteoRouter);
app.use('/blague', blague);
// app.use('/', animalRouter);

// app.get('/', (req, res) => {
//   res.send('Hello, Express!');
// });

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
