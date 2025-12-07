import express from 'express';
import subjectRouter from './routes/subject-route.js';

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/a-044/api', subjectRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

export default app;