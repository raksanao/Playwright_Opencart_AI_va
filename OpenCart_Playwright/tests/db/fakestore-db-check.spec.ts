import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import DbClient from '../../utils/dbClient';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3306),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'openshop',
};

test.describe('DB smoke tests', () => {
  test.beforeEach(async ({}, testInfo) => {
    const db = new DbClient();
    try {
      await db.connect(DB_CONFIG);
    } catch (error) {
      testInfo.skip(true, 'MySQL is not running or configured locally. DB tests are skipped in this environment.');
    } finally {
      if (db['conn']) {
        await db.disconnect();
      }
    }
  });

  test('DB connection and schema access @db @sanity', async () => {
    const db = new DbClient();
    await db.connect(DB_CONFIG);

    try {
      const rows = await db.query('SHOW TABLES');
      expect(Array.isArray(rows)).toBeTruthy();
      expect(rows.length).toBeGreaterThan(0);
    } finally {
      await db.disconnect();
    }
  });

  test('DB can query a known table if present @db @regression', async () => {
    const db = new DbClient();
    await db.connect(DB_CONFIG);

    try {
      const rows = await db.query('SHOW TABLES LIKE ?', ['users']);
      expect(Array.isArray(rows)).toBeTruthy();
    } finally {
      await db.disconnect();
    }
  });
});
