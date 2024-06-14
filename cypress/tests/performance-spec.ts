/// <reference types="cypress" />
/// <reference types="cypress-grep" />
// tslint:disable-next-line: no-reference
/// <reference path="../support/index.d.ts" />



describe('Login Test Suite', () => {


	it.only('Login with Invalid Password', { tags: ['P2', 'Login'] }, () => {
		cy.visit('https://hrms.trigent.com/');
		const customThresholds = {
			performance: 50,
			accessibility: 50,
			seo: 70,
			'first-contentful-paint': 2000,
			'largest-contentful-paint': 3000,
			'cumulative-layout-shift': 0.1,
			'total-blocking-time': 500,
		};

		const desktopConfig = {
			formFactor: 'desktop',
			screenEmulation: { disabled: true },
		};

		cy.lighthouse(customThresholds, desktopConfig);
	});




});