import 'dotenv/config';

export const PORT = process.env.PORT || 3000;
export const ENVIRONMENT = process.env.ENVIRONMENT || 'development';
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = parseInt(process.env.DB_PORT, 10) || 5432;
export const DB_NAME = process.env.DB_NAME;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSWORD = process.env.DB_PASSWORD;
