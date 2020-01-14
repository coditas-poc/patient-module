import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CredentialsService } from './credentials.service';
import { Credentials } from './credentials.entity';
@Crud({
    model: {
        type: Credentials,
    },
    params: {
        id: {
            field: 'id',
            type: 'uuid',
            primary: true,
        },
    },
})
@Controller('credentials')
export class CredentialsController {
    constructor(public service: CredentialsService) { }
}
