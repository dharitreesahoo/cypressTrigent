export class Navigation {

	public static navigate(label: string) {
		// add appropriate locator for page
		cy.get('div[class*="side-panel-link"] a').contains(label).click();
	}

	public static navigateToPage() {
		this.navigate('PageName');
		cy.log('Navigated to XXXXXX Page');
	}
}
