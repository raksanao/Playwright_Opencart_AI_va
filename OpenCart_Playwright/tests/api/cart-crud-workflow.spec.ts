import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { Routes } from '../../api/endpoints/routes';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const BASE_URL = process.env.API_BASE_URL || 'https://fakestoreapi.com';
function url(route: string){ return `${BASE_URL}${route}`; }

test.describe.serial('Cart CRUD workflow @api @workflow', ()=>{
  test('create -> update -> delete cart', async ({ request }) => {
    const createPayload = { userId: 5, date: new Date().toISOString(), products: [{ productId: 1, quantity: 1 }] };
    const createRes = await request.post(url(Routes.CREATE_CART), { data: createPayload });
    expect([200,201]).toContain(createRes.status());
    const created = await createRes.json();
    expect(created).toHaveProperty('id');
    const id = created.id || created.cartId || created._id;
    expect(id).toBeTruthy();

    const updatePayload = { userId: 5, date: new Date().toISOString(), products: [{ productId: 1, quantity: 2 }] };
    const updateRes = await request.put(url(Routes.UPDATE_CART.replace('{id}', String(id))), { data: updatePayload });
    expect([200,201]).toContain(updateRes.status());
    const updated = await updateRes.json();

    const deleteRes = await request.delete(url(Routes.DELETE_CART.replace('{id}', String(id))));
    expect([200,201]).toContain(deleteRes.status());
  });
});
