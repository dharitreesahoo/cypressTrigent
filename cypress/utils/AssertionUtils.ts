export class AssertionUtils {

	private static  xpath = {
		successMessage: '//div[contains(@class, "Toastify__toast Toastify__toast--success")]',
		successMessageText: '//div[contains(@class, "Toastify__toast--success toast-container")]/div[@class="Toastify__toast-body"]',
		closeSuccessMessage: '//button[contains(@class, "Toastify__close-button--success")]'
	};

	public static verifyUrlContains(url: string) {
		cy.url().should('contain', url);
		cy.log('Verified: Navigated to correct url');
	}

	public static verifyUrl(url: string) {
		cy.url().should('equal', url);
		cy.log('Verified: Navigated to correct url');
	}

	public static verifyTitle(title: string) {
		cy.title().should('include', title);
		cy.log('Verified: Correct Title is displayed');
	}

	public static assertText(locator: string, textValue: string) {
		cy.get(locator).should('have.text', textValue);
		cy.log('Verified: Element Text is correct');
	}

	public static assertValue(locator: any, textValue: string) {
		cy.get(locator).should('have.value', textValue);
		cy.log('Verified: Element Value is correct');
	}

	public static isElementVisible(locator: string) {
		cy.get(locator).should('be.visible');
		cy.log('Verified: Element is Visible');
	}

	public static waitForRequestToBeCompleted(request:string){
		cy.intercept(request).as('element');
		cy.wait('@element');
	}

	public static waitForReportRequestToBeCompleted(request:string){
		cy.intercept(request).as('element');
		cy.wait('@element',{ timeout: 400000 });
	}

	public static verifySuccessMessageBanner(successMessage:string){
		cy.xpath(this.xpath.successMessage).should('be.visible');
		cy.xpath(this.xpath.successMessageText).eq(0).should('have.text', successMessage);
		cy.xpath(this.xpath.closeSuccessMessage).click();
		cy.xpath(this.xpath.successMessage).should('not.exist');
	}
}