import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('cart', () => {
    let inventoryPage: InventoryPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('standard_user', 'secret_sauce');

        inventoryPage = new InventoryPage(page);
    });
    test('agregar un producto al carrito', async () => {
        await inventoryPage.addToCart('Sauce Labs Backpack');

        await expect(inventoryPage.cartBadge).toHaveText('1');

    });

    test('agregar dos productos al carrito', async () => {
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await inventoryPage.addToCart('Sauce Labs Bike Light');

        await expect(inventoryPage.cartBadge).toHaveText('2');
    });

    test('quitar un producto del carrito', async () => {
        await inventoryPage.addToCart('Sauce Labs Backpack');
        await inventoryPage.removeFromCart('Sauce Labs Backpack');

        await expect(inventoryPage.cartBadge).toBeHidden();

    });

});