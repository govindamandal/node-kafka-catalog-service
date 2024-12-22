import express from 'express';
import catalogRouter from './api/rest/catalog.route';

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.status(200);
    res.send({ message: 'Hello World! Little Change.' });
})

app.use('/', catalogRouter);

export default app;
