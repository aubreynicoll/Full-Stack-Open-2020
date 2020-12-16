import express from 'express';
import diaryRouter from './routes/diaries'; 

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  console.log('Somebody set up us the ping!', new Date());
  res.send('pong');
});

app.use('/api/diary', diaryRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}...`);
});