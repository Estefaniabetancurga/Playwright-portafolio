import {test, expect} from '@playwright/test';

import { LoginPage } from '../pages/LoginPage'; 

test.describe ('login',() => {


let loginPage: LoginPage;

test.beforeEach(async ({page}) =>{
    loginPage= new LoginPage(page);
    await loginPage.goto ();
});

test ('login existoso con usuario valido', async ({ page }) => {
 
    await loginPage.login('standard_user', 'secret_sauce');

    await expect(page).toHaveURL(/inventory/);
    await expect(page.getByText('Products')).toBeVisible();
});

test ('usuario bloqueado', async ({page}) => {


    await loginPage.login('locked_out_user', 'secret_sauce');

    await expect(loginPage.errorMessage).toContainText('Sorry, this user has been locked out.');
});
test ('contraseña incorrecta', async ({page}) => {

    await loginPage.login('standard_user', 'clave_mala');

    await expect(loginPage.errorMessage).toContainText('Username and password do not match any user in this service');
    
  });

test ('Usuario Vacio', async ({page}) => {

    await loginPage.login('', 'secret_sauce');

    await expect(loginPage.errorMessage).toContainText('Username is required');

});

test ('Contraseña Vacia', async ({page}) => {

    await loginPage.login('standard_user','');

    await expect(loginPage.errorMessage).toContainText('Password is required');

});
}); 