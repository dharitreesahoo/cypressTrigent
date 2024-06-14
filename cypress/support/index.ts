// Import commands.js using ES2015 syntax:
import './commands';
import 'cypress-downloadfile/lib/downloadFileCommand';
import 'cypress-plugin-tab';
import 'cypress-xpath';
import 'cypress-failed-log';
// eslint-disable-next-line no-undef
require('cypress-terminal-report/src/installLogsCollector')();
// eslint-disable-next-line no-undef
require('cypress-grep')();

export { AssertionUtils } from '../utils/AssertionUtils';
export { LocatorUtils } from '../utils/LocatorUtils';
export { Navigation } from '../utils/Navigation';
export { BrowserActions } from '../utils/BrowserActions';
export { DateUtils } from '../utils/DateUtils';
export { FakerUtils } from '../utils/FakerUtils';

export { SpiceworksLoginPage } from '../pages/SpiceworksLoginPage';
export { SpiceworksTicketingPage } from '../pages/SpiceworksTicketingPage';
