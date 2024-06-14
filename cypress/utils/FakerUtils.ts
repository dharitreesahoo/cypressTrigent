import faker from 'faker';
import moment from 'moment';
export class FakerUtils {

	private static gender = ['Male', 'Female'];
	private static occupation = ['Unemployed', 'Military', 'Medical', 'Clerical', 'Business Professional'];
	private static maritalStatus = ['Single', 'Common-in-Law', 'Married', 'Separated', 'Divorced', 'Widow', 'Widower'];

	public static getFirstName() {
		return faker.name.firstName();
	}

	public static getLastName() {
		return faker.name.lastName();
	}

	public static getGender() {
		return faker.random.arrayElement(this.gender);
	}

	public static getOccupation() {
		return faker.random.arrayElement(this.occupation);
	}

	public static getMaritalStatus() {
		return faker.random.arrayElement(this.maritalStatus);
	}

	public static getDateOfBirth() {
		return moment(faker.date.between('1900-01-01', '2001-12-31')).format('YYYY/MM/DD');
	}

	public static getVehicleIdentificationNumber() {
		return faker.vehicle.vin();
	}

	public static getVehicleMaker() {
		return faker.vehicle.manufacturer();
	}

	public static getVehicleModel() {
		return faker.vehicle.model();
	}

	public static getRandomId() {
		return faker.random.uuid();
	}
}