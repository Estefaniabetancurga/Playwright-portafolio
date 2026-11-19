import { Page, Locator } from '@playwright/test';


export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async goto(){
        await this.page.goto('https://www.saucedemo.com/');
    }

    async login(Username: string, Password: string){
        await this.usernameInput.fill(Username);
        await this.passwordInput.fill(Password);
        await this.loginButton.click();
    }
} 