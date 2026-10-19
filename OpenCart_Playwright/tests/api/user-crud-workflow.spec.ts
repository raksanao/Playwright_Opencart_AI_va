import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import { Routes } from '../../api/endpoints/routes';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
const BASE_URL = process.env.API_BASE_URL || 'https://fakestoreapi.com';
function url(route: string){ return `${BASE_URL}${route}`; }

test.describe.serial('User CRUD workflow @api @workflow', ()=>{
  test('create -> update -> delete user', async ({ request }) => {
    const payload = { email: `auto.${Date.now()}@example.com`, username: `u${Date.now()}`, password: 'P@ss123' };
    const createRes = await request.post(url(Routes.CREATE_USER), { data: payload });
    expect([200,201]).toContain(createRes.status());
    const created = await createRes.json();
    const id = created.id || created.userId || created._id;
    expect(id).toBeTruthy();

    const updatePayload = { ...payload, username: payload.username + '_upd' };
    const updRes = await request.put(url(Routes.UPDATE_USER.replace('{id}', String(id))), { data: updatePayload });
    expect([200,201]).toContain(updRes.status());

    const delRes = await request.delete(url(Routes.DELETE_USER.replace('{id}', String(id))));
    expect([200,201]).toContain(delRes.status());
  });
});
