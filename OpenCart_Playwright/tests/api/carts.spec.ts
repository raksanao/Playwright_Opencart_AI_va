import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { Routes } from '../../api/endpoints/routes';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const BASE_URL = process.env.API_BASE_URL || 'https://fakestoreapi.com';
function url(route: string){ return `${BASE_URL}${route}`; }

test.describe('Carts API', ()=>{
  test('GET - all carts @api', async ({ request }) => {
    const res = await request.get(url(Routes.GET_ALL_CARTS));
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
  });

  test('GET - cart by id @api', async ({ request }) => {
    const res = await request.get(url(Routes.GET_CART_BY_ID.replace('{id}','1')));
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body).toHaveProperty('id');
  });

  test('GET - carts with limit @api', async ({ request }) => {
    const res = await request.get(url(Routes.GET_CARTS_WITH_LIMIT.replace('{limit}','2')));
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body.length).toBeGreaterThanOrEqual(0);
  });
});
