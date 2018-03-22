import express from 'express';
import bodyParser from 'body-parser';
import winston from 'winston';
import logger from 'morgan';
import userRoutes from './routes/userRoute';
import businessRoutes from './routes/businessRoute';


const app = express();
const port = process.env.port || 3000;

// Log HTTP methods to console
app.use(logger('dev'));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Middleware implementing user routes
app.use('/api/v1/auth', userRoutes);
// Middleware for business routes
app.use('/api/v1/businesses', businessRoutes);

app.listen(port, () => { winston.info(`Server is running on port ${port}`); });

export default app;
