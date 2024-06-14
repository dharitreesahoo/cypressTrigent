export class LocatorUtils {

	public static getLocatorText(prefix: string, value: string, suffix: string) {
		return cy.xpath(prefix + value + suffix);
	}

	public static spanText(text: string) {
		return this.getLocatorText('//span[text()="', text, '"]');
	}

	public static divText(text: string) {
		return this.getLocatorText('//div[text()="', text, '"]');
	}

	public static labelText(text: string) {
		return this.getLocatorText('//label[text()="', text, '"]');
	}

	public static inputText(text: string) {
		return this.getLocatorText('//input[text()="', text, '"]');
	}

	public static linkText(text: string) {
		return this.getLocatorText('//a[text()="', text, '"]');
	}

	public static getDivSpanText(text: string) {
		return this.getLocatorText('//div/span[text()="', text, '"]');
	}

	public static getDivButtonText(text: string) {
		return this.getLocatorText('//div/button[text()="', text, '"]');
	}

}