import crypto from 'crypto';

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function isEmail(value: string): boolean {
  const re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
  return re.test(value);
}

export function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export type DbConfig = {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
};

export function getDbConfigFromEnv(): DbConfig {
  return {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    database: process.env.DB_NAME || 'openshop',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
  };
}
