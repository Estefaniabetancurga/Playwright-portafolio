import {test, expect} from '@playwright/test';

test.describe ('login',() => {


test.beforeEach (async ({page}) => {
    await page.goto('https://www.saucedemo.com');
});

test ('login existoso con usuario valido', async ({ page }) => {

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button',{name: 'Login'}).click();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
});

test ('usuario bloqueado', async ({page}) => {


    await page.getByPlaceholder('Username').fill('locked_out_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button',{name: 'Login'}).click();

    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out.');
});
test ('contraseña incorrecta', async ({page}) => {

    
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('clave_mala');
    await page.getByRole('button',{name: 'Login'}).click();

    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service');
    
  });

test ('Usuario Vacio', async ({page}) => {

    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button',{name:'Login'}).click();

    await expect(page.locator('[data-test="error"]')).toContainText('Username is required');

});

test ('Contraseña Vacia', async ({page}) => {

    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByRole('button',{name:'Login'}).click();

    await expect(page.locator('[data-test="error"]')).toContainText('Password is required');

});
}); 