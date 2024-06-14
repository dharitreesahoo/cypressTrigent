export class SpiceworksLoginPage{

	private css = {
		usernameField: 'input[id="login[email]"]',
		passwordField: 'input[id="login[password]"]',
		signInButton: 'input[type="submit"]',

	};

	private xpath = {
		errorMessageField: '//div[@class="sui-alert_text"]',		
	};

	enterUsername(username: string) {
		cy.get(this.css.usernameField).type(username);
	}

	enterPassword(password: string) {
		cy.get(this.css.passwordField).type(password,{ log: false });
	}

	clickSignButton() {
		cy.get(this.css.signInButton).click();
	}

	getInvalidCredentialsMessage() {
		return cy.xpath(this.xpath.errorMessageField);
	}

	userLogin(username: string, password: string) {
		this.enterUsername(username);
		this.enterPassword(password);
		this.clickSignButton();
	}
	
}