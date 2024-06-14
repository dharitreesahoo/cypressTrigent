export class SpiceworksTicketingPage{

	private css = {
		filterTicket: 'div[class*="sui-popover_content-body"] button',
		ticketCreator: 'input[class*="spec-new-ticket-creator"]',
		ticketButton: 'button[class*="spec-new-ticket"]',
		ticketSummary: 'input[class*="spec-new-ticket-summary"]',
		ticketDescription: 'textarea[class*="spec-new-ticket-description"]',
		dropdownValue: 'div[class*="tt-suggestion tt-selectable"]',
		assigneeField: 'input[class*="spec-new-ticket-assignee"]',
		saveButton:'button[class*="spec-modal-save"]',
		modalHeader: 'h4[class="modal-title spec-modal-title"]'

	};

	private xpath = {
		summary: '//div[contains(@class, "view selected")]//div[3]/div',
		assignee: '//div[contains(@class, "view selected")]//div[4]/div',
		creator: '//div[contains(@class, "view selected")]//div[5]/div',
	};



	clickFilterTickets() {
		cy.get(this.css.filterTicket).click({force:true});
	}

	getHeaderText() {
		return cy.get(this.css.modalHeader);
	}

	clickNewTicketButton() {
		cy.get(this.css.ticketButton).click();
		cy.wait(2000);
	}

	ticketCreatedBy(name:string) {
		cy.get(this.css.ticketCreator).eq(1).type(name);
		cy.get(this.css.dropdownValue).contains(name).click();
	}

	enterSummary(name:string) {
		cy.get(this.css.ticketSummary).type(name);
	}

	enterDescription(name:string) {
		cy.get(this.css.ticketDescription).type(name);
	}

	assignTicket(name:string) {
		cy.get(this.css.assigneeField).eq(1).click();
		cy.get(this.css.dropdownValue).contains(name).click();
	}

	submitTicket(){
		cy.get(this.css.saveButton).click();	
	}

	getSummaryFromTable() {
		return cy.xpath(this.xpath.summary);
	}

	getAssigneeFromTable() {
		return cy.xpath(this.xpath.assignee);
	}

	getCreatorText() {
		return cy.xpath(this.xpath.creator);
	}
}