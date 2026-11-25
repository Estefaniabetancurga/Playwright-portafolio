import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    }
    async addToCart(productName: string) {
        await this.page
        .locator('[data-test="inventory-item"]')
        .filter({hasText: productName })
        .getByRole('button',{ name: 'Add to cart' })
        .click();
    }

    async removeFromCart(productName: string ){
        await this.page
        .locator('[data-test="inventory-item"]')
        .filter({ hasText: productName})
        .getByRole('button', { name: 'Remove' })
        .click();

    }    
    
    
}