import {test, expect, request} from '@playwright/test';
test.describe (' API - Users', () =>{

    test('GET de usuario existente', async ({ request }) =>{
        const response = await request.get ('https://jsonplaceholder.typicode.com/users/1');

        expect(response.status()).toBe(200);

        const user = await response.json();
        expect(user.name).toBe('Leanne Graham');
    });

    test ('GET usuario que no existe',async ({ request}) => {
        const response =await request.get ('https://jsonplaceholder.typicode.com/users/999');

        expect(response.status ()).toBe(404);

        const user = await response.json();
        expect(user).toEqual({});
    });
    test('POST para crear un  usuario', async ({ request }) =>{
        const response = await request.post('https://jsonplaceholder.typicode.com/users',{
            data:{
                name: 'Estefania QA',
                email: 'estefania.qa@test.com' 
            },
        });

        expect(response.status()).toBe(201);

        const user = await response.json ();
        expect(user.name).toBe('Estefania QA');
        expect(user.id).toBeDefined();
    });

});