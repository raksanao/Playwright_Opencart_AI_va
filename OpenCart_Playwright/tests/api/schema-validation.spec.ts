import { test, expect } from '@playwright/test';
import DataReader from '../../utils/DataReader';
import dotenv from 'dotenv';
import path from 'path';
import { Routes } from '../../api/endpoints/routes';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const BASE_URL = process.env.API_BASE_URL || 'https://fakestoreapi.com';
function url(route: string){ return `${BASE_URL}${route}`; }

function validateRequired(schema: any, obj: any){
  if (!schema || !schema.required) return true;
  for (const key of schema.required){
    if (!(key in obj)) return false;
  }
  return true;
}

test.describe('Schema validation (basic) @api @schema', ()=>{
  test('product response matches product.schema.json required fields', async ({ request }) => {
    const schema = await DataReader.readJson<any>('OpenCart_Playwright/api/schemas/product.schema.json');
    const res = await request.get(url(Routes.GET_PRODUCT_BY_ID.replace('{id}','1')));
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(validateRequired(schema, body)).toBeTruthy();
  });

  test('user response matches user.schema.json required fields', async ({ request }) => {
    const schema = await DataReader.readJson<any>('OpenCart_Playwright/api/schemas/user.schema.json');
    const res = await request.get(url(Routes.GET_USER_BY_ID.replace('{id}','1')));
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(validateRequired(schema, body)).toBeTruthy();
  });

  test('cart response matches cart.schema.json required fields', async ({ request }) => {
    const schema = await DataReader.readJson<any>('OpenCart_Playwright/api/schemas/cart.schema.json');
    const res = await request.get(url(Routes.GET_CART_BY_ID.replace('{id}','1')));
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(validateRequired(schema, body)).toBeTruthy();
  });
});
