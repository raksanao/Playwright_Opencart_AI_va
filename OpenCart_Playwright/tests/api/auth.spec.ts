import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { Routes } from '../../api/endpoints/routes';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const BASE_URL = process.env.API_BASE_URL || 'https://fakestoreapi.com';
function url(route: string){ return `${BASE_URL}${route}`; }

test.describe('Auth API', ()=>{
  test('Successful login returns token @api @auth', async ({ request }) => {
    const res = await request.post(url(Routes.AUTH_LOGIN), { data: { username: 'mor_2314', password: '83r5^_' } });
    expect([200,201]).toContain(res.status());
    const body = await res.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
  });

  test('Invalid login returns 401 @api @auth', async ({ request }) => {
    const res = await request.post(url(Routes.AUTH_LOGIN), { data: { username: 'bad', password: 'bad' } });
    expect(res.status()).toBe(401);
    const txt = await res.text();
    expect(txt.toLowerCase()).toContain('username or password');
  });
});
