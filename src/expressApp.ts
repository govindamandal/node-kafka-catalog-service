import express from 'express';
import catalogRouter from './api/rest/catalog.route';

const app = express();
app.use(express.json())

app.use('/', catalogRouter);

export default app;
