/// <reference types="cypress" />
/// <reference types="cypress-grep" />
// tslint:disable-next-line: no-reference
/// <reference path="../support/index.d.ts" />
import data from '../fixtures/postData.json';


describe('Login Test Suite', () => {

	it('Test get request', () => {
		cy.request('http://www.omdbapi.com/?apikey=4c7b2c2e&t=inception').then((response) => {
			expect(response.status).to.eq(200);
			expect(response.body).to.have.property('Director', 'Christopher Nolan');
			expect(response.body).to.have.property('Year', '2010');
			expect(response.body).to.have.property('imdbRating', '8.8');
		});
	});

	it('Test POST', () => {

		cy.request('POST','https://reqres.in/api/users',data).then((response) => {
			expect(response.status).to.eq(201);
			expect(response.body).to.have.property('name', data.name);
			expect(response.body).to.have.property('job', data.job);
		});

		// });

	});

});