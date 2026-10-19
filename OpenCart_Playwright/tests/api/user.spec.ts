import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { Routes } from '../../api/endpoints/routes';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const BASE_URL = process.env.API_BASE_URL || 'https://fakestoreapi.com';
function url(route: string){ return `${BASE_URL}${route}`; }

test.describe('Users API', ()=>{
  test('GET - all users @api', async ({ request }) => {
    const res = await request.get(url(Routes.GET_ALL_USERS));
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test('GET - user by id @api', async ({ request }) => {
    const res = await request.get(url(Routes.GET_USER_BY_ID.replace('{id}','1')));
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('id');
  });
});
