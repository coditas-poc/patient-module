import { Controller, Logger, Get } from "@nestjs/common";
import { MessagePattern } from '@nestjs/microservices';
import { PatientsService } from './patients.service';

@Controller()
export class AppController {
	// create a logger instance
	private logger = new Logger('AppController');

	// inject the patient service
	constructor(private patientsService: PatientsService) {}

	// define message pattern for get all patients method
	@MessagePattern('getPatients')
	getPatients() {
		this.logger.log('Fetching patients');
		return this.patientsService.getPatients()
	}

	// define message pattern for get patient by id method
	@MessagePattern('getPatient')
	async getPatient(id: number) {
		this.logger.log('Fetching patient by id');
		return this.patientsService.getPatient(id)
	}
	
	// define message pattern to add new patient method
	@MessagePattern('addPatient')
	async addPatient(patient: { id: number; name: string; verified: boolean; }) {
		this.logger.log('Adding patient');
		return this.patientsService.addPatient(patient)
	}
	
	// define message pattern to delete doctor by id
	@MessagePattern('deletePatient')
	async deletePatient(id: number) {
		this.logger.log('Deleting patient');
		return this.patientsService.deletePatient(id)
	}
}

