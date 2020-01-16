export class CreateAuthUserDto {
  public readonly email: string;
  public readonly password?: string;
  public readonly firstName: string;
  public readonly lastName: string;
  public readonly gender?: string;
  public readonly mobileNumber: number;
  public readonly insuranceFront?: string;
  public readonly insuranceBack?: string;
  public readonly drivingLicenseFront?: string;
  public readonly drivingLicenseBack?: string;
  public readonly dob: string;
  public readonly provider?: string;
  public readonly memberId?: string;
}
