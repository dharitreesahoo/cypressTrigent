/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/// <reference types="cypress" />

const { lighthouse, pa11y, prepareAudit } = require('cypress-audit');


const { downloadFile } = require('cypress-downloadfile/lib/addPlugin');
const installLogsPrinter = require('cypress-terminal-report/src/installLogsPrinter');

module.exports = (on: any, config: any) => {
	require('cypress-grep/src/plugin')(config);
};

module.exports = (on: any, config: any) => {
	installLogsPrinter(on, {
		printLogsToConsole: 'always'
	});
	on('task', { downloadFile });
	on('before:browser:launch', (browser = {}, launchOptions: any) => {
		prepareAudit(launchOptions);
	});

	on('task', {
		lighthouse: lighthouse((lighthouseReport: any) => {
			const categories = lighthouseReport.lhr.categories;
			const audits = lighthouseReport.lhr.audits;
			const formattedAudit = Object.keys(audits).reduce(
				(metrics, curr) => ({
					...metrics,
					[curr]: audits[curr].numericValue
				}),
				{}
			);
			const formattedCategories = Object.keys(categories).reduce(
				(metrics, curr) => ({
					...metrics,
					[curr]: categories[curr].score * 100
				}),
				{}
			);

			const results = {url: lighthouseReport.lhr.requestedUrl, ...formattedCategories};
			fs.writeFileSync('./audit.json', results);
		}),
		pa11y: pa11y((pa11yReport: any) => {
			console.log(pa11yReport); // raw pa11y reports
		}),
	});
	on('task', {
		failed: require('cypress-failed-log/src/failed')(),
	});
	on('task', {
		getPDFContent(PDFfilename: any) {
			return parsePDF(PDFfilename);
		},
	});
};

import path from 'path';
import fs from 'fs';
import pdfParse from 'pdf-parse';
const repoRoot = path.join(__dirname, '..', '..');
const dir = 'download';
if (!fs.existsSync(dir)) {
	fs.mkdirSync(dir);
}

const parsePDF = (PDFfilename: any) => {
	const PDFfile = `${repoRoot}/${PDFfilename}`;
	const dataBuffer = fs.readFileSync(PDFfile);
	return new Promise((resolve, reject) => {
		pdfParse(dataBuffer).then(data => {
			console.log(data.text);
			return resolve(data.text.replace(/\n/g, ''));
		}).catch(error => {
			return reject(error);
		});
	});
};