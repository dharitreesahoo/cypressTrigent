/// <reference types="cypress" />
/// <reference types="cypress-grep" />
// tslint:disable-next-line: no-reference
/// <reference path="../support/index.d.ts" />
import { SpiceworksLoginPage, SpiceworksTicketingPage } from '../support';
import details from '../fixtures/ticketDetails.json';
const loginPage = new SpiceworksLoginPage();
const ticketingPage = new SpiceworksTicketingPage();
const username = Cypress.env('EMPLOYEE_USER_NAME');
const password = Cypress.env('EMPLOYEE_PASSWORD');
const errorMessage: string = ' Email or password is incorrect.';

describe('Login Test Suite', () => {
	beforeEach(() => {
		cy.visit('/');
	});

	it('Login with Invalid Password', { tags: ['P2', 'Login'] }, () => {
		const invalidPassword: string = 'WrongPassword';
		cy.log('Login to Spiceworks application with invalid credentials');
		loginPage.userLogin(username, invalidPassword);
		loginPage.getInvalidCredentialsMessage().should('contain.text', errorMessage);
		cy.log('Verify invalid credentials error message');
	});

	it('Create a new ticket', { tags: ['P2', 'Ticket'] }, () => {
		cy.log('Login to Spiceworks application');
		loginPage.userLogin(username, password);
		cy.title().should('contain', 'Spiceworks Help Desk');
		cy.log('Verify title is displayed corectly');
		ticketingPage.clickFilterTickets();
		cy.log('Create a new ticket');
		ticketingPage.clickNewTicketButton();
		ticketingPage.getHeaderText().should('have.text','New Ticket');
		ticketingPage.ticketCreatedBy(details.contact);
		ticketingPage.enterSummary(details.summary);
		ticketingPage.enterDescription(details.description);
		ticketingPage.assignTicket(details.assignee);
		ticketingPage.submitTicket();
		cy.log('Wait for request to be completed');
		cy.intercept('events/javascript').as('element');
		cy.wait('@element');
		cy.log('Verify ticket is created successfully');
		ticketingPage.getSummaryFromTable().should('contain.text',details.summary);
		ticketingPage.getAssigneeFromTable().should('contain.text',details.assignee);
		ticketingPage.getCreatorText().should('contain.text',details.contact);
	});

});