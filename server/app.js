import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import logger from 'morgan';
import expressValidator from 'express-validator';
import userRoutes from './routes/userRoute';
import businessRoutes from './routes/businessRoute';
import adminRoutes from './routes/adminRoute';


const app = express();
const port = process.env.port || 3000;

// Log HTTP methods to console
app.use(logger('dev'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Handling CORS Error
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-width, Content-Type, Accept, Authorization');
  // Browser always sends options first
  // When a POST or PUT request is sent
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
    res.status(200).json({});
  }
  next();
});

// Call express validator after body parser middleware
// because it uses the passed values
app.use(expressValidator());

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/businesses', businessRoutes);

app.get('*', (req, res, next) => {
  res.status(404).json({ message: 'Something went wrong' });
  next();
});

app.listen(port, () => { winston.info(`Server is running on port ${port}`); });

export default app;
