import moment from 'moment';
import momenttimezone from 'moment-timezone';
export class DateUtils {

	private static dateFormatWithSlash = 'YYYY/MM/DD';
	private static dateFormatDDMMYYYY = 'YYYY/MM/DD';
	private static dateFormatWithMonth = 'MMM DD YYYY';
	private static currentDateTime = 'DDMMYYYYhhmmss';
	private static currentDateMeridiem = 'MMM D YYYY, h:mm a';
	private static dateMonthFormat = 'YYYY/MM/DD';
	private static dateFormatMMMDYYYY = 'MMM D YYYY';


	public static getTodaysDate() {
		return moment().format(this.dateFormatWithSlash);
	}

	public static getTodaysDateInDDMMYYYYFormat() {
		return moment().format(this.dateFormatDDMMYYYY);
	}

	public static getNextYearDate() {
		return moment().add(1, 'y').format(this.dateFormatWithSlash);
	}

	public static get15DaysFromTodaysDate() {
		return moment().add(15, 'd').format(this.dateFormatWithSlash);
	}

	public static get20DaysFromTodaysDate() {
		return moment().add(20, 'd').format(this.dateFormatWithSlash);
	}

	public static getTwoMonthsFromTodaysDate() {
		return moment().add(2, 'M').format(this.dateFormatDDMMYYYY);
	}

	public static subtract15DaysFromTodaysDate() {
		return moment().subtract(15, 'd').format(this.dateFormatWithSlash);
	}

	public static getPastDateFromCurrentDate(days: number) {
		return moment().subtract(days, 'd').format(this.dateFormatDDMMYYYY);
	}

	public static getNextDateFromCurrentDate(days: number) {
		return moment().add(days, 'd').format(this.dateFormatDDMMYYYY);
	}

	public static getNextDateFromCurrentDay(days: number) {
		return moment().add(days, 'd').format(this.dateFormatDDMMYYYY);
	}

	public static getCurrentDateTimeStamp() {
		return moment().format(this.currentDateTime);
	}

	public static getCurrentDateTimeInMeridiem() {
		return moment().format(this.currentDateMeridiem);
	}

	public static getDate() {
		return moment().date().toString();
	}

	public static getCurrentMonth() {
		return moment().month().toString();
	}

	public static getCurrentYear() {
		return moment().year().toString();
	}

	public static getTodaysDateInMMMDDYYFormat() {
		return moment().format(this.dateFormatWithMonth);
	}

	public static getPolicyDateInMMMDDYYFormat(date: string) {
		return moment(date, 'DD/MM/YYYY').format(this.dateFormatMMMDYYYY);
	}

	public static convertDate(date: string, dateFormat: string) {
		return moment(date).format(dateFormat);
	}

	public static getPolicyPeriod(startDate: string, endDate: string) {
		const policyRange = moment(startDate).format(this.dateFormatWithMonth) + ' - ' + moment(endDate).format(this.dateFormatWithMonth);
		return policyRange;
	}

	public static getDateinUTCFormat() {
		return moment.utc().format();
	}

	public static getDateinUSTimeZone() {
		return momenttimezone().tz('America/Los_Angeles').format();
	}

	public static getNextTwoYearDate() {
		return moment().add(2, 'y').format(this.dateFormatWithSlash);
	}

	public static getNextThreeYearDate() {
		return moment().add(3, 'y').format(this.dateFormatWithSlash);
	}

	public static getDateMonthFormatDate(days: number) {
		return moment().add(days, 'd').format(this.dateMonthFormat);
	}

	public static getNextTwoYearRenewalDate() {
		return moment().add(2, 'y').format(this.dateMonthFormat);
	}

	public static getNextThreeYearRenewalDate() {
		return moment().add(3, 'y').format(this.dateMonthFormat);
	}
}
