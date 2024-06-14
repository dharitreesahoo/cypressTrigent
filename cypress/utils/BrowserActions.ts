import { LocatorUtils } from '../support';
export class BrowserActions {

	private static css = {
		dropDown: 'div[class*="MuiSelect-selectMenu"]',
		valueFromDropDown: 'ul li[class*="ListItem"]'
	};

	public static clearAndType(locator: string, value: string) {
		cy.xpath(locator).clear().type(value);
	}

	public static forceClick(locator: string) {
		cy.xpath(locator).click({ force: true });
	}

	public static doubleClick(locator: string) {
		cy.xpath(locator).dblclick();
	}

	public static rightClick(locator: string) {
		cy.xpath(locator).rightclick();
	}

	public static selectValueFromDropDown(value: string) {
		cy.get(this.css.dropDown).click();
		cy.get(this.css.valueFromDropDown).contains(value).click();
	}

	public static selectValueFromDropDownByIndex(index: number, value: string) {
		cy.get(this.css.dropDown).eq(index).click();
		cy.get(this.css.valueFromDropDown).contains(value).click();
	}

	public static refresh() {
		cy.reload();
	}

	public static linkClick(linkName: string) {
		LocatorUtils.linkText(linkName);
	}
}