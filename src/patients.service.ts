
import { Injectable, HttpException } from '@nestjs/common';
import { PATIENTS } from './mocks/patients.mock';

@Injectable()
export class PatientsService {
    patients = PATIENTS;

    getPatients(): Promise<any> {
        return new Promise(resolve => {
            resolve(this.patients);
        });
    }

    getPatient(id: any): Promise<any> {
        return new Promise(resolve => {
            const patient = this.patients.find(patient => patient.id === Number(id));
            if (!patient) {
                throw new HttpException('Patient does not exist', 404);
            }
            resolve(patient);
        });
    }

    addPatient(patient: { id: number; name: string; verified: boolean; }): Promise<any> {
        return new Promise(resolve => {
            this.patients.push(patient);
            resolve(this.patients);
        })
    }

    deletePatient(id: any): Promise<any> {
        return new Promise(resolve => {
            let index = this.patients.findIndex(patient => patient.id === Number(id));
            if (index === -1) {
                throw new HttpException('Patient does not exist!', 404);
            }
            this.patients.splice(index, 1);
            resolve(this.patients);
        })
    }
}
