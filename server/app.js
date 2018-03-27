import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import logger from 'morgan';
import expressValidator from 'express-validator';
import userRoutes from './routes/userRoute';
import businessRoutes from './routes/businessRoute';


const app = express();
const port = process.env.port || 3000;

// Log HTTP methods to console
app.use(logger('dev'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Call express validator after body parser middleware
// because it uses the passed values
app.use(expressValidator());
// Middleware implementing user routes
app.use('/api/v1/auth', userRoutes);
// Middleware for business routes
app.use('/api/v1/businesses', businessRoutes);

app.get('*', (req, res, next) => {
  res.status(404).json({ message: 'Something went wrong' });
  next();
});

app.listen(port, () => { winston.info(`Server is running on port ${port}`); });

export default app;
