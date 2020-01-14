'use strict';

// Response Body's Standard Data Structure Class
export class ResponseBody {
    statusCode: any;
    message: any;
    data: any;
    constructor(statusCode, message, data) {
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
    }
}
