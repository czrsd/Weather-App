import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import cors from 'cors';
import weatherRouter from './routes/get.js';
import "./helpers/env.js"

const app = express();

app.use(helmet());
app.use(morgan('combined'));
app.use(compression());
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || origin.startsWith('http://localhost')) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(weatherRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
